import { Flex, Box, Image, Text, Heading, Badge } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import useNftMetadata from '../hooks/useNftMetadata';
import { useEffect } from 'react';

const DetailNftPage = () => {
  const { tokenId } = useParams<{ tokenId: string }>();

  const { nftMetadata, isLoading } = useNftMetadata({
    tokenId: Number(tokenId),
  });

  useEffect(() => {
    console.log(nftMetadata, isLoading);
  }, [nftMetadata, isLoading]);

  if (isLoading || !nftMetadata) return <Text>Loading...</Text>;

  const { image, name, description, attributes } = nftMetadata;

  return (
    <Flex
      flexDirection='column'
      alignItems='center'
      w='100%'
      background='linear-gradient(to bottom, #f1856a, #ce48c1)'
      py={8}
      px={20}
      justifyContent='center'
    >
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        bg='#9168ea'
        p={8}
        borderRadius='12px'
        w='100%'
        maxW='600px'
        border='2px, solid'
        boxShadow='4px 4px 6px rgba(0, 0, 0, 0.7)'
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
