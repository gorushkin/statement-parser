import dayjs from 'dayjs';

type ClassNames = (false | string | true)[];

export const cn = (...classnames: ClassNames) => classnames.filter((item) => !!item).join(' ');
const DEFAULT_DATE_FORMAT = 'DD.MM.YYYY';

export const stringToDate = (value: string, format: string = DEFAULT_DATE_FORMAT): string =>
  dayjs(value).format(format);

export const numberToMoney = (value: number, decimalPlaces = 2) =>
  `${value?.toLocaleString(undefined, {
    maximumFractionDigits: decimalPlaces,
    minimumFractionDigits: decimalPlaces,
  })}`;
