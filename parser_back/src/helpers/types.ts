export type Currency = 'TRY' | 'USD' | 'RUB';

export interface CBRCurrencies {
  ValCurs: {
    Valute: {
      CharCode: {
        _text: Currency;
      };
      Name: {
        _text: string;
      };
      Value: {
        _text: string;
      };
      Nominal: {
        _text: string;
      };
    }[];
  };
}

type CurrencyInfo = {
  name: string;
  value: number;
  responseNominal: number;
  code: Currency;
  responseValue: number;
  convertedValue: number;
};

export type Currencies = Record<Currency, CurrencyInfo>;
