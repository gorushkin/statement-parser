import style from './Table.module.scss';
import { useEffect, useState } from 'react';
import { RowMode, Transaction } from '../../../types';
import { columns } from '../../../utils/constants';
import { cn, convertValue, propertyTypesMapping } from '../../../utils/utils';
import { useStatementContext } from '../../../context/StatementContext';

const DataColumn = ({ transaction }: { transaction: Transaction }) => (
  <td
    colSpan={9}
    onClick={() => navigator.clipboard.writeText(transaction.data)}
  >
    {transaction.data}
  </td>
);

const AllColumns = ({ transaction }: { transaction: Transaction }) => {
  return columns
    .filter((item) => item.isVisible)
    .map((column, i) => {
      const type = propertyTypesMapping[column.value];
      const value = transaction[column.value];
      try {
        const { copyValue, displayValue } = convertValue(value, type);
        return (
          <td onClick={() => navigator.clipboard.writeText(copyValue)} key={i}>
            {displayValue}
          </td>
        );
      } catch (error) {
        console.log('type: ', type);
        console.log(column);
        return null;
      }
    });
};

const mapping: Record<
  RowMode,
  ({ transaction }: { transaction: Transaction }) => JSX.Element[] | JSX.Element
> = {
  allColumns: AllColumns,
  dataColumn: DataColumn,
};

const TableHeader = () => (
  <thead>
    <tr>
      {columns
        .filter((item) => item.isCaption)
        .map(({ label }) => (
          <th key={label}>{label}</th>
        ))}
    </tr>
  </thead>
);

const TableRow = ({
  transaction,
  onRowClick,
  isActive,
}: {
  isActive: boolean;
  transaction: Transaction;
  onRowClick: Function;
}) => {
  const { updateTransaction, tableState } = useStatementContext();

  const [rowMode, setRowMode] = useState<RowMode>('allColumns');

  useEffect(() => {
    setRowMode('allColumns');
  }, [tableState]);

  const handleModeClick = (
    event: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>
  ) => {
    event.stopPropagation();

    setRowMode((mode) => (mode === 'allColumns' ? 'dataColumn' : 'allColumns'));
  };

  const handleChange = (
    event: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>
  ) => {
    event.stopPropagation();
    const updatedTransaction: Transaction = {
      ...transaction,
      isClear: !transaction.isClear,
    };
    updateTransaction(transaction.id, updatedTransaction);
  };

  const hadleSelectClick = () => onRowClick();

  return (
    <tr
      className={cn(style.row, isActive && style.rowActive)}
      onClick={hadleSelectClick}
    >
      {mapping[rowMode]({ transaction })}
      <td onClick={handleModeClick}>Show</td>
      <td
        className={cn(
          style.checkbox,
          transaction.isClear && style.checkboxIsClear
        )}
        onClick={handleChange}
      />
    </tr>
  );
};

const TableBody = () => {
  const { statement } = useStatementContext();
  const [activeRow, setActiveRow] = useState<number | null>(null);

  const handleRowClick = (i: number) => {
    setActiveRow(i);
  };

  return (
    <tbody>
      {statement.transactions.map((transaction, i) => (
        <TableRow
          onRowClick={() => handleRowClick(i)}
          isActive={i === activeRow}
          key={transaction.id}
          transaction={transaction}
        />
      ))}
    </tbody>
  );
};

export const Table = () => (
  <table className={style.table}>
    <TableHeader />
    <TableBody />
  </table>
);
