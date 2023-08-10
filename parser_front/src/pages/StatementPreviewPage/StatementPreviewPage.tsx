import { Container } from '@chakra-ui/react';
import { StatementPreview } from 'src/widgets/StatementPreview';

import styles from './StatementPreviewPage.module.scss';

const StatementPreviewPage = () => (
  <Container className={styles.container} maxW={'100%'}>
    <StatementPreview />
  </Container>
);

export { StatementPreviewPage };
