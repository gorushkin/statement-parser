import { RouteObject } from 'react-router-dom';
import { Statements } from 'src/pages/Statements';
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
  { element: <Statements />, isNav: true, name: 'Statements', path: '/statements' },
];
