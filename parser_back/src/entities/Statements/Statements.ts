import { Transaction } from 'parser';
import { BaseDB } from '../BaseDB/BaseDB';
import { Statement } from '../Statement';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { StatementType } from '../index';

class Statements extends BaseDB {
  init(path: string) {
    this.setPath(path, 'statements');
  }

  async saveStatement(id: string, serializedStatement: StatementType) {
    await this.writeJSONData(`${id}.json`, serializedStatement);
  }

  async createStatement(transactions: Transaction[], name: string) {
    const id = uuidv4();
    const statement = new Statement(id, transactions, name, null);
    await statement.updateTransactions();
    const statementData = statement.getStatement();
    await this.saveStatement(id, statementData);
    return { error: null, ok: true };
  }

  async getStatements() {
    try {
      const fileNames = await fs.readdir(this.path);
      const info = fileNames.map((filename) => this.parse(filename).name);
      return { data: info, error: null, ok: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong';
      return { data: null, error: message, ok: false };
    }
  }

  async getStatementById(id: string) {
    try {
      const parsedData = await this.readJSONData<Statement>(`${id}.json`);
      const data = { transactions: parsedData.transactions, id };
      return { data, ok: true };
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
