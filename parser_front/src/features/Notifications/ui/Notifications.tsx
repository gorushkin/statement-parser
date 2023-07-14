import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { FC } from 'react';

import { notificationStore } from '../index';

const Notifications: FC = observer(() => {
  const { message, status } = notificationStore;

  if (!status) return null;

  return (
    <Alert status={status}>
      <AlertIcon />
      <AlertTitle>{status.toUpperCase()}:</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
});

export { Notifications };
