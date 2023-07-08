import { Currencies } from '../helpers/types';

export type Rates = Record<string, Currencies>;

export type DBResult<T> = { data: T; ok: true } | { error: string; ok: false };

export type Summary = { income: number; outcome: number; startBalance: number; endBalance: number };

export type GroupedSummary = { defaultSummary: Summary; convertedSummary: Summary };
