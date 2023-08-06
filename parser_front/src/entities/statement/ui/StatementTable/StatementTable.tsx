import { Heading, Table, TableContainer, Tbody } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { FC, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from 'src/shared/routes';

import { statement } from '../..';
import { StatementRow } from '../../StatementRow';
import { StatementHead } from '../StatementHead';
import styles from './StatementTable.module.scss';

const StatementTable: FC = observer(() => {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!statement.name) navigate(ROUTE.ALL);
  });

  return (
    <>
      <Heading as="h1" mb="5" textAlign="center">
        {statement.name}
      </Heading>
      <TableContainer className={styles.tableContainer}>
        <Table className={styles.table} variant="simple">
          <StatementHead headers={statement.headers} />
          <Tbody>
            {statement.rows.map((row, index) => (
              <StatementRow key={index} row={row} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
});

export { StatementTable };
