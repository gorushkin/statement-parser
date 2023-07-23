import { instance as axios } from './base';
import { Response, Transaction } from './models';

export type GetStatementResponse = { transactions: Transaction[] };

const GET_STATEMENT_ROUTE = 'statements';

export const getStatementRequest = async ({ name }: { name: string }) => {
  const response = await axios.get<Response<GetStatementResponse>>(`${GET_STATEMENT_ROUTE}/${name}`);
  return response.data;
};
