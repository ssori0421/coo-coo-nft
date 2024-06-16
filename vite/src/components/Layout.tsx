import { Flex } from '@chakra-ui/react';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const Layout: FC = () => {
  return (
    <Flex>
      Layout
      <Outlet />
    </Flex>
  );
};

export default Layout;
