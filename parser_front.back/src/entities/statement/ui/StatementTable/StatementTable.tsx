import { Heading, Table, TableContainer, Tbody } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE } from 'src/shared/routes';

import { statement } from '../../model';
import { StatementHead } from '../StatementHead';
import { StatementRow } from '../StatementRow';
import { StatementSummary } from '../StatementSummary';
import styles from './StatementTable.module.scss';

export const StatementTable = observer(() => {
  const { statementId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!statementId) return;
    statement.getStatement(statementId);
  }, [statementId]);

  if (!statementId) navigate(ROUTE.STATEMENTS);

  return (
    <>
      <Heading as="h1" mb="5" textAlign="center">
        {statement.name}
      </Heading>
      <StatementSummary
        convertedSummary={statement.convertedSummary}
        currencies={statement.currencies}
        summary={statement.summary}
      />
      <TableContainer className={styles.tableContainer}>
        <Table className={styles.table} variant="simple">
          <StatementHead />
          <Tbody>
            {statement.transactions.map((row) => (
              <StatementRow key={row.id} row={row} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
});
