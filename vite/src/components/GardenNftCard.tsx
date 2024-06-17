import { Box, Button, Flex, GridItem, Image, Text } from '@chakra-ui/react';
import axios from 'axios';
import { Contract, formatEther, JsonRpcSigner } from 'ethers';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IGardenNftCardProps {
  tokenId: number;
  mintContract: Contract | null;
  saleContract: Contract | null;
  signer: JsonRpcSigner | null;
  tokenIds: number[];
  setTokenIds: Dispatch<SetStateAction<number[]>>;
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

const GardenNftCard = ({
  tokenId,
  mintContract,
  saleContract,
  signer,
  tokenIds,
  setTokenIds,
}: IGardenNftCardProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nftMetadata, setNftMetadata] = useState<ISaleNftMetadata>();

  const getNftMetadata = async () => {
    try {
      const tokenURI = await mintContract?.tokenURI(tokenId);

      const { data } = await axios.get<INftMetadata>(tokenURI);

      const price = await saleContract?.getTokenPrice(tokenId);
      const tokenOwner = await mintContract?.ownerOf(tokenId);

      setNftMetadata({
        ...data,
        price,
        tokenOwner,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onClickPurchaseNft = async () => {
    try {
      setIsLoading(true);

      const response = await saleContract?.purchaseNft(tokenId, {
        value: nftMetadata?.price,
      });

      await response.wait();

      setTokenIds(
        tokenIds.filter((currentTokenId) => currentTokenId !== tokenId)
      );

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!saleContract || !tokenId || !mintContract) return;
    getNftMetadata();
  }, [saleContract, mintContract, tokenId]);

  if (!nftMetadata) return null;

  const { image, name, description, attributes, price, tokenOwner } =
    nftMetadata;

  return (
    <Flex flexDirection='column' alignItems='center' justifyContent='center'>
      <GridItem
        display='flex'
        flexDir='column'
        border='3px,solid'
        borderColor='black'
        borderRadius='12px'
        bgColor='white'
        boxShadow='4px 4px 6px rgba(0, 0, 0, 0.6)'
        w={400}
        p={4}
      >
        <Flex alignItems='center' justifyContent='space-between'>
          <Text
            fontSize={20}
            variant='link'
            fontFamily='DNFBitBitTTF'
            color=' #ce48c1'
          >
            {name}
          </Text>

          {price ? (
            <>
              <Button
                ml={2}
                colorScheme='pink'
                onClick={onClickPurchaseNft}
                isDisabled={isLoading || tokenOwner === signer?.address}
                isLoading={isLoading}
                loadingText='로딩중..'
              >
                구매
              </Button>
            </>
          ) : null}
        </Flex>

        <Image alignSelf='center' src={image} alt={name} w={300} />
        <Text textAlign='center' fontWeight='semibold'>
          가격 : {formatEther(price)} ETH
        </Text>
        {/* 간단한 NFT 한 줄 소개 */}
        <Flex flexWrap='wrap' mt={4} gap={2} justifyContent='center'>
          {attributes?.map(({ trait_type, value }, index) => (
            <Box key={index} border='2px solid olive' p={1}>
              <Text borderBottom='2px solid olive'>{trait_type}</Text>
              <Text>{value}</Text>
            </Box>
          ))}
        </Flex>
      </GridItem>
    </Flex>
  );
};

export default GardenNftCard;
