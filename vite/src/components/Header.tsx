import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { JsonRpcSigner } from 'ethers';
import { ethers } from 'ethers';
import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

const navLinks = [
  {
    id: 1,
    name: '세계관',
    path: '/worldview',
  },
  {
    id: 2,
    name: '마켓 페이지',
    path: '/nftmarket',
  },
  {
    id: 3,
    name: '내 페이지',
    path: '/mypage',
  },
];

interface IHeaderProps {
  signer: JsonRpcSigner | null;
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | null>>;
}

const Header = ({ signer, setSigner }: IHeaderProps) => {
  const navigate = useNavigate();

  const onClickConnectMetamask = async () => {
    try {
      if (!window.ethereum) return;

      const provider = new ethers.BrowserProvider(window.ethereum);

      console.log(await provider.getSigner());
      setSigner(await provider.getSigner());
    } catch (error) {
      console.error(error);
    }
  };

  const onClickLogOut = () => {
    setSigner(null);
  };

  return (
    <Flex
      h={16}
      p={8}
      justifyContent='space-between'
      alignItems='center'
      bgColor='green.100'
      border='2px solid'
      borderBottom='1px solid'
      borderColor='white'
      boxShadow='md'
    >
      <Flex
        w={40}
        fontSize={20}
        fontWeight='semibold'
        textAlign='center'
        onClick={() => navigate('/')}
        cursor='pointer'
        fontFamily='Cafe24Meongi'
      >
        COO-COO <br /> WORLD
      </Flex>
      <Flex display={['none', 'none', 'flex']} gap={8}>
        {navLinks.map((item, id) => (
          <Button
            key={id}
            color='black'
            colorScheme='gray'
            variant='ghost'
            fontWeight='semibold'
            fontSize={16}
            onClick={() => navigate(item.path)}
          >
            {item.name}
          </Button>
        ))}
      </Flex>
      <Flex display={['none', 'none', 'flex']} w={40} justifyContent='end'>
        {signer ? (
          <Menu>
            <MenuButton
              colorScheme='green'
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              {signer.address.substring(0, 7)}...
            </MenuButton>
            <MenuList>
              <MenuItem onClick={onClickLogOut}>로그아웃</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button colorScheme='green' onClick={onClickConnectMetamask}>
            지갑 연결하기
          </Button>
        )}
      </Flex>
      <Flex display={['flex', 'flex', 'none']}>
        <Menu>
          <MenuButton
            colorScheme='green'
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            {signer ? `${signer.address.substring(0, 7)}...` : 'menu'}
          </MenuButton>
          <MenuList>
            {!signer && (
              <MenuItem onClick={onClickConnectMetamask}>
                지갑 연결하기
              </MenuItem>
            )}
            {navLinks.map((item, id) => (
              <MenuItem key={id} onClick={() => navigate(item.path)}>
                {item.name}
              </MenuItem>
            ))}
            {signer && <MenuItem onClick={onClickLogOut}>로그아웃</MenuItem>}
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Header;
