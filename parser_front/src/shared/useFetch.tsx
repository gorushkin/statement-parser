import { useCallback, useState } from 'react';
import { Request, Response } from 'src/app/config';
import { notificationStore } from 'src/features/Notifications';

class ApiError extends Error {
  constructor(message: string) {
    super(message);
  }
}

type UseFetch<T, K> = [
  {
    data: K | null;
    error: null | string;
    handleReset: () => void;
    isLoading: boolean;
    message: null | string;
  },
  (args: T) => Promise<void>,
];

const DEFAULT_SUCCESS_MESSAGE = 'Your action has been completed successfully.';
const DEFAULT_ERROR_MESSAGE = 'Your action could not be completed. Please try again later.';

// eslint-disable-next-line @typescript-eslint/ban-types
export const useFetch = <T, K>(cb: Request<T>): UseFetch<T, K> => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<K | null>(null);
  const [message, setMessage] = useState<null | string>(null);
  const [error, setError] = useState<null | string>(null);

  const handleReset = useCallback(() => {
    setMessage(null);
    setError(null);
    notificationStore.hideNotification();
  }, []);

  const fetchData = useCallback(
    async (args: T) => {
      setIsLoading(true);
      try {
        const response = (await cb(args)) as Response<K>;
        if (!response.ok) throw new ApiError(response.error);
        const message = response.message ?? DEFAULT_SUCCESS_MESSAGE;
        setData(response.data ? response.data : null);
        setMessage(response.message);
        notificationStore.showNotification({ message, status: 'success' });
      } catch (error) {
        // TODO: add displaying errors
        setData(null);
        setMessage(null);
        const message = error instanceof ApiError ? error.message : DEFAULT_ERROR_MESSAGE;
        setError(message);
        notificationStore.showNotification({ message, status: 'error' });
      } finally {
        setIsLoading(false);
      }
    },
    [cb]
  );

  return [{ data, error, handleReset, isLoading, message }, fetchData];
};
