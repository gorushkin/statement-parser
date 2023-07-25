import { Button, Table, TableCaption, TableContainer, Tbody, Td, Tr } from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTE } from 'src/shared/routes';
import { useFetch } from 'src/shared/useFetch';
import { useNotify } from 'src/shared/useNotify';

import { getStatementsRequest } from '../api';
import styles from './StatementsList.module.scss';

const StatementsList: FC = () => {
  const { addErrorMessage } = useNotify();

  const [{ data }, fetchData] = useFetch(getStatementsRequest, {
    init: [],
    onError: addErrorMessage,
  });

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return (
    <TableContainer className={styles.wrapper}>
      <Table className={styles.table} colorScheme="blue" variant="simple">
        <TableCaption>Statements</TableCaption>
        <Tbody>
          {data?.map((name) => (
            <Tr key={name}>
              <Td>
                <Link to={`${ROUTE.STATEMENTS}/${name}`}>{name}</Link>
              </Td>
              <Td className={styles.buttonCell}>
                <Button colorScheme="green" size="xs">
                  Rename
                </Button>
              </Td>
              <Td className={styles.buttonCell}>
                <Button colorScheme="red" size="xs">
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export { StatementsList };
