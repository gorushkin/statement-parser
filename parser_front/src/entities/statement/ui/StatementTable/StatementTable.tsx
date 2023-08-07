import { Table, TableContainer, Tbody } from '@chakra-ui/react';
import { FC } from 'react';

import { Header, Transaction } from '../../model/types';
import { StatementHead } from '../StatementHead';
import { StatementRow } from '../StatementRow';
import styles from './StatementTable.module.scss';

interface StatementTableProps {
  headers: Header[];
  rows: Transaction[];
}

const StatementTable: FC<StatementTableProps> = (props) => {
  const { headers, rows } = props;
  return (
    <>
      <TableContainer className={styles.tableContainer}>
        <Table className={styles.table} variant="simple">
          <StatementHead headers={headers} />
          <Tbody>
            {rows.map((row, index) => (
              <StatementRow key={index} row={row} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export { StatementTable };
