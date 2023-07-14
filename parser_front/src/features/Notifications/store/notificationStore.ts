import { makeAutoObservable } from 'mobx';

type NotificationType = 'error' | 'info' | 'success' | 'warning' | null;

type showAlertProps = { message: string; status: NotificationType };

class NotificationStore {
  message: string;
  status: NotificationType;

  constructor() {
    makeAutoObservable(this);
    this.message = '';
    this.status = null;
  }

  hideNotification() {
    this.message = '';
    this.status = null;
  }

  showNotification({ message, status: type }: showAlertProps) {
    this.message = message;
    this.status = type;
  }
}

export { NotificationStore };
