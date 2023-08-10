import { Th, Thead, Tr } from '@chakra-ui/react';
import { FC } from 'react';

import styles from './StatementTableHead.module.scss';
interface StatementTableHeadProps {
  headers: string[];
}

const StatementTableHead: FC<StatementTableHeadProps> = ({ headers }) => (
  <Thead className={styles.tableHeader}>
    <Tr>
      {headers.map((item, idx) => (
        <Th key={idx}>{item}</Th>
      ))}
    </Tr>
  </Thead>
);

export { StatementTableHead };
