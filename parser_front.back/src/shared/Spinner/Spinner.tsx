import { Spinner as ChackraSpinner } from '@chakra-ui/react';
import { FC } from 'react';

import { cn } from '../utils';
import styles from './Spinner.module.scss';

interface SpinnerProps {
  center?: boolean;
  size?: 'lg' | 'md' | 'sm' | 'xl' | 'xs';
}

const Spinner: FC<SpinnerProps> = (props) => {
  const { center: isCenter = false, size = 'md' } = props;
  return (
    <ChackraSpinner
      className={cn(styles.spinner, isCenter && styles.spinnerCenter)}
      color="blue.500"
      emptyColor="gray.200"
      size={size}
      speed="0.65s"
      thickness="4px"
    />
  );
};

export { Spinner };
