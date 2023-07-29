import { Transaction } from '../../helpers/types';
import { Currencies } from '../types';

export type StatementCurrencies = {
  sourceCurrency: Currencies;
  targetCurrency: Currencies;
};

export type StatementType = {
  transactions: Transaction[];
  id: string;
  currencies: StatementCurrencies | null;
  name: string;
};
