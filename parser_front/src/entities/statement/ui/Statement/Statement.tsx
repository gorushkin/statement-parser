import { Heading, Table, TableContainer, Tbody } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { FC, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from 'src/shared/routes';

import { statement } from '../..';
import { StatementColumnsMapper } from '../StatementColumnsMapper';
import { StatementTable } from '../StatementTable';
import styles from './Statement.module.scss';

interface StatementProps {}

const Statement: FC<StatementProps> = observer(() => {
  const { headers, name, rows } = statement;
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!name) navigate(ROUTE.ALL);
  });
  return (
    <>
      <Heading as="h1" mb="5" textAlign="center">
        {name}
      </Heading>
      <StatementColumnsMapper />
      <StatementTable headers={headers} rows={rows} />
    </>
  );
});

export { Statement };
