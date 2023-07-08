import { Transaction } from 'parser';

export type StatementPayload = {
  name: string;
  statement: Transaction[];
};

type File = {
  fieldName: string;
  originalFilename: string;
  path: string;
  size: number;
  name: string;
  type: string;
  headers: Record<string, string>;
};

export interface FormattedRequest extends Request {
  files: Record<string, File>;
}
