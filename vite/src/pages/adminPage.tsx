import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import MintModal from '../components/MintModal';
import { IOutletContext } from '../components/Layout';
import { INftMetadata } from '../types/metadata';

const AdminPage = () => {
  const [nftMetadata, setNftMetadata] = useState<INftMetadata | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUnauthorized, setIsUnauthorized] = useState<boolean>(false); // State to control unauthorized access

  const { mintContract, signer } = useOutletContext<IOutletContext>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const onClickMint = async () => {
    try {
      setIsLoading(true);

      const response = await mintContract?.mintNft();
      await response.wait();

      const totalSupply = await mintContract?.totalSupply();
      const tokenURI = await mintContract?.tokenURI(totalSupply);

      const { data } = await axios.get<INftMetadata>(tokenURI);
      setNftMetadata(data);

      onOpen();

      setIsLoading(false);
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      !signer ||
      signer.address !== '0xfBa9972055C1FC1bE7cB2e2e783328725b04ede2'
    ) {
      setIsUnauthorized(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [signer, navigate]);

  if (isUnauthorized) {
    return (
      <Flex
        w='100%'
        flexDir='column'
        justifyContent='center'
        alignItems='center'
        background='linear-gradient(to bottom, #f1856a, #ce48c1)'
      >
        <Text
          color='white'
          fontSize={[28, 28, 32]}
          fontWeight='bold'
          fontFamily='DNFBitBitTTF'
          textAlign='center'
          mb={2}
        >
          🚫 접근 금지 🚫
        </Text>
        <Text
          color='white'
          fontSize={[20, 20, 24]}
          fontFamily='DNFBitBitTTF'
          textAlign='center'
        >
          이 페이지는 관리자만 접근할 수 있습니다.
        </Text>
        <Text
          color='white'
          fontSize={[16, 16, 18]}
          fontFamily='DNFBitBitTTF'
          textAlign='center'
          mt={4}
        >
          잠시 후 메인 페이지로 이동합니다..
        </Text>
      </Flex>
    );
  }

  return (
    <Flex
      w='100%'
      flexDir='column'
      alignItems='center'
      background='linear-gradient(to bottom, #f1856a, #ce48c1)'
      position='relative'
    >
      <Flex
        w='100%'
        maxW='1024px'
        flexDir='column'
        justifyContent='center'
        alignItems='center'
        p={8}
      >
        <Text
          color='white'
          fontSize={[28, 28, 32]}
          fontWeight='bold'
          fontFamily='DNFBitBitTTF'
          textAlign='center'
          mb={2}
        >
          🚫 ADMIN 🚫
        </Text>
        <Button
          position='absolute'
          top='50%'
          left='50%'
          transform='translate(-50%, -50%)'
          w='30%'
          onClick={onClickMint}
          isDisabled={!signer}
          isLoading={isLoading}
          loadingText='민팅중'
        >
          민팅하기
        </Button>

        <MintModal
          isOpen={isOpen}
          onClose={onClose}
          nftMetadata={nftMetadata}
        />
      </Flex>
    </Flex>
  );
};

export default AdminPage;
