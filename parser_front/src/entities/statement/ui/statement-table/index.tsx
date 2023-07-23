import { Table, TableContainer, Tbody } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { statementApi } from 'src/shared/api';
import { ROUTE } from 'src/shared/routes';
import { useFetch } from 'src/shared/useFetch';

import { statement } from '../../model';
import { StatementRow } from '../statement-row';

export const StatementTable = observer(() => {
  const [, fetchData] = useFetch(statementApi.getStatementRequest, {
    init: { transactions: [] },
    onSuccess: (res) => (statement.transactions = res.data.transactions),
  });

  const { statementId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (statementId) void fetchData({ name: statementId });
  }, [fetchData, statementId]);

  if (!statementId) navigate(ROUTE.STATEMENTS);

  return (
    <TableContainer>
      <Table>
        <Tbody>
          {statement.transactions.map((row) => (
            <StatementRow key={row.id} row={row} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
});
