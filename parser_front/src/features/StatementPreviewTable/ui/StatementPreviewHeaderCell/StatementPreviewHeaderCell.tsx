import { Box, Select, Th } from '@chakra-ui/react';
import { FC } from 'react';

import { MANDATORY_FIELD } from '../../constants';

interface StatementPreviewHeaderCellProps {
  headers: string[];
  name: MANDATORY_FIELD;
  onChange: (name: string, value: string) => void;
}

const StatementPreviewHeaderCell: FC<StatementPreviewHeaderCellProps> = ({ headers, name, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => onChange(name, e.target.value);

  return (
    <Th>
      <Box>{name}</Box>
      <Box>
        <Select name={name} onChange={handleChange}>
          {['', ...headers].map((header, i) => (
            <option key={i} value={header}>
              {header}
            </option>
          ))}
        </Select>
      </Box>
    </Th>
  );
};

export { StatementPreviewHeaderCell };
