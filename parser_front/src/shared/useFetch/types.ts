import { Request } from 'src/shared/api';

export type CallBack<K> = (args: { data: K; message: string }) => void;

export type UseFetchResult<T, K> = [
  {
    data: K;
    error: null | string;
    handleReset: () => void;
    isLoading: boolean;
    message: null | string;
  },
  (args?: T) => Promise<void>,
];

export type UseFetchParams<K> = {
  init?: K;
  onError?: CallBack<K>;
  onSuccess?: CallBack<K>;
};

export type UseFetch = <T, K>(cb: Request<T, K>, params?: Partial<UseFetchParams<K>>) => UseFetchResult<T, K>;

export type Payload<K> = { data: K; message: string };
