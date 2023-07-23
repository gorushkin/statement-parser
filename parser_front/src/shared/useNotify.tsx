import { useCallback } from 'react';
import { notificationStore, Status } from 'src/entities/notifications';

export const useNotify = () => {
  const addNotify = useCallback(({ message, status }: { message: string; status: Status }) => {
    notificationStore.addNotification({ message, status });
  }, []);

  const addErrorMessage = useCallback(({ message }: { message: string }) => {
    notificationStore.addErrorMessage(message);
  }, []);

  const addSuccessMessage = useCallback(({ message }: { message: string }) => {
    notificationStore.addSuccessMessage(message);
  }, []);

  const removeNotify = useCallback((id: string) => {
    notificationStore.removeNotification(id);
  }, []);

  return { addErrorMessage, addNotify, addSuccessMessage, removeNotify };
};
