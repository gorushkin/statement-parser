import axios from 'axios';

export type Request<T, K> = (args: T) => Promise<Response<K>>;

export type Response<T> = { data: T; message: string; ok: true } | { error: string; ok: false };

const BASE_URL = 'http://127.0.0.1:3000';

export const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});
