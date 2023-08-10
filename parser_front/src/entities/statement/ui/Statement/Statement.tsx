import { observer } from 'mobx-react';
import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from 'src/shared/routes';

import { statement } from '../..';

const Statement = observer(() => {
  const { name } = statement;
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!name) navigate(ROUTE.ALL);
  }, [name, navigate]);

  return <>{/* <StatementTable headers={headers} rows={rows} /> */}</>;
});

export { Statement };
