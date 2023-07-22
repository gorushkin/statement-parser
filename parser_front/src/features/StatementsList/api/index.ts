import { axios, Response } from 'src/shared/api';

const GET_STATEMENTS_ROUTE = 'statements';

export type GetStatementsResponse = string[];

export const getStatementsRequest = async () => {
  const response = await axios.get<Response<GetStatementsResponse>>(GET_STATEMENTS_ROUTE);
  return response.data;
};
