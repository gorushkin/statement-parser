import { Thead, Tr } from '@chakra-ui/react';
import { FC } from 'react';

import { MANDATORY_FIELD } from '../../constants';
import { StatementPreviewHeaderCell } from '../StatementPreviewHeaderCell';

interface StatementPreviewHeaderProps {
  headers: string[];
  mapping: Record<MANDATORY_FIELD, string>;
  onChange: (name: string, value: string) => void;
}

const StatementPreviewHeader: FC<StatementPreviewHeaderProps> = ({ headers, mapping, onChange }) => {
  return (
    <Thead>
      <Tr>
        {Object.keys(mapping).map((item, i) => (
          <StatementPreviewHeaderCell headers={headers} key={i} name={item as MANDATORY_FIELD} onChange={onChange} />
        ))}
      </Tr>
    </Thead>
  );
};

export { StatementPreviewHeader };
