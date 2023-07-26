import { Transaction } from 'parser';

export type StatementPayload = {
  name: string;
  statement: Transaction[];
};

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

export interface FormattedRequest extends Request {
  files: Record<string, File>;
}
