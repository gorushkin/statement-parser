import { RouteObject } from 'react-router-dom';
import { StatementsPage } from 'src/pages/StatementsPage';
import { UploadFilePage } from 'src/pages/UploadFilePage';

type ROUTE = RouteObject & {
  isNav: boolean;
  name: string;
  path: string;
};

export const routes: ROUTE[] = [
  { element: <UploadFilePage />, isNav: true, name: 'Upload File', path: '/upload' },
  { element: <UploadFilePage />, isNav: false, name: 'Upload File', path: '/' },
  { element: <UploadFilePage />, isNav: false, name: 'Upload File', path: '*' },
  { element: <StatementsPage />, isNav: true, name: 'Statements', path: '/statements' },
];
