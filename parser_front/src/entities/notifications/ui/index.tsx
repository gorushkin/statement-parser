import { Alert, AlertDescription, AlertIcon, AlertTitle, CloseButton } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { FC } from 'react';

import { notificationStore } from '../index';
import styles from './styles.module.scss';

const Notifications: FC = observer(() => {
  const { notifications } = notificationStore;

  return notifications.map(({ destroy, id, message, status }) => (
    <Alert className={styles.wrapper} key={id} status={status}>
      <AlertIcon />
      <AlertTitle>{status.toUpperCase()}:</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
      <CloseButton className={styles.closeButton} onClick={destroy} />
    </Alert>
  ));
});

export { Notifications };
