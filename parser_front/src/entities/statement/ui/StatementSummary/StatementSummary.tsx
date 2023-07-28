import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { FC } from 'react';

import { Summary } from '../../model';
import styles from './StatementSummary.module.scss';

interface StatementSummaryProps {
  summary: Summary;
}

const StatementSummary: FC<StatementSummaryProps> = (props) => {
  const {
    summary: { endBalance, income, outcome, startBalance },
  } = props;

  return (
    <TableContainer>
      <Table className={styles.table}>
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Start Balance</Th>
            <Th>Income</Th>
            <Th>Outcome</Th>
            <Th>End Balance</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Current Currency</Td>
            <Td>{startBalance}</Td>
            <Td>{income}</Td>
            <Td>{outcome}</Td>
            <Td>{endBalance}</Td>
          </Tr>
          <Tr>
            <Td>Converted Currency</Td>
            <Td>{startBalance}</Td>
            <Td>{income}</Td>
            <Td>{outcome}</Td>
            <Td>{endBalance}</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export { StatementSummary };
