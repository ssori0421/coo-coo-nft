import {
  Badge,
  Divider,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

interface IMintModalProps {
  isOpen: boolean;
  onClose: () => void;
  nftMetadata: NftMetadata | null;
}

const MintModal = ({ isOpen, onClose, nftMetadata }: IMintModalProps) => {
  const { image, name, attributes, description } = nftMetadata || {};

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Text
          mt={4}
          fontSize={[16, 20, 24]}
          fontWeight='semibold'
          textAlign='center'
          color='black'
          fontFamily='DNFBitBitTTF'
        >
          {name}
        </Text>
        <ModalCloseButton />
        <ModalBody
          display='flex'
          flexDir='column'
          justifyContent='center'
          alignItems='center'
        >
          <Image src={image} borderRadius='50%' w={240} />
          <Divider my={6} />
          <Text fontFamily='DNFBitBitTTF' fontSize={[12, 12, 16]} color='black'>
            {description}
          </Text>
          <Flex flexWrap='wrap' justifyContent='center' my={6}>
            {attributes?.map((attr, index) => (
              <Badge
                key={index}
                borderRadius='full'
                px={2}
                py={1}
                m={1}
                colorScheme='purple'
              >
                <Text fontSize='sm'>
                  {attr.trait_type}: {attr.value}
                </Text>
              </Badge>
            ))}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MintModal;
