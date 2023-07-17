import { Box, Link } from '@chakra-ui/react';
import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { routes } from 'src/app/routes';

import styles from './Navbar.module.scss';

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => (
  <Box as="nav" className={styles.navbarContainer}>
    <Box className={styles.navbarInner}>
      {routes
        .filter(({ isNav }) => isNav)
        .map((item) => (
          <RouterLink key={item.path} to={item.path}>
            <Link className={styles.link} fontWeight={500}>
              {item.name}
            </Link>
          </RouterLink>
        ))}
    </Box>
  </Box>
);

export { Navbar };
