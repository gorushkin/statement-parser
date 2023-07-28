import { Currencies, Currency, rates } from '../index';
import { Transaction } from '../../helpers/types';
import { StatementType, currencyExchangeDirection } from './types';

const defaultCurrency: Currency = 'TRY';

export class Statement {
  constructor(
    public id: string,
    public transactions: Transaction[],
    public name: string,
    public currency: currencyExchangeDirection | null
  ) {}

  async updateTransactions() {
    const dataWithCurrencyPromises = this.transactions.map(async (item) => {
      const currentRate = await rates.getRate(
        item.processDate,
        this.currency?.from || Currencies.USD,
        this.currency?.to || Currencies.RUB
      );
      const rate = currentRate.value;
      // const rate = await this.getCurrencyValue(this.formatDate(item.processDate), 'TRY');
      const convertedAmount = 5;
      // const convertedAmount = getRoundedValue(rate * item.amount);
      return {
        ...item,
        rate,
        convertedAmount,
        currency: defaultCurrency,
        memo: `${defaultCurrency} - ${item.description}`,
        convertedBalance: 15,
        // convertedBalance: getRoundedValue(rate * item.balance),
      };
    });

    this.transactions = await Promise.all(dataWithCurrencyPromises);
  }

  getStatement(): StatementType {
    return {
      transactions: this.transactions,
      id: this.id,
      currency: this.currency,
      name: this.name,
    };
  }
}
