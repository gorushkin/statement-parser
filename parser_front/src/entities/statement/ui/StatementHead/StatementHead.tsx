import { Th, Thead, Tr } from '@chakra-ui/react';
import { FC } from 'react';

import styles from './StatementHead.module.scss';
interface StatementHeadProps {
  headers: string[];
}

const StatementHead: FC<StatementHeadProps> = ({ headers }) => (
  <Thead className={styles.tableHeader}>
    <Tr>
      {headers.map((item, idx) => (
        <Th key={idx}>{item}</Th>
      ))}
    </Tr>
  </Thead>
);

export { StatementHead };
