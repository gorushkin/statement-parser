import { Table, TableContainer, Tbody } from '@chakra-ui/react';
import { FC } from 'react';

// TODO: move types somewhere else
import { Header, Transaction } from '../../model/types';
import styles from './StatementTable.module.scss';
import { StatementTableHead } from './StatementTableHead';
import { StatementTableRow } from './StatementTableRow';

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
          <StatementTableHead headers={headers} />
          <Tbody>
            {rows.map((row, index) => (
              <StatementTableRow key={index} row={row} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export { StatementTable };
