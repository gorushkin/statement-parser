import fs from 'fs/promises';
import { ParsedPath, join, parse } from 'path';
import { Logger, logger } from '../../logger';

export class BaseDB {
  protected path: string;
  protected logger: Logger = logger;

  protected setPath(path: string, name: string) {
    const absolutePath = this.getAbsolutePath(path, name);
    this.logger.info(`${name} init, path is "${absolutePath}"`);
    this.path = absolutePath;
  }

  protected getAbsolutePath(parentPath: string, path: string) {
    return join(process.cwd(), parentPath, path);
  }

  protected parse(path: string): ParsedPath {
    return parse(path);
  }

  protected getPath(...paths: string[]): string {
    return join(this.path, ...paths);
  }

  protected async getItem<T>(filename: string): Promise<T> {
    const path = this.getPath(filename);
    try {
      const buffer = await fs.readFile(path, 'utf-8');
      return JSON.parse(buffer);
    } catch (error) {
      console.log('error: ', error);
      // TODO: Добавить создание файла при его отсутсвии
      // throw new DBError(ERROR_PLACES.readJSONData);
      throw new Error('ssss');
    }
  }

  private getSerializedData<T>(data: T) {
    return JSON.stringify(data, null, 2);
  }

  protected async saveItem<T>(path: string, data: T) {
    const fullPath = this.getPath(path);
    const serializedData = this.getSerializedData(data);
    try {
      await fs.writeFile(fullPath, serializedData);
    } catch (error) {
      console.log('error: ', error);
      // TODO: add custom error
      throw new Error('writeJSONData');
    }
  }

  protected async getItems() {
    const fileNames = await fs.readdir(this.path);
    return fileNames.map((filename) => this.parse(filename).name);
  }

  protected async checkPath(path: string) {
    try {
      await fs.access(path);
      return true;
    } catch (error) {
      return false;
    }
  }

  protected async makeFolder(path: string) {
    try {
      await fs.mkdir(path);
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
