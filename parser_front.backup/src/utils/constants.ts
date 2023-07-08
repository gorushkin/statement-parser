import { Columns } from '../types';

export const columns: Columns = [
  {
    label: 'Transaction Date',
    value: 'transactionDate',
    isVisible: true,
    isCaption: true,
  },
  {
    label: 'Process Date',
    value: 'processDate',
    isVisible: true,
    isCaption: true,
  },
  {
    label: 'Amount',
    value: 'amount',
    isVisible: true,
    isCaption: true,
  },
  {
    label: 'TYR',
    value: 'convertedAmount',
    isVisible: true,
    isCaption: true,
  },
  {
    label: 'Rate',
    value: 'rate',
    isVisible: true,
    isCaption: true,
  },
  {
    label: 'Balance',
    value: 'balance',
    isVisible: true,
    isCaption: true,
  },
  {
    label: 'Description',
    value: 'description',
    isVisible: true,
    isCaption: true,
  },
  {
    label: 'Payee',
    value: 'payeeName',
    isVisible: true,
    isCaption: true,
  },
  {
    label: 'Memo',
    value: 'memo',
    isVisible: true,
    isCaption: true,
  },
  {
    label: 'Show raw',
    value: 'data',
    isVisible: false,
    isCaption: true,
  },
  {
    label: '*',
    value: 'isClear',
    isVisible: false,
    isCaption: true,
  },
];
