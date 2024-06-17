import { useState, useEffect } from 'react';
import axios from 'axios';
import { Contract } from 'ethers';
import { useOutletContext } from 'react-router-dom';
import { JsonRpcSigner } from 'ethers';

interface IuseNftMetadatassProps {
  tokenId: number;
}

interface INftMetadata {
  image: string;
  name: string;
  description: string;
  attributes: { trait_type: string; value: string }[];
}

interface ISaleNftMetadata extends INftMetadata {
  price: any;
  tokenOwner: string;
}

interface IOutletContext {
  mintContract: Contract | null;
  saleContract: Contract | null;
  signer: JsonRpcSigner | null;
}

const useNftMetadatas = ({ tokenId }: IuseNftMetadatassProps) => {
  const { mintContract, saleContract } = useOutletContext<IOutletContext>();
  const [nftMetadata, setNftMetadata] = useState<ISaleNftMetadata | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getNftMetadata = async () => {
    try {
      if (!mintContract || !saleContract) return;

      const tokenURI = await mintContract.tokenURI(tokenId);
      const { data } = await axios.get<INftMetadata>(tokenURI);
      const price = await saleContract.getTokenPrice(tokenId);
      const tokenOwner = await mintContract.ownerOf(tokenId);

      setNftMetadata({
        ...data,
        price,
        tokenOwner,
      });
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getNftMetadata();
  }, [mintContract, saleContract, tokenId]);

  return { nftMetadata, isLoading, setIsLoading, saleContract };
};

export default useNftMetadatas;
