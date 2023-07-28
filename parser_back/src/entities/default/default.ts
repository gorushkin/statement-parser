import fs from 'fs/promises';
import { ParsedPath, join, parse } from 'path';

export class DefaultDB {
  protected getAbsolutePath(path: string) {
    return join(process.cwd(), path);
  }

  protected parse(path: string): ParsedPath {
    return parse(path);
  }

  protected getPath(...paths: string[]): string {
    return join(...paths);
  }

  protected async readJSONData<T>(path: string): Promise<T> {
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

  protected async writeJSONData(path: string, data: string) {
    try {
      await fs.writeFile(path, data);
    } catch (error) {
      // TODO: add custom error
      throw new Error('writeJSONData');
    }
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
