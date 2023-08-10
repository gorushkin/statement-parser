import { Table, TableContainer } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

import styles from './Table.module.scss';

interface TableProps {
  children: ReactNode;
}

const ITable: FC<TableProps> = ({ children }) => (
  <TableContainer className={styles.table}>
    <Table>{children}</Table>
  </TableContainer>
);

export { ITable };
