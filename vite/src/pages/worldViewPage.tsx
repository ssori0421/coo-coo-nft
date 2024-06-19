import { Box, Flex, Image, Text } from '@chakra-ui/react';
import rainbowBridge1 from '../../public/worldViewImages/rainbowBridge1.webp';
import popoForest from '../../public/worldViewImages/popoForest.webp';
import shimmeringLake1 from '../../public/worldViewImages/shimmeringLake1.webp';
import coocooGrassland from '../../public/worldViewImages/coocooGrassland.webp';
import { useNavigate } from 'react-router-dom';

const worldViewImages = [
  {
    id: 1,
    src: rainbowBridge1,
    desc1: 'EP.01 ',
    desc2: 'Rainbow Bridge',
  },
  { id: 2, src: popoForest, desc1: 'EP.02', desc2: 'PoPo Forest' },
  {
    id: 3,
    src: coocooGrassland,
    desc1: 'EP.03 ',
    desc2: 'CoCo Grassland',
  },
  {
    id: 4,
    src: shimmeringLake1,
    desc1: 'EP.04',
    desc2: 'Shimmering Lake',
  },
];

const WorldViewPage = () => {
  const navigate = useNavigate();

  const onClickWorldViewDatail = (id: number) => {
    navigate(`/worldview/${id}`);
  };

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
          ✨ WORLD-VIEW ✨
        </Text>
        <Flex flexDir='column' alignItems='center' gap={2}>
          <Text
            fontSize={[16, 16, 20]}
            color='white'
            fontWeight={600}
            fontFamily='DNFBitBitTTF'
          >
            무지개다리를 건너 쿠쿠 동산에 도착한 기니들은 어떻게 지내고
            있을까요?!
          </Text>
          <Text
            fontSize={[16, 16, 20]}
            color='white'
            fontWeight={600}
            fontFamily='DNFBitBitTTF'
          >
            쿠쿠 월드의 세계관을 살펴보세요 :)
          </Text>
        </Flex>
        <Flex flexDir='column' mt={8} gap={10}>
          {worldViewImages.map((item) => (
            <Box
              position='relative'
              key={item.id}
              w='100%'
              h={['40vh', 'calc(100vh * 2 / 5)']}
              borderRadius={24}
              overflow='hidden'
              boxShadow='8px 8px 6px rgba(26, 25, 25, 0.7)'
              _hover={{
                '.image': {
                  transform: 'scale(1.1)',
                },
                cursor: 'pointer',
              }}
              onClick={() => onClickWorldViewDatail(item.id)}
            >
              <Image
                className='image'
                src={item.src}
                borderRadius={24}
                objectFit='cover'
                w='100%'
                h='100%'
                transition='transform 0.5s ease'
              />
              <Box
                position='absolute'
                top={0}
                left={0}
                right={0}
                bottom={0}
                bg='rgba(255, 255, 255, 0.2)'
                borderRadius={24}
              />

              <Text
                position='absolute'
                bottom={4}
                right={4}
                fontSize={[24, 32, 36]}
                color='white'
                fontFamily='DNFBitBitTTF'
                textAlign='right'
              >
                {item.desc1} <br />
                {item.desc2}
              </Text>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default WorldViewPage;
