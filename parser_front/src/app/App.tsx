import { Box, Container } from '@chakra-ui/react';
import { FC } from 'react';
import { UploadFilePage } from 'src/pages/UploadFilePage';

import style from './App.module.scss';

const App: FC = () => {
  return (
    <Box as="main" className={style.layout} minH={'100vh'} p="4">
      <Container className={style.content} maxW="container.lg">
        <UploadFilePage />
      </Container>
    </Box>
  );
};

export default App;
