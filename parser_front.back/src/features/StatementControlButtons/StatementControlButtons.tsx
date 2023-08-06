import { Box, Button } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { statement } from 'src/entities/statement/';

import styles from './StatementControlButtons.module.scss';

const StatementControlButtons = observer(() => {
  const onExportClickHandle = () => {
    const { file, name } = statement.getCSV();
    const blob = new Blob([file], { type: 'text/csv' });
    const a = document.createElement('a');
    a.download = `${name}.csv`;
    a.href = URL.createObjectURL(blob);
    a.addEventListener('click', () => {
      setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
    });
    a.click();
  };

  return (
    <Box className={styles.buttonContainer}>
      <Button background={'green.400'} onClick={onExportClickHandle} size={'lg'} variant={'outline'}>
        Export
      </Button>
    </Box>
  );
});

export { StatementControlButtons };
