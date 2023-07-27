import fs from 'fs/promises';

export class DefaultDB {
  protected async readJSONData<T>(path: string): Promise<T> {
    try {
      return JSON.parse(await fs.readFile(path, 'utf-8'));
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
