import { Td, Tr } from '@chakra-ui/react';
import { FC } from 'react';
import { Transaction } from 'src/entities/statement/model/types';
import { MANDATORY_FIELD } from 'src/features/StatementPreviewTable/constants';

interface StatementPreviewRowProps {
  mapping: Record<MANDATORY_FIELD, string>;
  row: Transaction;
}

const StatementPreviewRow: FC<StatementPreviewRowProps> = (props) => {
  const { mapping, row } = props;

  return (
    <Tr>
      {Object.values(mapping).map((value, index) => {
        return <Td key={index}>{row[value]}</Td>;
      })}
    </Tr>
  );
};

export { StatementPreviewRow };
