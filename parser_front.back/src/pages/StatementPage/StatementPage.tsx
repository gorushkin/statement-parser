import { Container } from '@chakra-ui/react';
import { StatementTable } from 'src/entities/statement';
import { StatementControlButtons } from 'src/features/StatementControlButtons';

import styles from './StatementPage.module.scss';

const StatementPage = () => (
  <Container className={styles.container} maxW={'100%'}>
    <StatementControlButtons />
    <StatementTable />
  </Container>
);

export { StatementPage };
