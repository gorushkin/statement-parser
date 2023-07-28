import { Transaction as ParserTransaction } from 'parser';
import { Currency } from '../entities';

export type Transaction = ParserTransaction;
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

export type StatementPayload = {
  name: string;
  statement: Transaction[];
};
