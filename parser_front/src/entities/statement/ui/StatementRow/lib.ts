import { numberToMoney, stringToDate } from 'src/shared/utils';

export const columnFormatMapping = {
  amount: (value: number) => numberToMoney(Number(value)),
  date: (value: string) => stringToDate(value),
};
