import { Button, Table, TableCaption, TableContainer, Tbody, Td, Tr } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { statementList } from 'src/entities/statementList';
import { ROUTE } from 'src/shared/routes';

import styles from './StatementsList.module.scss';

const StatementsList: FC = observer(() => {
  useEffect(() => {
    statementList.getStatements();
  }, []);

  const handleDeleteClick = (id: string) => {
    statementList.deleteStatement(id);
  };

  return (
    <TableContainer className={styles.wrapper}>
      <Table className={styles.table} colorScheme="blue" variant="simple">
        <TableCaption>Statements</TableCaption>
        <Tbody>
          {statementList.statements?.map(({ id, name }) => (
            <Tr key={id}>
              <Td>
                <Link to={`${ROUTE.STATEMENTS}/${id}`}>{name}</Link>
              </Td>
              <Td className={styles.buttonCell}>
                <Button colorScheme="green" size="xs">
                  Rename
                </Button>
              </Td>
              <Td className={styles.buttonCell}>
                <Button colorScheme="red" onClick={() => handleDeleteClick(id)} size="xs">
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
});

export { StatementsList };
