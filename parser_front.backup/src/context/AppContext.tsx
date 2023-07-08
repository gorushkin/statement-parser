import {
  createContext,
  ReactElement,
  useState,
  useMemo,
  useContext,
} from 'react';
import { Context, FileInfo, Page } from '../types';

const AppContext = createContext<Context | null>(null);

const AppContextProvider = ({ children }: { children: ReactElement }) => {
  const [fileInfo, setFileInfo] = useState<FileInfo>({
    name: null,
    size: null,
    content: null,
  });
  const [page, setPage] = useState<Page>('first');

  const context = useMemo(
    () => ({
      fileInfo,
      setFileInfo,
      page,
      setPage,
    }),
    [fileInfo, page, setPage]
  );

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

const useExportContext = () => {
  const context = useContext(AppContext);

  if (!context) throw new Error('Something wrong wih your context');

  return context;
};

export { AppContextProvider, useExportContext };
