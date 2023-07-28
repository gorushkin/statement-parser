import { makeAutoObservable } from 'mobx';
import { Transaction, Transactions } from 'src/shared/api/models';
import { stringToDate } from 'src/shared/utils';

import { Summary } from './types';

const DEFAULT_DATE_FORMAT = 'MM/MM/YYYY';

const columns: { convert: (value: string) => string; map: keyof Transaction; name: string }[] = [
  { convert: (value: string) => stringToDate(value, DEFAULT_DATE_FORMAT), map: 'processDate', name: 'Date' },
  { convert: (value: string) => value, map: 'payeeName', name: 'Payee' },
  { convert: (value: string) => value, map: 'memo', name: 'Memo' },
  { convert: (value: string) => value, map: 'amount', name: 'Amount' },
];

export class Statement {
  #transactions: Transactions;
  csvContent = 'data:text/csv;charset=utf-8,';
  headers = columns.map((column) => this.addQuotes(column.name)).join(',');
  summary: Summary;
  title: string;

  constructor() {
    makeAutoObservable(this);
    this.#transactions = [];
    this.title = '';
    this.summary = {
      endBalance: 0,
      income: 0,
      outcome: 0,
      startBalance: 0,
    };
  }

  addQuotes(value: string) {
    return `"${value}"`;
  }

  getConvertedStatement() {
    const convertedTransactions = this.#transactions
      .map((transaction) =>
        columns.map((column) => this.addQuotes(column.convert(transaction[column.map] as string))).join(',')
      )
      .join('\n');

    const convertedStatement = this.headers + '\n' + convertedTransactions;

    return { file: convertedStatement, name: this.title };
  }

  set transactions(transactions: Transaction[]) {
    this.#transactions = transactions;
    this.updateSummary();
  }

  get transactions() {
    return this.#transactions;
  }

  updateSummary() {
    const firstTransaction = this.#transactions[0];
    this.summary.startBalance = firstTransaction.balance - firstTransaction.amount;
    const lastTransaction = this.#transactions[this.#transactions.length - 1];
    this.summary.endBalance = lastTransaction.balance;

    const { income, outcome } = this.#transactions.reduce(
      (acc, item) => ({
        ...acc,
        ...(item.amount >= 0 && { income: acc.income + item.amount }),
        ...(item.amount < 0 && { outcome: acc.outcome + item.amount }),
      }),
      { income: 0, outcome: 0 }
    );

    this.summary.income = income;
    this.summary.outcome = outcome;
  }
}
