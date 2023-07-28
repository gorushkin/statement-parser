import { Transaction } from 'parser';
import { DefaultDB } from '../Default/Default';
import { Statement } from '../Statement';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

class Statements extends DefaultDB {
  init(path: string) {
    this.setPath(path, 'Statements');
  }

  async saveStatement(id: string, serializedStatement: string) {
    const filePath = this.getPath(this.path, id);
    await this.writeJSONData(`${filePath}.json`, serializedStatement);
  }

  async createStatement(transactions: Transaction[], name: string) {
    const id = uuidv4();
    const statement = new Statement(id, transactions, name, null);
    await statement.updateTransactions();
    const serializedStatement = statement.getSerializedData();
    await this.saveStatement(id, serializedStatement);
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
    const transactionPath = this.getPath(this.path, `${id}.json`);
    try {
      const parsedData = await this.readJSONData<Statement>(transactionPath);
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
