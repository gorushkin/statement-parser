import { Box, Link } from '@chakra-ui/react';
import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { routes } from 'src/shared/routes';

import styles from './Navbar.module.scss';

const Navbar: FC = () => (
  <Box as="nav" className={styles.navbarContainer}>
    <Box className={styles.navbarInner}>
      {routes
        .filter(({ isNav }) => isNav)
        .map((item) => (
          <Link as={RouterLink} className={styles.link} fontWeight={500} key={item.path} to={item.path}>
            {item.name}
          </Link>
        ))}
    </Box>
  </Box>
);

export { Navbar };
