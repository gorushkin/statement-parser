import { Transaction } from 'parser';
import { BaseDB } from '../BaseDB/BaseDB';
import { Statement } from '../Statement';
import { v4 as uuidv4 } from 'uuid';
import { StatementType } from '../index';
import { StatementCurrencies } from '../Statement/types';

class Statements extends BaseDB {
  init(path: string) {
    this.setPath(path, 'statements');
  }

  async saveStatement(id: string, serializedStatement: StatementType) {
    await this.saveItem(`${id}.json`, serializedStatement);
  }

  async createStatement(
    transactions: Transaction[],
    name: string,
    currencies: StatementCurrencies
  ) {
    const id = uuidv4();
    const statement = new Statement(id, transactions, name, currencies);
    await statement.updateTransactions();
    const statementData = statement.getStatement();
    await this.saveStatement(id, statementData);
    return { error: null, ok: true, data: statementData };
  }

  async getStatements() {
    try {
      const statements = await this.getItems();
      return { data: statements, error: null, ok: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong';
      return { data: null, error: message, ok: false };
    }
  }

  async getStatementById(id: string) {
    try {
      const parsedData = await this.getItem<Statement>(`${id}.json`);
      const statementData = {
        transactions: parsedData.transactions,
        id,
        name: parsedData.name,
        currencies: parsedData.currencies,
      };
      return { data: statementData, ok: true };
    } catch (error) {
      const message = 'The filename is not correct';
      return { error: message, ok: false };
    }
  }

  updateStatement(
    name: string,
    statement: Transaction[]
  ): { data: any; error: any; ok: any } | PromiseLike<{ data: any; error: any; ok: any }> {
    throw new Error('Method not implemented.');
  }
}

export { Statements };
