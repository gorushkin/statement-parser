import { Tbody } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { useState } from 'react';
import { statement } from 'src/entities/statement';
import { ITable } from 'src/shared/Table';

import { MANDATORY_FIELD } from '../constants';
import { StatementPreviewHeader } from './StatementPreviewHeader';
import { StatementPreviewRow } from './StatementPreviewRow';

const mandatoryFields = Object.keys(MANDATORY_FIELD);

const initState = mandatoryFields.reduce(
  (acc, field) => ({ ...acc, [field]: '' }),
  {} as Record<MANDATORY_FIELD, string>
);

const StatementPreviewTable = observer(() => {
  const { headers, rows } = statement;

  const [mapping, setMapping] = useState<Record<MANDATORY_FIELD, string>>(initState);

  const handleChange = (name: string, value: string) => {
    setMapping((state) => ({ ...state, [name]: value }));
  };

  return (
    <ITable>
      <StatementPreviewHeader headers={headers} mapping={mapping} onChange={handleChange} />
      <Tbody>
        {rows.map((row, index) => (
          <StatementPreviewRow key={index} mapping={mapping} row={row} />
        ))}
      </Tbody>
    </ITable>
  );
});

export { StatementPreviewTable };
