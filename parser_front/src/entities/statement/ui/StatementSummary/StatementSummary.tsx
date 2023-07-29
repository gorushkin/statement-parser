import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { FC } from 'react';
import { StatementCurrencies } from 'src/shared/api/models';

import { Summary } from '../../model';
import { columnFormatMapping } from '../StatementRow/lib';
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
            <Td>{summary.startBalance}</Td>
            <Td>{summary.income}</Td>
            <Td>{summary.outcome}</Td>
            <Td>{summary.endBalance}</Td>
          </Tr>
          <Tr>
            <Td>{targetCurrency}</Td>
            <Td>{columnFormatMapping.amount(convertedSummary.startBalance)}</Td>
            <Td>{columnFormatMapping.amount(convertedSummary.income)}</Td>
            <Td>{columnFormatMapping.amount(convertedSummary.outcome)}</Td>
            <Td>{columnFormatMapping.amount(convertedSummary.endBalance)}</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export { StatementSummary };
