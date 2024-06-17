import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface UseNftMetadataParams {
  mintContract: any;
  signer: any;
  balanceOf: number;
  PAGE: number;
}

export interface NftMetadata {
  image: string;
  name: string;
  description: string;
  attributes?: Array<{
    trait_type: string;
    value: string;
  }>;
}

const useNftMetadata = ({
  mintContract,
  signer,
  balanceOf,
  PAGE,
}: UseNftMetadataParams) => {
  const [nftMetadataArray, setNftMetadataArray] = useState<NftMetadata[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tokenIds, setTokenIds] = useState<number[]>([]);

  const fetchNftMetadata = useCallback(
    async (tokenOfOwnerByIndex: any) => {
      const tokenURI = await mintContract?.tokenURI(
        Number(tokenOfOwnerByIndex)
      );
      const { data } = await axios.get<NftMetadata>(tokenURI);
      return { data, tokenId: Number(tokenOfOwnerByIndex) };
    },
    [mintContract]
  );

  const getNftMetadata = useCallback(async () => {
    try {
      setIsLoading(true);

      const address = await signer?.getAddress();
      const newNfts = await Promise.all(
        Array.from({ length: PAGE }).map(async (_, i) => {
          const tokenIndex = i + currentPage * PAGE;
          if (tokenIndex >= balanceOf) {
            setIsEnd(true);
            return null;
          }

          const tokenOfOwnerByIndex = await mintContract?.tokenOfOwnerByIndex(
            address,
            tokenIndex
          );
          return fetchNftMetadata(tokenOfOwnerByIndex);
        })
      );

      const validNfts = newNfts.filter((nft) => nft !== null) as {
        data: NftMetadata;
        tokenId: number;
      }[];
      setNftMetadataArray((prev) => [
        ...prev,
        ...validNfts.map((nft) => nft.data),
      ]);
      setTokenIds((prev) => [...prev, ...validNfts.map((nft) => nft.tokenId)]);
      setCurrentPage((prev) => prev + 1);
    } catch (error) {
      console.error('Error fetching NFT metadata:', error);
    } finally {
      setIsLoading(false);
    }
  }, [balanceOf, currentPage, fetchNftMetadata, mintContract, PAGE, signer]);

  useEffect(() => {
    if (balanceOf > 0) {
      getNftMetadata();
    }
  }, [balanceOf, getNftMetadata]);

  return {
    nftMetadataArray,
    tokenIds,
    isEnd,
    isLoading,
    getNftMetadata,
  };
};

export default useNftMetadata;
