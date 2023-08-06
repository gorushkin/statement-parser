import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { FC } from 'react';
import { StatementCurrencies } from 'src/shared/api/models';
import { numberToMoney } from 'src/shared/utils';

import { Summary } from '../../model';
import styles from './StatementSummary.module.scss';

interface StatementSummaryProps {
  convertedSummary: Summary;
  currencies: StatementCurrencies;
  summary: Summary;
}

const StatementSummary: FC<StatementSummaryProps> = (props) => {
  const {
    convertedSummary,
    currencies: { sourceCurrency, targetCurrency },
    summary,
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
            <Td>{sourceCurrency}</Td>
            <Td>{numberToMoney(summary.startBalance)}</Td>
            <Td>{numberToMoney(summary.income)}</Td>
            <Td>{numberToMoney(summary.outcome)}</Td>
            <Td>{numberToMoney(summary.endBalance)}</Td>
          </Tr>
          <Tr>
            <Td>{targetCurrency}</Td>
            <Td>{numberToMoney(convertedSummary.startBalance)}</Td>
            <Td>{numberToMoney(convertedSummary.income)}</Td>
            <Td>{numberToMoney(convertedSummary.outcome)}</Td>
            <Td>{numberToMoney(convertedSummary.endBalance)}</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export { StatementSummary };
