import { observer } from 'mobx-react';
import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { statement } from 'src/entities/statement';
import { StatementPreviewHeader } from 'src/features/StatementPreviewHeader';
import { StatementPreviewTable } from 'src/features/StatementPreviewTable';
import { ROUTE } from 'src/shared/routes';

const StatementPreview = observer(() => {
  const { name, reset } = statement;
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!name) navigate(ROUTE.ALL);
  }, [name, navigate]);

  return (
    <>
      <StatementPreviewHeader name={name} onReset={reset} />
      <StatementPreviewTable />
    </>
  );
});

export { StatementPreview };
