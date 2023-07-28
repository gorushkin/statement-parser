import { Transaction } from '../../helpers/types';
import { Currencies } from '../types';

export type currencyExchangeDirection = {
  from: Currencies;
  to: Currencies;
};

export type StatementType = {
  transactions: Transaction[];
  id: string;
  currency: currencyExchangeDirection | null;
  name: string;
};
