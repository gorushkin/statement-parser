import { makeAutoObservable, makeObservable, observable } from 'mobx';
import Papa from 'papaparse';
import { DB } from 'src/entities/dataBase';
import { v4 as uuid } from 'uuid';

import { Header, Transaction } from './types';

export class Statement extends DB {
  private rawData = '';
  headers = [] as Header[];
  name = '';
  rows = [] as Transaction[];

  constructor() {
    super('');
    makeObservable(this, {
      name: observable,
    });
  }

  private getBody(data: string) {
    const result = Papa.parse<Transaction>(data, {
      header: true,
      transformHeader: (header) => header.toLowerCase(),
    });

    return result.data;
  }

  private getHeaders(data: string) {
    const result = Papa.parse<Header[]>(data, { preview: 1 });
    return result.data[0].map((item) => item.toLowerCase());
  }

  convert(data: ArrayBuffer | string, name: string) {
    this.name = name;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    this.key = uuid();
    this.headers = this.getHeaders(data.toString());
    this.rows = this.getBody(data.toString());
  }
}
