import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import { Notifications } from 'src/entities/notifications';
import { cn } from 'src/shared/utils';

import styles from './Notifications.module.scss';

interface NotificationWidgetProps {
  classNames?: string;
}

const NotificationWidget: FC<NotificationWidgetProps> = ({ classNames = '' }) => (
  <Box className={cn(classNames, styles.wrapper)}>
    <Notifications />
  </Box>
);

export { NotificationWidget };
