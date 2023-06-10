export type Transaction = {
  id: string;
  description: string;
  payeeId: string;
  payeeName: string;
  transactionDate: string;
  processDate: string;
  amount: number;
  rate: number;
  balance: number;
  memo: string;
  data: string;
  isClear: boolean;
  convertedAmount: number;
};

export type Summary = {
  income: number;
  outcome: number;
  startBalance: number;
  endBalance: number;
};

export type GroupedSummary = {
  defaultSummary: Summary;
  convertedSummary: Summary;
};

export type Statement = {
  transactions: Transaction[];
  summary: GroupedSummary;
};

export type Payee = { id: string; name: string; displayName: string };
export type Payees = Record<string, Payee>;

export type TableMode = 'groups' | 'whole';

export type Column =
  | 'description'
  | 'payeeName'
  | 'transactionDate'
  | 'processDate'
  | 'amount'
  | 'balance'
  | 'memo'
  | 'data'
  | 'isClear'
  | 'rate'
  | 'convertedAmount';

export type Columns = {
  label: string;
  value: Column;
  isVisible: boolean;
  isCaption: boolean;
}[];

export type TransactionGroup = Record<string, Statement>;

export type Value = string | Date | number | boolean;
export type PropertyType =
  | 'number'
  | 'date'
  | 'string'
  | 'boolean'
  | 'numberCur';
export type RowMode = 'allColumns' | 'dataColumn';

export type FileInfo = {
  name: string | null;
  size: number | null;
  content: File | null;
};

export type Page = 'first' | 'second';

export type Context = {
  fileInfo: FileInfo;
  setFileInfo: React.Dispatch<React.SetStateAction<FileInfo>>;
  page: Page;
  setPage: React.Dispatch<React.SetStateAction<Page>>;
};

export type Func = (transactions: Statement) => Statement;

export type FileResponse = { transactions: Statement; payees: Payees };

export type Sheet = { name: string; transactions: Statement };

export type Filenames = string[];
