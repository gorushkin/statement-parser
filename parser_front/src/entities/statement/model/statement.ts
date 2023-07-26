import { makeAutoObservable } from 'mobx';
import { Transaction, Transactions } from 'src/shared/api/models';
import { stringToDate } from 'src/shared/utils';

const DEFAULT_DATE_FORMAT = 'MM/MM/YYYY';

const columns: { convert: (value: string) => string; map: keyof Transaction; name: string }[] = [
  { convert: (value: string) => stringToDate(value, DEFAULT_DATE_FORMAT), map: 'processDate', name: 'Date' },
  { convert: (value: string) => value, map: 'payeeName', name: 'Payee' },
  { convert: (value: string) => value, map: 'memo', name: 'Memo' },
  { convert: (value: string) => value, map: 'amount', name: 'Amount' },
];

export class Statement {
  csvContent = 'data:text/csv;charset=utf-8,';
  headers = columns.map((column) => this.addQuotes(column.name)).join(',');
  title: string;
  transactions: Transactions;

  constructor() {
    makeAutoObservable(this);
    this.transactions = [];
    this.title = '';
  }

  addQuotes(value: string) {
    return `"${value}"`;
  }

  getConvertedStatement() {
    const convertedTransactions = this.transactions
      .map((transaction) =>
        columns.map((column) => this.addQuotes(column.convert(transaction[column.map] as string))).join(',')
      )
      .join('\n');

    const convertedStatement = this.headers + '\n' + convertedTransactions;

    return { file: convertedStatement, name: this.title };
  }
}
