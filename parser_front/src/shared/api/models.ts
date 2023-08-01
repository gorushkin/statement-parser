export type Request<T, K> = (args: T) => Promise<Response<K>>;

export type Response<T> = { data: T; message: string; ok: true } | { error: string; ok: false };

export type Transaction = {
  amount: number;
  balance: number;
  convertedAmount: number;
  convertedBalance: number;
  data: string;
  description: string;
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
  [ConvertDirections.SOURCE]: Currencies;
  [ConvertDirections.TARGET]: Currencies;
};

export type Transactions = Transaction[];
// TODO: remove this type
export type StatementType = { currencies: StatementCurrencies; id: string; name: string; transactions: Transaction[] };

export type UploadFileProps = { currencies: StatementCurrencies; file: File; name: string };
export type ApiUploadFileResponse = Response<StatementType>;

export type GetStatementsResponse = string[];
export type ApiStatementsResponse = Response<GetStatementsResponse>;

export type GetStatementResponse = StatementType;
export type ApiStatementResponse = Response<GetStatementResponse>;
