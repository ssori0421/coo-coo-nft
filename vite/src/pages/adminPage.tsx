import {
  Button,
  Flex,
  Text,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import MintModal from '../components/MintModal';
import { IOutletContext } from '../components/Layout';
import { INftMetadata } from '../types/metadata';

const AdminPage = () => {
  const [nftMetadata, setNftMetadata] = useState<INftMetadata | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false); // State to control showing the modal

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
      setShowModal(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [signer, navigate]);

  const handleCloseModal = () => {
    setShowModal(false);
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
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        isCentered
        blockScrollOnMount
        closeOnOverlayClick={false}
      >
        <ModalContent display='flex' alignItems='center'>
          <ModalHeader>관리자만 접근할 수 있는 페이지입니다.</ModalHeader>
          <ModalBody>잠시 후 메인 페이지로 이동합니다...</ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default AdminPage;
