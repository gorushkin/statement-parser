import { makeAutoObservable } from 'mobx';
import { Currencies, Transaction, Transactions } from 'src/shared/api/models';
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
  private _transactions: Transactions;
  convertedSummary: Summary;
  csvContent = 'data:text/csv;charset=utf-8,';
  currencies: { sourceCurrency: Currencies | null; targetCurrency: Currencies | null };
  headers = columns.map((column) => this.addQuotes(column.name)).join(',');
  summary: Summary;
  title: string;

  constructor() {
    makeAutoObservable(this);
    this._transactions = [];
    this.title = '';
    this.summary = {
      endBalance: 0,
      income: 0,
      outcome: 0,
      startBalance: 0,
    };
    this.convertedSummary = {
      endBalance: 0,
      income: 0,
      outcome: 0,
      startBalance: 0,
    };
    this.currencies = { sourceCurrency: null, targetCurrency: null };
  }

  addQuotes(value: string) {
    return `"${value}"`;
  }

  getConvertedStatement() {
    const convertedTransactions = this._transactions
      .map((transaction) =>
        columns.map((column) => this.addQuotes(column.convert(transaction[column.map] as string))).join(',')
      )
      .join('\n');

    const convertedStatement = this.headers + '\n' + convertedTransactions;

    return { file: convertedStatement, name: this.title };
  }

  set transactions(transactions: Transaction[]) {
    this._transactions = transactions;
    this.updateSummary();
  }

  get transactions() {
    return this._transactions;
  }

  updateSummary() {
    const firstTransaction = this._transactions[0];
    this.summary.startBalance = firstTransaction.balance - firstTransaction.amount;
    this.convertedSummary.startBalance = firstTransaction.convertedBalance - firstTransaction.convertedAmount;
    const lastTransaction = this._transactions[this._transactions.length - 1];
    this.summary.endBalance = lastTransaction.balance;
    this.convertedSummary.endBalance = lastTransaction.convertedBalance;

    const { convertedIncome, convertedOutcome, income, outcome } = this._transactions.reduce(
      (acc, item) => ({
        ...acc,
        ...(item.amount >= 0 && { income: acc.income + item.amount }),
        ...(item.convertedAmount >= 0 && { convertedIncome: acc.convertedIncome + item.convertedAmount }),
        ...(item.amount < 0 && { outcome: acc.outcome + item.amount }),
        ...(item.convertedAmount < 0 && { convertedOutcome: acc.convertedOutcome + item.convertedAmount }),
      }),
      { convertedIncome: 0, convertedOutcome: 0, income: 0, outcome: 0 }
    );

    this.summary.income = income;
    this.summary.outcome = outcome;
    this.convertedSummary.income = convertedIncome;
    this.convertedSummary.outcome = convertedOutcome;
  }
}
