import { ReactNode } from 'react';
import styles from './Modal.module.scss';

export const Modal = ({
  visible,
  children,
}: {
  visible: boolean;
  children: ReactNode;
}) => {
  if (!visible) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
};
