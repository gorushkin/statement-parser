import { Heading, Table, TableContainer, Tbody } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { statementApi } from 'src/shared/api';
import { ROUTE } from 'src/shared/routes';
import { useFetch } from 'src/shared/useFetch';
import { useNotify } from 'src/shared/useNotify';

import { statement } from '../../model';
import { StatementHead } from '../StatementHead';
import { StatementRow } from '../StatementRow';
import styles from './StatementTable.module.scss';

export const StatementTable = observer(() => {
  const { addErrorMessage } = useNotify();

  const [, fetchData] = useFetch(statementApi.getStatementRequest, {
    init: { name: '', transactions: [] },
    onError: addErrorMessage,
    onSuccess: (res) => {
      statement.transactions = res.data.transactions;
      statement.title = res.data.name;
    },
  });

  const { statementId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (statementId) void fetchData({ name: statementId });
  }, [fetchData, statementId]);

  if (!statementId) navigate(ROUTE.STATEMENTS);

  return (
    <>
      <Heading as="h1" mb="5" textAlign="center">
        {statement.title}
      </Heading>
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
