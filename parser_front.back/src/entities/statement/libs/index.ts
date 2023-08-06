import { Transaction } from 'src/shared/api';
import { stringToDate } from 'src/shared/utils';
export const DEFAULT_DATE_FORMAT = 'MM/DD/YYYY';

type ColumnsType = { convert: (value: string) => string; map: keyof Transaction; name: string };

export const columns: ColumnsType[] = [
  { convert: (value: string) => stringToDate(value, DEFAULT_DATE_FORMAT), map: 'processDate', name: 'Date' },
  { convert: (value: string) => value, map: 'payeeName', name: 'Payee' },
  { convert: (value: string) => value, map: 'memo', name: 'Memo' },
  { convert: (value: string) => value, map: 'convertedAmount', name: 'Amount' },
];
