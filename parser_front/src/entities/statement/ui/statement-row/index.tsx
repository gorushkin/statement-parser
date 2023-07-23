import { Td, Tr } from '@chakra-ui/react';
import { FC } from 'react';
import { Transaction } from 'src/shared/api';

type StatementRowProps = {
  row: Transaction;
};

export const StatementRow: FC<StatementRowProps> = ({ row }) => {
  const {
    amount,
    balance,
    convertedAmount,
    data,
    description,
    id,
    isClear,
    memo,
    payeeId,
    payeeName,
    processDate,
    rate,
    transactionDate,
  } = row;
  return (
    <Tr>
      <Td>{processDate}</Td>
      <Td>{amount}</Td>
      <Td>{description}</Td>
      <Td>{payeeName}</Td>
    </Tr>
  );
};
