import { Th, Thead, Tr } from '@chakra-ui/react';
import { FC } from 'react';

import styles from './StatementHead.module.scss';

interface StatementHeadProps {}

const StatementHead: FC<StatementHeadProps> = () => {
  return (
    <Thead className={styles.tableHeader}>
      <Tr>
        <Th>Process Date</Th>
        <Th>Transaction Date</Th>
        <Th>Amount</Th>
        <Th>Converted Amount</Th>
        <Th>Balance</Th>
        <Th>Converted Balance</Th>
        <Th>Description</Th>
        <Th>Payee</Th>
        <Th>Memo</Th>
      </Tr>
    </Thead>
  );
};

export { StatementHead };
