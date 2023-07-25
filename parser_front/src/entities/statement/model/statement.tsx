import { makeAutoObservable } from 'mobx';

type Transaction = {
  amount: number;
  balance: number;
  convertedAmount: number;
  data: string;
  description: string;
  id: string;
  isClear: boolean;
  memo: string;
  payeeId: string;
  payeeName: string;
  processDate: string;
  rate: number;
  transactionDate: string;
};

type Transactions = Transaction[];

export class Statement {
  title: string;
  transactions: Transactions;

  constructor() {
    makeAutoObservable(this);
    this.transactions = [];
    this.title = '';
  }
}
