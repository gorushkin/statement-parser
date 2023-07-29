import { Td, Tr } from '@chakra-ui/react';
import { FC } from 'react';
import { Transaction } from 'src/shared/api';

import { columnFormatMapping } from './lib';
import styles from './StatementRow.module.scss';

type StatementRowProps = {
  row: Transaction;
};

export const StatementRow: FC<StatementRowProps> = ({ row }) => {
  const {
    amount,
    balance,
    convertedAmount,
    convertedBalance,
    description,
    memo,
    payeeName,
    processDate,
    transactionDate,
  } = row;

  return (
    <Tr className={styles.tableRow}>
      <Td>{columnFormatMapping.date(processDate)}</Td>
      <Td>{columnFormatMapping.date(transactionDate)}</Td>
      <Td>{columnFormatMapping.amount(amount)}</Td>
      <Td>{columnFormatMapping.amount(convertedAmount)}</Td>
      <Td>{columnFormatMapping.amount(balance)}</Td>
      <Td>{columnFormatMapping.amount(convertedBalance)}</Td>
      <Td>{description}</Td>
      <Td>{payeeName}</Td>
      <Td>{memo}</Td>
    </Tr>
  );
};
