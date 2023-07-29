import { Currencies } from '../../entities';

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
  body: { name: string; sourceCurrency: Currencies; targetCurrency: Currencies };
}
