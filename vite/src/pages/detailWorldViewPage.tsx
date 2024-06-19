import { Flex, Text, Image, Box, Divider, Spinner } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import worldViewData from '../lib/worldView';

const DetailWorldViewPage = () => {
  const { id } = useParams<{ id: string }>();

  const data = worldViewData.find((item) => item.id === Number(id));

  if (!data)
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

  const { title, src, contentTitle1, content1, contentTitle2, content2 } = data;

  return (
    <Flex
      w='100%'
      flexDir='column'
      alignItems='center'
      background='linear-gradient(to bottom, #f1856a, #ce48c1)'
    >
      <Flex w='100%' maxW='1024px' flexDir='column' alignItems='center' p={8}>
        <Text
          color='white'
          fontSize={[28, 28, 32]}
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
            border='5px solid'
            borderColor='pink'
            mb={2}
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
        <Flex mt={2} flexDir='column'>
          <Flex flexDir='column' gap={2} px={8} mb={4}>
            <Text
              color='white'
              fontSize={[24, 24, 28]}
              fontWeight={400}
              fontFamily='DNFBitBitTTF'
              textAlign='center'
            >
              {contentTitle1}
            </Text>
            <Text
              color='white'
              fontSize={[16, 16, 18]}
              fontWeight={600}
              textAlign='center'
            >
              {content1}
            </Text>
          </Flex>
          <Divider />
          <Flex flexDir='column' gap={2} px={8} mt={4}>
            <Text
              color='white'
              fontSize={[24, 24, 28]}
              fontWeight={400}
              fontFamily='DNFBitBitTTF'
              textAlign='center'
            >
              {contentTitle2}
            </Text>
            <Text
              color='white'
              fontSize={[16, 16, 18]}
              fontWeight={600}
              textAlign='center'
            >
              {content2}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DetailWorldViewPage;
