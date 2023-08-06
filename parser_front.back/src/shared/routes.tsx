import { Navigate, RouteObject } from 'react-router-dom';
import { StatementPage } from 'src/pages/StatementPage';
import { StatementsPage } from 'src/pages/StatementsPage';
import { UploadFilePage } from 'src/pages/UploadFilePage';

export enum ROUTE {
  ALL = '*',
  ROOT = '/',
  STATEMENTS = '/statements',
  UPLOAD_FILE = '/upload',
}

type RouteType = RouteObject & {
  isNav: boolean;
  name: string;
  path: ROUTE | string;
};

export const routes: RouteType[] = [
  { element: <UploadFilePage />, isNav: true, name: 'Upload File', path: ROUTE.UPLOAD_FILE },
  { element: <UploadFilePage />, isNav: false, name: 'Upload File', path: ROUTE.ROOT },
  { element: <StatementPage />, isNav: false, name: 'Statements', path: `${ROUTE.STATEMENTS}/:statementId` },
  { element: <StatementsPage />, isNav: true, name: 'Statements', path: ROUTE.STATEMENTS },
  // { element: <Navigate replace to="/statements" />, isNav: false, name: 'Statements', path: '/statement' },
  { element: <Navigate replace to="/" />, isNav: false, name: 'Upload File', path: ROUTE.ALL },
];
