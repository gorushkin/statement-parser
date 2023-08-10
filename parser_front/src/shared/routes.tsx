import { Navigate, RouteObject } from 'react-router-dom';
import { StatementPreviewPage } from 'src/pages/StatementPreviewPage';
import { StatementsPage } from 'src/pages/StatementsPage';
import { UploadFilePage } from 'src/pages/UploadFilePage';

export enum ROUTE {
  ALL = '*',
  ROOT = '/',
  STATEMENT = '/statement',
  STATEMENT_PREVIEW = '/statement_preview',
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
  { element: <StatementPreviewPage />, isNav: false, name: 'Statements', path: `${ROUTE.STATEMENTS}/:statementId` },
  { element: <StatementPreviewPage />, isNav: true, name: 'Preview Statement', path: ROUTE.STATEMENT_PREVIEW },
  { element: <StatementsPage />, isNav: true, name: 'Statements', path: ROUTE.STATEMENTS },
  { element: <Navigate replace to="/" />, isNav: false, name: 'Upload File', path: ROUTE.ALL },
];
