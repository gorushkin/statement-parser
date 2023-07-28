export type Currency = 'TRY' | 'USD' | 'RUB';

type CurrencyInfo = {
  name: string;
  value: number;
  responseNominal: number;
  code: Currency;
  responseValue: number;
  convertedValue: number;
};

export type CurrencyRecord = Record<Currency, CurrencyInfo>;
export type DateString = string;
