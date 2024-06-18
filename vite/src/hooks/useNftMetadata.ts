import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface IUseNftMetadataParams {
  mintContract: any;
  signer: any;
  balanceOf: number;
}

const useNftMetadata = ({
  mintContract,
  signer,
  balanceOf,
}: IUseNftMetadataParams) => {
  const [nftMetadataArray, setNftMetadataArray] = useState<NftMetadata[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tokenIds, setTokenIds] = useState<number[]>([]);

  const fetchNftMetadata = useCallback(
    async (tokenId: number) => {
      try {
        const tokenURI = await mintContract?.tokenURI(tokenId);
        const { data } = await axios.get<NftMetadata>(tokenURI);
        return { data, tokenId };
      } catch (error) {
        console.error(`Error fetching metadata for token ${tokenId}:`, error);
        return null;
      }
    },
    [mintContract]
  );

  const loadNftMetadata = useCallback(async () => {
    try {
      setIsLoading(true);

      const address = await signer?.getAddress();
      const nftPromises = Array.from({ length: balanceOf }).map(
        async (_, i) => {
          const tokenId = await mintContract?.tokenOfOwnerByIndex(address, i);
          return fetchNftMetadata(Number(tokenId));
        }
      );

      const nfts = await Promise.all(nftPromises);
      const validNfts = nfts.filter((nft) => nft !== null) as {
        data: NftMetadata;
        tokenId: number;
      }[];
      setNftMetadataArray(validNfts.map((nft) => nft.data));
      setTokenIds(validNfts.map((nft) => nft.tokenId));
    } catch (error) {
      console.error('Error loading NFT metadata:', error);
    } finally {
      setIsLoading(false);
    }
  }, [balanceOf, fetchNftMetadata, mintContract, signer]);

  useEffect(() => {
    if (balanceOf > 0) {
      loadNftMetadata();
    }
  }, [balanceOf, loadNftMetadata]);

  return {
    nftMetadataArray,
    tokenIds,
    isLoading,
  };
};

export default useNftMetadata;
