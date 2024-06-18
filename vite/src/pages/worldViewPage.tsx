import { FC } from 'react';
import { Box, Flex, Grid, Image, Text } from '@chakra-ui/react';
import rainbowBridge1 from '../../public/worldViewImages/rainbowBridge1.webp';
import popoForest from '../../public/worldViewImages/popoForest.webp';
import shimmeringLake1 from '../../public/worldViewImages/shimmeringLake1.webp';
import coocooGrassland from '../../public/worldViewImages/coocooGrassland.webp';

const worldViewImages = [
  {
    id: 1,
    src: rainbowBridge1,
    desc1: 'EP.01 ',
    desc2: 'Rainbow Bridge',
  },
  {
    id: 2,
    src: shimmeringLake1,
    desc1: 'EP.02',
    desc2: 'Shimmering Lake',
  },
  { id: 3, src: popoForest, desc1: 'EP.03', desc2: 'PoPo Forest' },
  {
    id: 4,
    src: coocooGrassland,
    desc1: 'EP.04 ',
    desc2: 'CoCO Grassland',
  },
];

const WorldViewPage: FC = () => {
  return (
    <Flex
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      p={8}
      w='100%'
      background='linear-gradient(to bottom, #f1856a, #ce48c1)'
    >
      <Text
        color='white'
        fontSize={[28, 32, 36]}
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
          무지개 다리를 건너 쿠쿠 동산에 도착한 기니들은 어떻게 지내고
          있을까요?!
        </Text>
        <Text
          fontSize={[16, 16, 20]}
          color='white'
          fontWeight={600}
          fontFamily='DNFBitBitTTF'
        >
          쿠쿠월드의 세계관을 살펴보세요 :)
        </Text>
      </Flex>
      <Grid templateColumns='repeat(1, 1fr)' p={10} gap={10}>
        {worldViewImages.map((item, id) => (
          <Box
            position='relative'
            key={id}
            w={1200}
            h={400}
            borderRadius={24}
            overflow='hidden'
            boxShadow='8px 8px 6px rgba(26, 25, 25, 0.7)'
            _hover={{
              '.image': {
                transform: 'scale(1.1)',
              },
              cursor: 'pointer',
            }}
          >
            <Image
              className='image'
              src={item.src}
              borderRadius={24}
              w='100%'
              h='100%'
              objectFit='cover'
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
              fontSize={48}
              color='white'
              fontFamily='DNFBitBitTTF'
              textAlign='right'
            >
              {item.desc1} <br />
              {item.desc2}
            </Text>
          </Box>
        ))}
      </Grid>
    </Flex>
  );
};

export default WorldViewPage;
