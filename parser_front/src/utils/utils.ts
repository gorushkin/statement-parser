import * as dayjs from 'dayjs';
import { Column, PropertyType, Statement } from '../types';

type ClassNames = (string | true | false)[];

export const cn = (...classnames: ClassNames) =>
  classnames.filter((item) => !!item).join(' ');

export const propertyTypesMapping: Record<Column, PropertyType> = {
  amount: 'numberCur',
  balance: 'number',
  data: 'string',
  description: 'string',
  payeeName: 'string',
  processDate: 'date',
  transactionDate: 'date',
  memo: 'string',
  isClear: 'boolean',
  rate: 'number',
  convertedAmount: 'number',
};

const stringToDate = (value: string): string =>
  dayjs(value).format('DD.MM.YYYY');

const numberToMoney = (value: number, decimalPlaces = 2) =>
  `${value?.toLocaleString(undefined, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  })}`;

export const convertValue = (
  value: string | number | boolean,
  type: PropertyType
): { displayValue: string; copyValue: string } => {
  const mapping = {
    number: (value: string) => ({
      displayValue: numberToMoney(Number(value)),
      copyValue: Math.abs(Number(value)).toString().replace('.', ','),
    }),
    numberCur: (value: string) => ({
      displayValue: numberToMoney(Number(value)),
      copyValue: Math.abs(Number(value)).toString().replace('.', ',') + ' TRY',
    }),
    string: (value = '') => ({
      displayValue: value,
      copyValue: value,
    }),
    date: (value = '') => ({
      displayValue: stringToDate(value),
      copyValue: stringToDate(value),
    }),
    boolean: (value: string) => ({
      displayValue: value,
      copyValue: value,
    }),
  };

  return mapping[type](value.toString());
};

export const compareStatements = (s1: Statement, s2: Statement): boolean =>
  JSON.stringify(s1) === JSON.stringify(s2);
