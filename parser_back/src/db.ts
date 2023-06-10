import path, { join } from 'path';
import { Transaction } from 'parser';
import fs from 'fs/promises';
import { DBError } from './error';
import dayjs from 'dayjs';
import { getRate, getRoundedValue } from './until';
import { Rates, Currency, DBResult, Summary, GroupedSummary } from './types';
import { defaultCurrency } from './constants';
import { logger } from '.';

export class DB {
  transactionsPath: string;
  ratesPath: string;
  dbPath: string;
  rates: Rates = {} as Rates;

  async init(path: string) {
    logger.info(`Start BD init, path is "${path}"`);
    this.dbPath = join(process.cwd(), path);
    this.transactionsPath = join(this.dbPath, 'statements');
    this.ratesPath = join(this.dbPath, 'rates.json');
    const isPathExist = await this.checkPath(this.dbPath);
    if (!isPathExist) {
      await this.makeFolder(this.dbPath);
      logger.info(`Add folder for DB "${this.dbPath}"`);
      await this.makeFolder(this.transactionsPath);
      logger.info(`Add folder for transactions "${this.transactionsPath}"`);
      await fs.writeFile(this.ratesPath, JSON.stringify({}), 'utf-8');
      logger.info(`Add file for transactions "${this.transactionsPath}"`);
    } else {
      logger.info(`Main dir exist`);
    }
    const isRatesFileExist = await this.checkPath(this.ratesPath);
    if (!isRatesFileExist) {
      await fs.writeFile(this.ratesPath, JSON.stringify({}), 'utf-8');
      logger.info(`Add file for rates "${this.ratesPath}"`);
    } else {
      logger.info(`Rates file exist`);
    }
    const isTransactionsPathExist = await this.checkPath(this.transactionsPath);
    if (!isTransactionsPathExist) {
      await this.makeFolder(this.transactionsPath);
      logger.info(`Add folder for transactions "${this.transactionsPath}"`);
    } else {
      logger.info(`Transactions dir exist`);
    }
  }

  private async makeFolder(path: string) {
    try {
      await fs.mkdir(path);
    } catch (error) {
      console.log('error: ', error);
    }
  }

  private async checkPath(path: string) {
    try {
      await fs.access(path);
      return true;
    } catch (error) {
      return false;
    }
  }

  private async writeData(filePath: string, serializedData: string) {
    try {
      await fs.writeFile(filePath, serializedData);
      return { data: 'The statement was updated successfully', error: null, ok: true };
    } catch (error) {
      return { data: null, error, ok: false };
    }
  }

  private async readJSONData(path: string): Promise<Rates | never> {
    try {
      const data = JSON.parse(await fs.readFile(path, 'utf-8'));
      return data;
    } catch (error) {
      console.log('error: ', error);
      // TODO: Добавить создание файла при его отсутсвии
      throw new DBError('There is an error with reading currencies');
    }
  }

  private async writeJSONData(path: string, data: any): Promise<void> {
    try {
      await fs.writeFile(path, JSON.stringify(data, null, 2));
    } catch (error) {
      throw new DBError('There is an error with adding currencies');
    }
  }

  private formatDate = (date: string) => dayjs(date).format('DD/MM/YYYY');

  private async updateCurrencyRates(data: Transaction[]) {
    const rates = await this.readJSONData(this.ratesPath);
    const dates = data
      .map((item) => this.formatDate(item.processDate))
      .filter((item) => !rates[item as Currency]);

    const filteredDates = Array.from(new Set(dates));

    const promises = filteredDates.map(async (date) => {
      const currencies = await getRate(date);
      return { date, currencies };
    });

    const list = await Promise.all(promises);

    if (!list.length) return;

    const reducedList = list.reduce((acc, item) => ({ ...acc, [item.date]: item.currencies }), {});

    const updatedRates = { ...rates, ...reducedList };

    await this.writeJSONData(this.ratesPath, updatedRates);
    this.rates = updatedRates;
  }

  private async getCurrencyValue(date: string, currency: Currency) {
    try {
      if (!this.rates[date]) this.rates = await this.readJSONData(this.ratesPath);
      return this.rates[date][currency].value;
    } catch (error) {
      throw new DBError('Something wrong with rates reading');
    }
  }

  private getSummary(
    currentIndex: number,
    balance: number,
    amount: number,
    summary: Summary,
    firstIndex: number,
    lastIndex: number
  ): Summary {
    return {
      ...(currentIndex === firstIndex && { startBalance: getRoundedValue(balance - amount) }),
      ...summary,
      ...(amount >= 0 && { income: getRoundedValue(summary.income + amount) }),
      ...(amount < 0 && { outcome: getRoundedValue(summary.outcome - amount) }),
      ...(currentIndex === lastIndex && { endBalance: getRoundedValue(balance) }),
    };
  }

  async generateStatement(data: Transaction[], name: string) {
    try {
      const nameWithExt = `${name}.json`;
      const filePath = join(this.transactionsPath, nameWithExt);
      await this.updateCurrencyRates(data);
      const dataWithCurrencyPromises = data.map(async (item) => {
        const rate = await this.getCurrencyValue(this.formatDate(item.processDate), 'TRY');
        const convertedAmount = getRoundedValue(rate * item.amount);
        return {
          ...item,
          rate,
          convertedAmount,
          currency: defaultCurrency,
          memo: `${defaultCurrency} - ${item.description}`,
          convertedBalance: getRoundedValue(rate * item.balance),
        };
      });

      const transactions = await Promise.all(dataWithCurrencyPromises);

      const summary = transactions.reduce<GroupedSummary>(
        (acc, { amount, balance, convertedAmount, convertedBalance }, i, list) => {
          const defaultSummary = this.getSummary(
            i,
            balance,
            amount,
            acc.defaultSummary,
            0,
            list.length - 1
          );

          const convertedSummary = this.getSummary(
            i,
            convertedBalance,
            convertedAmount,
            acc.convertedSummary,
            0,
            list.length - 1
          );

          return { defaultSummary, convertedSummary };
        },
        {
          defaultSummary: { income: 0, outcome: 0, startBalance: 0, endBalance: 0 },
          convertedSummary: { income: 0, outcome: 0, startBalance: 0, endBalance: 0 },
        }
      );

      const serializedData = JSON.stringify({ transactions, summary }, null, 2);
      const res = await fs.writeFile(filePath, serializedData);
      return { data: res, error: null, ok: true };
    } catch (error) {
      return { data: null, error, ok: false };
    }
  }

  async getStatements() {
    try {
      const fileNames = await fs.readdir(this.transactionsPath);
      const info = fileNames.map((filename) => path.parse(filename).name);
      return { data: info, error: null, ok: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong';
      return { data: null, error: message, ok: false };
    }
  }

  async getStatement(name: string): Promise<DBResult<Transaction[]>> {
    const transactionPath = path.join(this.transactionsPath, `${name}.json`);
    try {
      const buffer = await fs.readFile(transactionPath);
      const data: Transaction[] = JSON.parse(buffer.toString());
      return { data, ok: true };
    } catch (error) {
      const message = 'The filename is not correct';
      return { error: message, ok: false };
    }
  }

  async saveStatement(name: string, statement: Transaction[]) {
    const nameWithExt = `${name}.json`;
    const filePath = join(this.transactionsPath, nameWithExt);
    const serializedData = JSON.stringify(statement, null, 2);
    const isTargetExist = await this.checkPath(filePath);
    try {
      if (!isTargetExist) throw new DBError('The file name is not correct');
      return await this.writeData(filePath, serializedData);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong';
      return { data: null, error: message, ok: false };
    }
  }
}
