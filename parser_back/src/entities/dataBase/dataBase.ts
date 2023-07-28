import { Transaction } from 'parser';
import { DefaultDB } from '../default/default';
import { logger } from '../../logger';
import { Statement } from '../statement';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

class DataBase extends DefaultDB {
  private statementsPath: string;
  private path: string;

  init(path: string) {
    const absolutePath = super.getAbsolutePath(path);
    logger.info(`Start BD init, path is "${absolutePath}"`);
    this.path = absolutePath;
    this.statementsPath = super.getPath(absolutePath, 'statements');
  }

  async saveStatement(id: string, serializedStatement: string) {
    const filePath = super.getPath(this.statementsPath, id);
    await super.writeJSONData(`${filePath}.json`, serializedStatement);
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
      const fileNames = await fs.readdir(this.statementsPath);
      const info = fileNames.map((filename) => super.parse(filename).name);
      return { data: info, error: null, ok: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong';
      return { data: null, error: message, ok: false };
    }
  }

  async getStatementById(id: string) {
    const transactionPath = super.getPath(this.statementsPath, `${id}.json`);
    try {
      const buffer = await fs.readFile(transactionPath);
      const qwe = await super.readJSONData<Statement>(transactionPath);
      console.log('qwe: ', qwe);
      const parsedData: { transactions: Transaction[] } = JSON.parse(buffer.toString());
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

export { DataBase };
