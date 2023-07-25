import { Container } from '@chakra-ui/react';
import { StatementTable } from 'src/entities/statement';

import styles from './StatementPage.module.scss';

const StatementPage = () => (
  <Container className={styles.container} maxW={'100%'}>
    <StatementTable />
  </Container>
);

export { StatementPage };
