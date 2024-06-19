import { Flex, Grid, Text, Spinner, GridItem } from '@chakra-ui/react';
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

      const tempTokenIds = response.map((item: number) => {
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
          mb={2}
        >
          🍀 COO-COO GARDEN 🍀
        </Text>

        {!signer ? (
          <Text
            color='white'
            fontSize={[16, 16, 20]}
            fontWeight='semibold'
            textAlign='center'
          >
            지갑을 연결해 주세요 :)
          </Text>
        ) : isLoading ? (
          <Flex justifyContent='center' alignItems='center' height='80vh'>
            <Spinner size='xl' color='white' />
          </Flex>
        ) : tokenIds.length === 0 ? (
          <Text
            color='white'
            fontSize={[16, 16, 20]}
            fontWeight='semibold'
            textAlign='center'
          >
            판매중인 NFT가 없습니다 :(
          </Text>
        ) : (
          <>
            <Text
              color='white'
              fontSize={20}
              fontWeight='semibold'
              textAlign='center'
            >
              카드를 클릭해서 상세 정보를 확인해 보세요!
            </Text>

            <Flex w='100%'>
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
                  <GridItem w='100%'>
                    <GardenNftCard
                      key={index}
                      tokenId={item}
                      signer={signer}
                      tokenIds={tokenIds}
                      setTokenIds={setTokenIds}
                    />
                  </GridItem>
                ))}
              </Grid>
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default CooCooGardenPage;
