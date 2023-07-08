import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../../hooks/useFetch';
import { getStatementUrl } from '../../../routes';
import { getStatements } from '../../../services/api';
import { Filenames } from '../../../types';
import styles from './Files.module.scss';

export const Files = ({
  shouldUpdate,
  setShouldUpdate,
}: {
  shouldUpdate: boolean;
  setShouldUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [{ isLoading, data }, getFilesHandler] = useFetch(getStatements);

  const filenames = data as Filenames;

  useEffect(() => {
    getFilesHandler();
  }, []);

  useEffect(() => {
    if (!shouldUpdate) return;
    getFilesHandler();
    setShouldUpdate(false);
  }, [shouldUpdate]);

  if (isLoading) return <h1>Loading....</h1>;

  if (!data) return <h1>There is no files</h1>;

  return (
    <ul className={styles.list}>
      {filenames.map((filename) => {
        return (
          <li className={styles.item} key={filename}>
            <Link to={getStatementUrl(filename)}>{filename}</Link>
          </li>
        );
      })}
    </ul>
  );
};
