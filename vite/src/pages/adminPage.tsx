import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { IOutletContext } from '../components/Layout';
import MintModal from '../components/MintModal';

interface INftMetadata {
  image: string;
  name: string;
  description: string;
  attributes?: Array<{
    trait_type: string;
    value: string;
  }>;
}

const AdminPage = () => {
  const [nftMetadata, setNftMetadata] = useState<INftMetadata | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { mintContract, signer } = useOutletContext<IOutletContext>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClickMint = async () => {
    console.log('onClickMint');
    try {
      setIsLoading(true);

      const response = await mintContract?.mintNft();
      await response.wait();

      const totalSupply = await mintContract?.totalSupply();

      const tokenURI = await mintContract?.tokenURI(totalSupply);

      const { data } = await axios.get<NftMetadata>(tokenURI);
      setNftMetadata(data);

      onOpen();

      setIsLoading(false);
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  };

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
          loadingText='민팅중..'
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
