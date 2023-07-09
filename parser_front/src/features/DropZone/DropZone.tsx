import { Box, Text } from '@chakra-ui/react';
import { FC } from 'react';

import styles from './DropZone.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DropZoneProps {}

const DropZone: FC<DropZoneProps> = () => {
  return (
    <Box className={styles.dropZone}>
      <Box className={styles.textWrapper}>
        <Text>
          Drag'n'drop your statement or{' '}
          <Text as={'button'} className={styles.link}>
            click
          </Text>{' '}
          here
        </Text>
      </Box>
    </Box>
  );
};

export { DropZone };
