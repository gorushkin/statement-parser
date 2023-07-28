import fs from 'fs/promises';
import convert from 'xml-js';
import { CBRCurrencies } from './types';
import { getXMLCurrencies } from '../api';
import { join } from 'path';
import { CurrencyRecord } from '../entities/';

export const getAbsolutePath = (target: string) => join(process.cwd(), target);

export const makeDir = async (path: string) => {
  try {
    await fs.mkdir(path);
  } catch (error) {
    console.log('error: ', error);
  }
};

export const checkFilesPath = async (path: string) => {
  try {
    await fs.access(path);
  } catch (error) {
    console.log('we will add a folder');
    await makeDir(path);
  }
};

export const delay = async (cb: Function, time: number = 1000) =>
  new Promise((resolve) => setTimeout(() => resolve(cb()), time));

const convertStringToNumber = (str: string) => parseFloat(str.replace(',', '.'));

const getValue = (value: string, nominal: string) => {
  return Number((convertStringToNumber(value) / convertStringToNumber(nominal)).toFixed(4));
};

export const getRates = async (date: string) => {
  const xmlCurrencies = await getXMLCurrencies(date);
  const convertedCurrencies = convert.xml2js(xmlCurrencies, { compact: true });
  const cbrCurrencies = convertedCurrencies as CBRCurrencies;
  const currencies = cbrCurrencies.ValCurs.Valute.reduce<CurrencyRecord>(
    (acc, item) => ({
      ...acc,
      [item.CharCode._text]: {
        name: item.Name._text,
        responseValue: convertStringToNumber(item.Value._text),
        responseNominal: convertStringToNumber(item.Nominal._text),
        value: getValue(item.Value._text, item.Nominal._text),
        code: item.CharCode._text,
      },
    }),
    {} as CurrencyRecord
  );
  return currencies;
};

export const getRoundedValue = (value: number) => Math.round(value * 100) / 100;
