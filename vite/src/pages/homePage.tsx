import { FC } from 'react';
import { Flex, Text } from '@chakra-ui/react';

const HomePage: FC = () => {
  return (
    <Flex
      flexDirection='column'
      w='100%'
      background='linear-gradient(to bottom, #f1856a, #ce48c1)'
    >
      <Flex
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        mt={8}
      >
        <Text
          color='white'
          fontSize={[20, 20, 32]}
          fontWeight='bold'
          fontFamily='DNFBitBitTTF'
        >
          WELCOME TO
        </Text>
        <Text fontSize={[32, 32, 60]} fontFamily='DNFBitBitTTF'>
          COO-COO
        </Text>
        <Text fontSize={[32, 32, 60]} fontFamily='DNFBitBitTTF'>
          WORLD
        </Text>
        <Flex>
          <Text color='white' fontSize={[12, 12, 16]}>
            무지개 동산으로 소풍을 떠난 쿠쿠 친구들을 만나러 가볼까요?
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HomePage;
