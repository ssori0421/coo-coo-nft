import { Flex, Box, Image, Text, Heading, Badge } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import useNftMetadatas from '../hooks/useNftMetadatas';
import { useEffect } from 'react';

const DetailNftPage = () => {
  const { tokenId } = useParams<{ tokenId: string }>();

  const { nftMetadata, isLoading } = useNftMetadatas({
    tokenId: Number(tokenId),
  });

  useEffect(() => {
    console.log(nftMetadata, isLoading);
  }, [nftMetadata, isLoading]);

  if (isLoading || !nftMetadata) {
    return (
      <Flex
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        w='100%'
        minH='100vh'
        background='linear-gradient(to bottom, #f1856a, #ce48c1)'
      >
        <Text>Loading...</Text>
      </Flex>
    );
  }

  const { image, name, description, attributes } = nftMetadata;

  return (
    <Flex
      flexDirection='column'
      alignItems='center'
      w='100%'
      background='linear-gradient(to bottom, #f1856a, #ce48c1)'
      px={20}
      justifyContent='center'
    >
      <Text
        color='white'
        fontSize={[24, 32, 36]}
        fontWeight='bold'
        fontFamily='DNFBitBitTTF'
        mb={8}
      >
        NFT의 상세 정보를 확인해 보세요 !
      </Text>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        bg='linear-gradient(to bottom, #9168ea, #e483db)'
        p={8}
        borderRadius='12px'
        w='100%'
        maxW='600px'
        border='3px, solid'
        borderColor='white'
        boxShadow='4px 4px 6px rgba(244, 238, 238, 0.7)'
      >
        <Heading fontSize={36} color='white' fontFamily='DNFBitBitTTF' mb={4}>
          {name}
        </Heading>
        <Image src={image} alt={name} mb={8} w={400} borderRadius={12} />

        <Text fontSize='lg' mb={8} textColor='white'>
          {description}
        </Text>
        <Flex flexWrap='wrap' justifyContent='center' mb={4}>
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
  );
};

export default DetailNftPage;
