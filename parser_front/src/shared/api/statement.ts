import { instance } from './base';
import { ApiStatementResponse, ApiStatementsResponse, ApiUploadFileResponse, UploadFileProps } from './models';

const apiUrls = {
  file: 'files',
  getStatement: 'statements',
  getStatementByName: (name: string) => `statements/${name}`,
};

export const getStatementRequest = async ({ name }: { name: string }) => {
  const response = await instance.get<ApiStatementResponse>(apiUrls.getStatementByName(name));
  return response.data;
};

export const getStatementsRequest = async () => {
  const response = await instance.get<ApiStatementsResponse>(apiUrls.getStatement);
  return response.data;
};

export const uploadFileRequest = async ({ currencies: { from, to }, file, name }: UploadFileProps) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append(name, file);
  formData.append('from', from);
  formData.append('to', to);
  const response = await instance.post<ApiUploadFileResponse>(apiUrls.file, formData);
  return response.data;
};
