import { Transaction } from 'parser';
import { Currencies } from '../../app/controller/types';
import { Currency } from '../../helpers/types';

type CurrencyInfo = {
  from: Currencies;
  to: Currencies;
};

const defaultCurrency: Currency = 'TRY';

export class Statement {
  private transactions: Transaction[];
  private currency: CurrencyInfo | null;
  private name: string;
  private id: string;
  static path: string;

  constructor({
    name,
    currency,
    transactions,
    id,
  }: {
    transactions: Transaction[];
    name: string;
    currency?: CurrencyInfo | null;
    id: string;
  }) {
    this.currency = currency ?? null;
    this.id = id;
    this.name = name;
    this.transactions = transactions;
  }

  async updateTransactions() {
    const dataWithCurrencyPromises = this.transactions.map(async (item) => {
      const rate = 15;
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

  getSerializedData() {
    return JSON.stringify(
      { transactions: this.transactions, id: this.id, currency: this.currency, name: this.name },
      null,
      2
    );
  }
}
