import { useCallback, useState } from 'react';
import { Request, Response } from 'src/app/config';

class ApiError extends Error {
  constructor(message: string) {
    super(message);
  }
}

type UseFetch<T, K> = [
  {
    data: K | null;
    error: null | string;
    isLoading: boolean;
    message: null | string;
  },
  (args: T) => Promise<void>,
];

// eslint-disable-next-line @typescript-eslint/ban-types
export const useFetch = <T, K>(cb: Request<T>): UseFetch<T, K> => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<K | null>(null);
  const [message, setMessage] = useState<null | string>(null);
  const [error, setError] = useState<null | string>(null);

  const fetchData = useCallback(
    async (args: T) => {
      setIsLoading(true);
      try {
        const response = (await cb(args)) as Response<K>;
        if (!response.ok) throw new ApiError(response.error);
        setData(response.data ? response.data : null);
        setMessage(response.message ?? null);
      } catch (error) {
        // TODO: add displaying errors
        setData(null);
        setMessage(null);
        const errorMessage = error instanceof ApiError ? error.message : 'Something went wrong';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [cb]
  );

  return [{ data, error, isLoading, message }, fetchData];
};
