import { BaseDB } from '../BaseDB/BaseDB';
import dayjs from 'dayjs';
import { getRates } from '../../helpers/until';
import { Currencies } from '../types';
import { CurrencyRecord, DateString } from './types';

export type RateRecord = Record<DateString, CurrencyRecord>;
const DATE_FORMAT = 'DD/MM/YYYY';

export class Rates extends BaseDB {
  private rates: RateRecord = {} as RateRecord;
  private filename: string = 'rates.json';

  async init(path: string) {
    this.setPath(path, 'rates');
    await this.readRates();
  }

  private async readRates() {
    this.rates = await this.readJSONData(this.filename);
  }

  private async saveRates(data: { rates: CurrencyRecord; date: DateString }) {
    this.rates = { ...this.rates, [data.date]: data.rates };
    await this.writeJSONData(this.filename, this.rates);
  }

  async updateRates(date: DateString) {
    const rates = await getRates(date);
    await this.saveRates({ date, rates });
    return rates;
  }

  async getRate(date: string, from: Currencies, to: Currencies) {
    const formattedDate = dayjs(date).format(DATE_FORMAT);
    const rates = this.rates[formattedDate] || (await this.updateRates(formattedDate));
    const rate = rates[from];
    return rates ? rates[from] : ({ value: 0 } as typeof rate);
  }
}
