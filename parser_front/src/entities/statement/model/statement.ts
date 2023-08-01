import { makeObservable, observable } from 'mobx';
import { DB } from 'src/entities/db';
import { Currencies, StatementType, Transactions } from 'src/shared/api/models';

import { columns } from '../libs';
import { Summary } from './types';

export class Statement extends DB {
  private csvContent = 'data:text/csv;charset=utf-8,';
  private headers = columns.map((column) => this.addQuotes(column.name)).join(',');
  convertedSummary: Summary;
  currencies: { sourceCurrency: Currencies; targetCurrency: Currencies };
  id: string;
  name: string;
  summary: Summary;
  transactions: Transactions;

  constructor(data?: StatementType) {
    super(data?.id ?? '');
    this.transactions = data?.transactions ?? [];
    this.name = data?.name ?? '';
    this.summary = {
      endBalance: 0,
      income: 0,
      outcome: 0,
      startBalance: 0,
    };
    this.convertedSummary = {
      endBalance: 0,
      income: 0,
      outcome: 0,
      startBalance: 0,
    };
    this.currencies = data?.currencies ?? { sourceCurrency: Currencies.TRY, targetCurrency: Currencies.RUB };
    this.id = data?.id ?? '';

    makeObservable(this, {
      convertedSummary: observable,
      currencies: observable,
      id: observable,
      name: observable,
      summary: observable,
      transactions: observable,
    });
  }

  private addQuotes(value: string) {
    return `"${value}"`;
  }

  private init({ currencies, name, transactions }: StatementType) {
    this.transactions = transactions;
    this.currencies = currencies;
    this.name = name;
    this.updateSummary();
  }

  private updateSummary() {
    const firstTransaction = this.transactions[0];
    this.summary.startBalance = firstTransaction.balance - firstTransaction.amount;
    this.convertedSummary.startBalance = firstTransaction.convertedBalance - firstTransaction.convertedAmount;
    const lastTransaction = this.transactions[this.transactions.length - 1];
    this.summary.endBalance = lastTransaction.balance;
    this.convertedSummary.endBalance =
      this.transactions.reduce((sum, item) => sum + item.convertedAmount, 0) + this.convertedSummary.startBalance;

    const { convertedIncome, convertedOutcome, income, outcome } = this.transactions.reduce(
      (acc, item) => ({
        ...acc,
        ...(item.amount >= 0 && { income: acc.income + item.amount }),
        ...(item.convertedAmount >= 0 && { convertedIncome: acc.convertedIncome + item.convertedAmount }),
        ...(item.amount < 0 && { outcome: acc.outcome + item.amount }),
        ...(item.convertedAmount < 0 && { convertedOutcome: acc.convertedOutcome + item.convertedAmount }),
      }),
      { convertedIncome: 0, convertedOutcome: 0, income: 0, outcome: 0 }
    );

    this.summary.income = income;
    this.summary.outcome = outcome;
    this.convertedSummary.income = convertedIncome;
    this.convertedSummary.outcome = convertedOutcome;
  }

  getCSV() {
    const convertedTransactions = this.transactions
      .map((transaction) =>
        columns.map((column) => this.addQuotes(column.convert(transaction[column.map] as string))).join(',')
      )
      .join('\n');

    const convertedStatement = this.headers + '\n' + convertedTransactions;

    return { file: convertedStatement, name: this.name };
  }

  getStatement(id: string) {
    this.key = id;
    const data = this.read<StatementType>();
    this.init(data);
  }

  saveStatement() {
    const data = { currencies: this.currencies, id: this.id, name: this.name, transactions: this.transactions };
    this.save(data);
  }
}
