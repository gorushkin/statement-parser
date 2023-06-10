import { FileResponse, Statement } from '../types';

const BASE_URL = 'http://127.0.0.1:3000';

type Route = 'files' | 'root' | 'statements';

const ROUTE: Record<Route, string> = {
  files: '/files',
  root: '/',
  statements: '/statements',
};

const getRoute = (route: Route, id?: string) =>
  id ? `${BASE_URL}${ROUTE[route]}/${id}` : `${BASE_URL}${ROUTE[route]}`;

export const getTest = async () => {
  await fetch(getRoute('root'));
};

export const uploadFile = async ({
  file,
  name,
}: {
  file: File;
  name: string;
}) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append(name, file);
  const res = await fetch(getRoute('files'), {
    method: 'POST',
    body: formData,
  });

  return (await res.json()) as FileResponse;
};

export const getStatements = async () => {
  const res = await fetch(getRoute('statements'));
  return await res.json();
};

export const getStatement = async (name: string) => {
  const res = await fetch(getRoute('statements', name));
  return await res.json();
};

export const updateStatement = async ({
  name,
  statement,
}: {
  name: string;
  statement: Statement;
}) => {
  const res = await fetch(getRoute('statements'), {
    method: 'POST',
    body: JSON.stringify({ name, statement }),
  });
  return await res.json();
};
