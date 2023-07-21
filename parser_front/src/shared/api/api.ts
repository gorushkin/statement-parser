import axios from 'axios';

const PORT = '3500';
const URL = 'http://127.0.0.1';

const getBaseUrl = (baseURL: string, port: string) => (port ? `${baseURL}:${port}` : baseURL);

export type Request<T, K> = (args: T) => Promise<Response<K>>;

export type Response<T> = { data: T; message: string; ok: true } | { error: string; ok: false };

const baseURL = getBaseUrl(URL, PORT);

export const instance = axios.create({
  baseURL,
  timeout: 1000,
});
