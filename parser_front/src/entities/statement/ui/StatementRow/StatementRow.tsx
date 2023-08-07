import { Td, Tr } from '@chakra-ui/react';
import { FC } from 'react';

import { Transaction } from '../../model/types';
import styles from './StatementRow.module.scss';

interface StatementRowProps {
  row: Transaction;
}

const StatementRow: FC<StatementRowProps> = ({ row }) => {
  const columns = Object.entries(row).map(([key, value]) => ({ key, value }));

  return (
    <Tr className={styles.tableRow}>
      {columns.map((item) => (
        <Td key={item.key}>{item.value}</Td>
      ))}
    </Tr>
  );
};

export { StatementRow };
