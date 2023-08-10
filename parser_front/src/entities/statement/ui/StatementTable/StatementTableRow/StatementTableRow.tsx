import { Td, Tr } from '@chakra-ui/react';
import { FC } from 'react';

import { Transaction } from '../../../model/types';
import styles from './StatementTableRow.module.scss';

interface StatementTableRowProps {
  row: Transaction;
}

const StatementTableRow: FC<StatementTableRowProps> = ({ row }) => {
  const columns = Object.entries(row).map(([key, value]) => ({ key, value }));

  return (
    <Tr className={styles.tableRow}>
      {columns.map((item) => (
        <Td key={item.key}>{item.value}</Td>
      ))}
    </Tr>
  );
};

export { StatementTableRow };
