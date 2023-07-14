import { makeAutoObservable } from 'mobx';

type Status = 'error' | 'info' | 'success' | 'warning';

const DEFAULT_TIMER = 5000;

class Notification {
  #onDestroy: (id: string) => void;
  #start = () => {
    this.#timer = setTimeout(() => this.#onDestroy(this.id), DEFAULT_TIMER);
  };
  #timer: null | number;
  destroy = () => {
    if (!this.#timer) return;
    clearTimeout(this.#timer);
    this.#onDestroy(this.id);
  };

  id: string;
  message: string;
  status: Status;

  constructor({ message, onDestroy, status }: { message: string; onDestroy: (id: string) => void; status: Status }) {
    this.status = status;
    this.message = message;
    this.#timer = null;
    this.id = new Date().getTime().toString(36);
    this.#onDestroy = onDestroy;
    this.#start();
  }
}

class NotificationStore {
  addNotification = ({ message, status }: { message: string; status: Status }) => {
    const notification = new Notification({ message, onDestroy: this.removeNotification, status });
    this.notifications.push(notification);
  };

  notifications: Notification[];

  removeNotification = (id: string) => {
    this.notifications = this.notifications.filter((item) => item.id !== id);
  };

  constructor() {
    makeAutoObservable(this);
    this.notifications = [];
  }
}

export { NotificationStore };
