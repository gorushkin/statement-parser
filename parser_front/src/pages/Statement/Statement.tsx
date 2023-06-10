import { Table } from './Table';
import { Menu } from '../../Menu';
import style from './Statement.module.scss';

import {
  StatementContextProvider,
  useStatementContext,
} from '../../context/StatementContext';
import { Summary } from './Summary/Summary';

const Statement = () => {
  const { error, isLoading } = useStatementContext();

  if (isLoading) return <h1>Loading....</h1>;

  return (
    <div className={style.wrapper}>
      {error ? (
        <h1>There is an error</h1>
      ) : (
        <>
          <div className={style.menuWrapper}>
            <Menu />
          </div>
          <div className={style.summary}>
            <Summary/>
          </div>
          <Table />
        </>
      )}
    </div>
  );
};

export const StatementProvider = () => (
  <StatementContextProvider>
    <Statement />
  </StatementContextProvider>
);
