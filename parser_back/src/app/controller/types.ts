import { Transaction } from 'parser';

export type StatementPayload = {
  name: string;
  statement: Transaction[];
};
export enum Currencies {
  RUB = 'RUB',
  TRY = 'TRY',
  USD = 'USD',
}

export type FileWithoutExt = {
  fieldName: string;
  originalFilename: string;
  path: string;
  size: number;
  name: string;
  type: string;
  headers: Record<string, string>;
} & object;

type Xlsx = {
  xlsx: FileWithoutExt;
};

type Csv = {
  csv: FileWithoutExt;
};

export type File = Xlsx | FileWithoutExt | Csv;

export interface FormattedRequest {
  files: Record<string, File>;
  body: { name: string; from: Currencies; to: Currencies };
}
