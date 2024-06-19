import {
  Flex,
  Box,
  Image,
  Text,
  Heading,
  Badge,
  Divider,
  Spinner,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import useNftMetadatas from '../hooks/useNftMetadatas';

const DetailNftPage = () => {
  const { tokenId } = useParams<{ tokenId: string }>();

  const { nftMetadata } = useNftMetadatas({
    tokenId: Number(tokenId),
  });

  if (!nftMetadata)
    return (
      <Flex
        w='100%'
        alignItems='center'
        justifyContent='center'
        background='linear-gradient(to bottom, #f1856a, #ce48c1)'
      >
        <Flex justifyContent='center' alignItems='center' height='50vh'>
          <Spinner size='xl' color='white' />
        </Flex>
      </Flex>
    );

  const { image, name, description, attributes } = nftMetadata;

  return (
    <Flex
      w='100%'
      flexDir='column'
      alignItems='center'
      background='linear-gradient(to bottom, #f1856a, #ce48c1)'
    >
      <Flex w='100%' maxW='1024px' flexDir='column' p={8}>
        <Text
          color='white'
          fontSize={[28, 28, 32]}
          fontWeight='bold'
          fontFamily='DNFBitBitTTF'
          textAlign='center'
          mb={4}
        >
          ⭐️ COO-COO NFT Details ⭐️
        </Text>
        <Flex justifyContent='center'>
          <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            bg='linear-gradient(to bottom, #9168ea, #e483db)'
            p={4}
            borderRadius='12px'
            w='100%'
            maxW='520px'
            border='3px, solid'
            borderColor='white'
            boxShadow='4px 4px 6px rgba(244, 238, 238, 0.7)'
          >
            <Heading
              fontSize={[20, 24, 28]}
              color='white'
              fontFamily='DNFBitBitTTF'
              mb={4}
            >
              {name}
            </Heading>
            <Image src={image} alt={name} w={280} borderRadius='50%' />
            <Divider my={6} />
            <Text
              fontSize={[12, 12, 16]}
              textColor='white'
              fontWeight={600}
              px={8}
              mb={8}
            >
              {description}
            </Text>

            <Flex flexWrap='wrap' justifyContent='center'>
              {attributes.map((attr, index) => (
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
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DetailNftPage;
