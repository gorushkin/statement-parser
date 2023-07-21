import axios from 'axios';

const PORT = '3500';
const URL = 'http://127.0.0.1';

const baseURL = PORT ? `${URL}:${PORT}` : URL;

export const instance = axios.create({
  baseURL,
  timeout: 1000,
});
