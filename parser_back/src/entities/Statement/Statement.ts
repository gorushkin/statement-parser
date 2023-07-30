import { rates } from '../index';
import { Transaction } from '../../helpers/types';
import { StatementType, StatementCurrencies } from './types';
import { getRoundedValue, numberToMoney } from '../../helpers/until';

export class Statement {
  constructor(
    public id: string,
    public transactions: Transaction[],
    public name: string,
    public currencies: StatementCurrencies
  ) {}

  async updateTransactions() {
    const dataWithCurrencyPromises = this.transactions.map(async (item) => {
      const currentRate = await rates.getRate(
        item.processDate,
        this.currencies?.sourceCurrency,
        this.currencies?.targetCurrency
      );
      const rate = currentRate.value;
      const convertedAmount = getRoundedValue(rate * item.amount);
      const convertedBalance = getRoundedValue(rate * item.balance);
      const formattedBalance = numberToMoney(item.balance);
      return {
        ...item,
        rate,
        convertedAmount,
        memo: `${item.amount} ${this.currencies.sourceCurrency} (rate: ${rate}):[${formattedBalance}] - ${item.description}`,
        convertedBalance,
      };
    });

    this.transactions = await Promise.all(dataWithCurrencyPromises);
  }

  getStatement(): StatementType {
    return {
      transactions: this.transactions,
      id: this.id,
      currencies: this.currencies,
      name: this.name,
    };
  }
}
