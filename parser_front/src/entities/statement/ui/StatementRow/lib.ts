import dayjs from 'dayjs';

const DEFAULT_DATE_FORMAT = 'DD.MM.YYYY';

const stringToDate = (value: string): string => dayjs(value).format(DEFAULT_DATE_FORMAT);

const numberToMoney = (value: number, decimalPlaces = 2) =>
  `${value?.toLocaleString(undefined, {
    maximumFractionDigits: decimalPlaces,
    minimumFractionDigits: decimalPlaces,
  })}`;

export const columnFormatMapping = {
  amount: (value: number) => numberToMoney(Number(value)),
  date: (value: string) => stringToDate(value),
};
