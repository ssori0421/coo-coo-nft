import { Flex, Text, Image, Box, Divider } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import worldViewData from '../lib/worldView';

const DetailWorldViewPage = () => {
  const { id } = useParams<{ id: string }>();

  const data = worldViewData.find((item) => item.id === Number(id));

  if (!data) {
    return null;
  }

  const { title, src, contentTitle1, content1, contentTitle2, content2 } = data;

  return (
    <Flex
      flexDirection='column'
      alignItems='center'
      py={8}
      px={32}
      w='100%'
      background='linear-gradient(to bottom, #f1856a, #ce48c1)'
    >
      <Text
        color='white'
        fontSize={[28, 32, 36]}
        fontWeight='bold'
        fontFamily='DNFBitBitTTF'
        mb={4}
      >
        {title}
      </Text>
      <Box position='relative'>
        <Image
          src={src}
          borderRadius={24}
          w={800}
          h={400}
          objectFit='cover'
          boxShadow='4px 4px 6px rgba(240, 232, 232, 0.7)'
          mb={4}
          border='5px solid'
          borderColor='pink'
        />
        <Box
          position='absolute'
          top={0}
          left={0}
          right={0}
          bottom={4}
          bg='rgba(255, 255, 255, 0.2)'
          borderRadius={24}
        />
      </Box>
      <Flex mt={8} flexDir='column'>
        <Flex flexDir='column' gap={8}>
          <Text
            color='white'
            fontSize={[24, 24, 28]}
            fontWeight={600}
            fontFamily='DNFBitBitTTF'
            textAlign='center'
            px={8}
          >
            {contentTitle1}
          </Text>
          <Text
            color='white'
            fontSize={[16, 18, 20]}
            fontWeight={600}
            textAlign='center'
            px={8}
          >
            {content1}
          </Text>
          <Divider />
        </Flex>
        <Flex flexDir='column' gap={8} mt={8}>
          <Text
            color='white'
            fontSize={[24, 24, 28]}
            fontWeight={600}
            fontFamily='DNFBitBitTTF'
            textAlign='center'
            px={8}
          >
            {contentTitle2}
          </Text>
          <Text
            color='white'
            fontSize={[16, 18, 20]}
            fontWeight={600}
            textAlign='center'
            px={8}
          >
            {content2}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DetailWorldViewPage;
