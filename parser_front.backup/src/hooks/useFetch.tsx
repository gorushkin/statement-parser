import { useCallback, useState } from 'react';

type Options = { onSuccess?: Function; onFail?: Function };

type Result = { isLoading: boolean; data: any; error: any };

type UseFetch = (
  request: Function,
  options?: Options
) => [result: Result, handler: Function];

export const useFetch: UseFetch = (
  request,
  { onSuccess, onFail } = { onSuccess: () => {}, onFail: () => {} }
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const fetchData = async (params?: any) => {
    setIsLoading(true);
    try {
      const response = await request(params);
      if (response.error) throw new Error(response.error);
      if (!response?.data) return;
      setData(response.data);
      if (onSuccess) onSuccess(response.data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Something went wrong';
      setError(errorMessage);
      if (onFail) onFail(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handler = useCallback((params?: any) => {
    fetchData(params);
  }, []);

  return [{ isLoading, data, error }, handler];
};
