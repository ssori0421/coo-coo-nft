import { useState, useEffect, useCallback } from 'react';
import { Contract } from 'ethers';

const useGetTokenPrice = (saleContract: Contract | null, tokenId: number) => {
  const [currentPrice, setCurrentPrice] = useState<bigint | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getTokenPrice = useCallback(async () => {
    if (!saleContract || !tokenId) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await saleContract.getTokenPrice(tokenId);
      setCurrentPrice(response);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch token price');
    } finally {
      setIsLoading(false);
    }
  }, [saleContract, tokenId]);

  useEffect(() => {
    getTokenPrice();
  }, [getTokenPrice]);

  return { currentPrice, isLoading, error, getTokenPrice };
};

export default useGetTokenPrice;
