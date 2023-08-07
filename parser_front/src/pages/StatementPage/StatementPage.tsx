import { Container } from '@chakra-ui/react';
import { Statement } from 'src/entities/statement';

import styles from './StatementPage.module.scss';

const StatementPage = () => (
  <Container className={styles.container} maxW={'100%'}>
    <Statement />
  </Container>
);

export { StatementPage };
