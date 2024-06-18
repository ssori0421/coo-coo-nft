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
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Contract } from 'ethers';
import {
  mintContractAddress,
  saleContractAddress,
} from '../lib/contractAddress';
import mintContractAbi from '../lib/mintContractAbi.json';
import saleContractAbi from '../lib/saleContractAbi.json';

const navLinks = [
  {
    id: 1,
    name: '세계관',
    path: '/worldview',
  },
  {
    id: 2,
    name: '쿠쿠 동산',
    path: '/coocooGarden',
  },
  {
    id: 3,
    name: '마이 쿠쿠',
    path: '/myCoocoo',
  },
];

interface IHeaderProps {
  signer: JsonRpcSigner | null;
  setSigner: Dispatch<SetStateAction<JsonRpcSigner | null>>;
  setMintContract: Dispatch<SetStateAction<Contract | null>>;
  setSaleContract: Dispatch<SetStateAction<Contract | null>>;
}

const Header = ({
  signer,
  setSigner,
  setMintContract,
  setSaleContract,
}: IHeaderProps) => {
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

  useEffect(() => {
    if (!signer) {
      setMintContract(null);

      return;
    }

    setMintContract(new Contract(mintContractAddress, mintContractAbi, signer));
    setSaleContract(new Contract(saleContractAddress, saleContractAbi, signer));
  }, [signer]);

  return (
    <Flex
      h={16}
      p={8}
      justifyContent='space-between'
      alignItems='center'
      borderBottom='2px solid'
      borderColor='white'
      boxShadow='md'
      bgColor='#ff7e5f'
    >
      <Flex
        w={40}
        fontSize={20}
        fontWeight='semibold'
        textAlign='center'
        onClick={() => navigate('/')}
        cursor='pointer'
        fontFamily='DNFBitBitTTF'
      >
        COO-COO <br /> WORLD
      </Flex>
      <Flex display={['none', 'none', 'flex']} gap={8}>
        {navLinks.map((item) => (
          <Button
            key={item.id}
            colorScheme='gray'
            variant='ghost'
            fontWeight='semibold'
            fontSize={20}
            onClick={() => navigate(item.path)}
            textColor='white'
            fontFamily='DNFBitBitTTF'
          >
            {item.name}
          </Button>
        ))}
      </Flex>
      <Flex display={['none', 'none', 'flex']} w={40} justifyContent='end'>
        {signer ? (
          <Menu>
            <MenuButton
              as={Button}
              color='white'
              variant='outline'
              rightIcon={<ChevronDownIcon />}
            >
              {signer.address.substring(0, 7)}...
            </MenuButton>
            <MenuList>
              <MenuItem onClick={onClickLogOut}>로그아웃</MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <Button
            color='white'
            variant='outline'
            onClick={onClickConnectMetamask}
          >
            지갑 연결하기
          </Button>
        )}
      </Flex>
      <Flex display={['flex', 'flex', 'none']}>
        <Menu>
          <MenuButton
            as={Button}
            color='white'
            variant='outline'
            rightIcon={<ChevronDownIcon />}
          >
            {signer ? `${signer.address.substring(0, 7)}...` : 'menu'}
          </MenuButton>
          <MenuList border='1px, solid' borderColor='white'>
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
