import { Flex, Grid, Text, Spinner } from '@chakra-ui/react';
import { useOutletContext } from 'react-router-dom';
import { IOutletContext } from '../components/Layout';
import { useEffect, useState } from 'react';
import GardenNftCard from '../components/GardenNftCard';

const CooCooGardenPage = () => {
  const [tokenIds, setTokenIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { signer, saleContract } = useOutletContext<IOutletContext>();

  const getOnSaleTokens = async () => {
    try {
      const response = await saleContract?.getOnSaleTokens();
      const tempTokenIds = response.map((item: any) => {
        return Number(item);
      });
      setTokenIds(tempTokenIds);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!saleContract) return;

    getOnSaleTokens();
  }, [saleContract]);

  useEffect(() => {
    console.log(tokenIds);
  }, [tokenIds]);

  return (
    <Flex
      flexDirection='column'
      w='100%'
      background='linear-gradient(to bottom, #f1856a, #ce48c1)'
      py={8}
      px={20}
      alignItems='center'
    >
      <Text
        color='white'
        fontSize={[28, 32, 36]}
        fontWeight='bold'
        fontFamily='DNFBitBitTTF'
        textAlign='center'
      >
        🍀 COO-COO GARDEN 🍀
      </Text>

      {!signer ? (
        <Text
          color='white'
          fontSize={24}
          fontWeight='semibold'
          textAlign='center'
          mt={4}
        >
          지갑을 연결해 주세요 :)
        </Text>
      ) : isLoading ? (
        <Flex justifyContent='center' alignItems='center' height='50vh'>
          <Spinner size='xl' color='white' />
        </Flex>
      ) : tokenIds.length === 0 ? (
        <Text
          color='white'
          fontSize={24}
          fontWeight='semibold'
          textAlign='center'
          mt={4}
        >
          판매중인 NFT가 없습니다 :(
        </Text>
      ) : (
        <Grid
          templateColumns={[
            'repeat(1, 1fr)',
            'repeat(2, 1fr)',
            'repeat(3, 1fr)',
          ]}
          gap={8}
          mt={4}
        >
          {tokenIds.map((item, index) => (
            <GardenNftCard
              key={index}
              tokenId={item}
              signer={signer}
              tokenIds={tokenIds}
              setTokenIds={setTokenIds}
            />
          ))}
        </Grid>
      )}
    </Flex>
  );
};

export default CooCooGardenPage;
