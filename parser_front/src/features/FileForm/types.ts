import { ConvertDirections, Currencies, StatementCurrencies } from 'src/shared/api/models';

export type FileInfo = {
  file: File;
  name: string;
  size: number;
};

// export type ConvertDirection = keyof StatementCurrencies;

export type HandleCurrenciesChangeType = ({
  direction,
  value,
}: {
  direction: ConvertDirections;
  value: Currencies;
}) => void;

export enum FORMATS {
  CSV = 'csv',
  XLS = 'xls',
}
