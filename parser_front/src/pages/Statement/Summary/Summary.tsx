import { useStatementContext } from '../../../context/StatementContext';
import { Summary as TypeSummary } from '../../../types';
import style from './Summary.module.scss';

type Column = 'left' | 'right';

const summaryFields = [
  {
    key: 'startBalance',
    label: 'startBalance',
  },
  {
    key: 'endBalance',
    label: 'endBalance',
  },
  {
    key: 'income',
    label: 'income',
  },
  {
    key: 'outcome',
    label: 'outcome',
  },
];

const SummaryColumn = ({
  type,
  summary,
}: {
  type: Column;
  summary: TypeSummary;
}) => (
  <table className={style.table}>
    {summaryFields.map((item) => {
      return (
        <tr key={item.key}>
          <td className={style.label}>{item.label}</td>
          <td className={style.value}>
            {summary[item.key as keyof TypeSummary]}
          </td>
        </tr>
      );
    })}
  </table>
);

export const Summary = () => {
  const { statement } = useStatementContext();

  return (
    <div className={style.summary}>
      <SummaryColumn summary={statement.summary.defaultSummary} type="left" />
      <SummaryColumn
        summary={statement.summary.convertedSummary}
        type="right"
      />
    </div>
  );
};
