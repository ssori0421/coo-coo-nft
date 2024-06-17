import { Flex, Grid } from '@chakra-ui/react';
import { useOutletContext } from 'react-router-dom';
import { IOutletContext } from '../components/Layout';
import { useEffect, useState } from 'react';
import GardenNftCard from '../components/GardenNftCard';

const CooCooGardenPage = () => {
  const [tokenIds, setTokenIds] = useState<number[]>([]);

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
    >
      <Grid
        templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
        gap={8}
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
    </Flex>
  );
};

export default CooCooGardenPage;
