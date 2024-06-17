import { Box, Button, Flex, GridItem, Image, Text } from '@chakra-ui/react';
import { formatEther, JsonRpcSigner } from 'ethers';
import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import useNftMetadatas from '../hooks/useNftMetadatas';

interface IGardenNftCardProps {
  tokenId: number;
  signer: JsonRpcSigner | null;
  tokenIds: number[];
  setTokenIds: Dispatch<SetStateAction<number[]>>;
}

const GardenNftCard = ({
  tokenId,
  signer,
  tokenIds,
  setTokenIds,
}: IGardenNftCardProps) => {
  const navigate = useNavigate();

  const { nftMetadata, isLoading, setIsLoading, saleContract } =
    useNftMetadatas({
      tokenId,
    });

  const onClickPurchaseNft = async (e: React.MouseEvent) => {
    e.stopPropagation(); // 클릭 이벤트 전파 중지
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
      alert('NFT 구매 중 오류가 발생했습니다.');
      setIsLoading(false);
    }
  };

  const onClickCardDetail = (tokenId: number) => {
    navigate(`/coocooGarden/${tokenId}`);
  };

  if (isLoading || !nftMetadata) return <Text>Loading...</Text>;

  const { image, name, description, attributes, price, tokenOwner } =
    nftMetadata;

  return (
    <Flex flexDirection='column' alignItems='center' justifyContent='center'>
      <GridItem
        display='flex'
        flexDir='column'
        border='3px solid'
        borderColor='black'
        borderRadius='12px'
        bgColor='white'
        boxShadow='4px 4px 6px rgba(0, 0, 0, 0.6)'
        w={400}
        p={4}
        onClick={() => onClickCardDetail(tokenId)}
      >
        <Flex alignItems='center' justifyContent='space-between'>
          <Text
            fontSize={20}
            variant='link'
            fontFamily='DNFBitBitTTF'
            color='#ce48c1'
          >
            {name}
          </Text>

          {price ? (
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
