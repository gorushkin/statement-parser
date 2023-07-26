import { instance } from './base';
import { GetStatementResponse, GetStatementsResponse, Response } from './models';

const apiUrls = {
  getStatement: 'statements',
  getStatementByName: (name: string) => `statements/${name}`,
};

export const getStatementRequest = async ({ name }: { name: string }) => {
  const response = await instance.get<Response<GetStatementResponse>>(apiUrls.getStatementByName(name));
  return response.data;
};

export const getStatementsRequest = async () => {
  const response = await instance.get<Response<GetStatementsResponse>>(apiUrls.getStatement);
  return response.data;
};
