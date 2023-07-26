export type Request<T, K> = (args: T) => Promise<Response<K>>;

export type Response<T> = { data: T; message: string; ok: true } | { error: string; ok: false };

export type Transaction = {
  amount: number;
  balance: number;
  convertedAmount: number;
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

export type Transactions = Transaction[];

export type UploadFileProps = { file: File; name: string };
export type ApiUploadFileResponse = Response<null>;

export type GetStatementsResponse = string[];
export type ApiStatementsResponse = Response<GetStatementsResponse>;

export type GetStatementResponse = { name: string; transactions: Transaction[] };
export type ApiStatementResponse = Response<GetStatementResponse>;
