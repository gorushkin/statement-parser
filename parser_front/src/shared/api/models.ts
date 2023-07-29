export type Request<T, K> = (args: T) => Promise<Response<K>>;

export type Response<T> = { data: T; message: string; ok: true } | { error: string; ok: false };

export type Transaction = {
  amount: number;
  balance: number;
  convertedAmount: number;
  convertedBalance: number;
  data: string;
  description: string;
  editedAmount: number;
  id: string;
  isClear: boolean;
  memo: string;
  payeeId: string;
  payeeName: string;
  processDate: string;
  rate: number;
  transactionDate: string;
};

export enum Currencies {
  RUB = 'RUB',
  TRY = 'TRY',
  USD = 'USD',
}

export enum ConvertDirections {
  SOURCE = 'sourceCurrency',
  TARGET = 'targetCurrency',
}

export type StatementCurrencies = {
  [ConvertDirections.SOURCE]: Currencies | null;
  [ConvertDirections.TARGET]: Currencies | null;
};

export type Transactions = Transaction[];

export type UploadFileProps = { currencies: StatementCurrencies; file: File; name: string };
export type ApiUploadFileResponse = Response<null>;

export type GetStatementsResponse = string[];
export type ApiStatementsResponse = Response<GetStatementsResponse>;

export type GetStatementResponse = { currencies: StatementCurrencies; name: string; transactions: Transaction[] };
export type ApiStatementResponse = Response<GetStatementResponse>;
