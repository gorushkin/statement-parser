export class DataBase {
  protected key: string;

  constructor(key: string) {
    this.key = key;
  }

  protected read<T>() {
    const serializedData = localStorage.getItem(this.key);
    if (!serializedData) {
      throw new Error(`There is an error with key ${this.key}`);
    }
    return JSON.parse(serializedData) as T;
  }

  protected save<T>(data: T) {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(this.key, serializedData);
  }
}
