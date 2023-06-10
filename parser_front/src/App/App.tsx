import { AppContextProvider } from '../context/AppContext';
import { StartPage } from '../pages/StartPage';
import { StatementProvider } from '../pages/Statement';
import style from './App.module.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from '../pages/ErrorPage';
import { APP_ROUTES } from '../routes';

const router = createBrowserRouter([
  {
    path: APP_ROUTES.ROOT,
    element: <StartPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: APP_ROUTES.STATEMENTS,
    element: <StatementProvider />,
    errorElement: <ErrorPage />,
  },
]);

export default function App() {
  return (
    <AppContextProvider>
      <div className={style.container}>
        <RouterProvider router={router} />
      </div>
    </AppContextProvider>
  );
}
