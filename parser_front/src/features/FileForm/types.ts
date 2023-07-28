import { Currencies } from 'src/shared/api/models';

export type FileInfo = {
  file: File;
  name: string;
  size: number;
};

export type HandleCurrenciesChangeType = ({
  direction,
  value,
}: {
  direction: 'from' | 'to';
  value: Currencies;
}) => void;

export type ConvertDirection = 'from' | 'to';

export type CurrencyState = { from: Currencies; to: Currencies };
