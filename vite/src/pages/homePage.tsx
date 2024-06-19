import { Flex, Text, Box, Image, keyframes } from '@chakra-ui/react';
import homeSlideImagesData from '../lib/homeSlideImages';
import cooing17 from '../../public/homeCoocooImages/cooing17.png';
import cooing15 from '../../public/homeCoocooImages/cooing15.png';
import useImageSlide from '../hooks/useImageSlide';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const animationStyle = (delay: string) => ({
  animation: `${fadeIn} 1s ease-in-out forwards`,
  animationDelay: delay,
  opacity: 0,
});

const HomePage = () => {
  useImageSlide();

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
        justifyContent='center'
        alignItems='center'
        flexDir='column'
      >
        <Flex flexDir='column' alignItems='center' mt={150}>
          <Box sx={animationStyle('0s')} mb={8}>
            <Text
              color='white'
              fontFamily='DNFBitBitTTF'
              fontSize={[16, 16, 20]}
            >
              무지개 동산으로 소풍을 떠난 쿠쿠 친구들을 만나러 가볼까요 ?
            </Text>
          </Box>
          <Flex sx={animationStyle('0.5s')}>
            <Text
              color='white'
              fontSize={[24, 24, 36]}
              fontWeight='bold'
              fontFamily='DNFBitBitTTF'
            >
              WELCOME TO
            </Text>
          </Flex>
          <Flex flexDir='column' alignItems='center' sx={animationStyle('1s')}>
            <Text fontSize={[32, 32, 60]} fontFamily='DNFBitBitTTF'>
              COO-COO
            </Text>
            <Text fontSize={[32, 32, 60]} fontFamily='DNFBitBitTTF'>
              WORLD
            </Text>
          </Flex>
        </Flex>
        <Flex
          justifyContent='space-between'
          position='absolute'
          bottom={0}
          transform='translate(0, -55%)'
        >
          <Image src={cooing17} width={['20%', '20%', '25%']} />
          <Image src={cooing15} width={['20%', '20%', '25%']} />
        </Flex>
        <Box
          overflow='hidden'
          whiteSpace='nowrap'
          width='100%'
          mt={8}
          position='fixed'
          bottom={0}
          border='4px solid'
          borderColor='white'
          borderLeft='none'
          borderRight='none'
          borderRadius='12px'
          bg='linear-gradient(to bottom, #9168ea, #e483db)'
        >
          <Box
            id='slider'
            display='inline-flex'
            whiteSpace='nowrap'
            width='100%'
          >
            {homeSlideImagesData
              .concat(homeSlideImagesData)
              .map((image, index) => (
                <Box key={index} flex='none' width={['15%', '15%', '15%']}>
                  <img
                    src={image.src}
                    alt={image.name}
                    style={{ width: '100%' }}
                  />
                </Box>
              ))}
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default HomePage;
