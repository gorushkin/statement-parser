import { Box, Container } from '@chakra-ui/react';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from 'src/widgets/Navbar';
import { Alert } from 'src/widgets/Notifications';

import style from './App.module.scss';
import { routes } from './routes';

const App: FC = () => (
  <Box as="main" className={style.layout} minH={'100vh'}>
    <Navbar />
    <Container className={style.content} maxW="container.lg" p="4">
      <Alert classNames={style.alert} />
      <Routes>
        {routes.map((route) => (
          <Route element={route.element} key={route.path} path={route.path} />
        ))}
      </Routes>
    </Container>
  </Box>
);

export default App;
