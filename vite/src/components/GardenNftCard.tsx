import { Button, Flex, Box, Image, Text, Divider, Tag } from '@chakra-ui/react';
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
    e.stopPropagation();
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

  if (!nftMetadata) return null;

  const { image, name, attributes, price, tokenOwner } = nftMetadata;

  return (
    <Flex flexDirection='column' alignItems='center' justifyContent='center'>
      <Box
        display='flex'
        flexDir='column'
        h={500}
        border='3px solid'
        borderColor='white'
        boxShadow='4px 4px 6px rgba(244, 238, 238, 0.7)'
        borderRadius='12px'
        bg='linear-gradient(to bottom, #9168ea, #e483db)'
        p={4}
        overflow='hidden'
        onClick={() => onClickCardDetail(tokenId)}
        _hover={{
          transform: 'scale(1.05)',
          transition: 'transform 0.3s ease-in-out',
        }}
        cursor='pointer'
      >
        <Flex flexDirection='column' zIndex={2}>
          <Flex alignItems='center' justifyContent='space-between'>
            <Text fontSize={24} fontFamily='DNFBitBitTTF' color='white'>
              {name}
            </Text>

            {price ? (
              <Button
                ml={2}
                colorScheme='pink'
                onClick={onClickPurchaseNft}
                isDisabled={isLoading || tokenOwner === signer?.address}
                isLoading={isLoading}
                loadingText='구매중'
              >
                구매
              </Button>
            ) : null}
          </Flex>
          <Image
            alignSelf='center'
            src={image}
            alt={name}
            w={200}
            borderRadius='50%'
            my={4}
          />
          <Text
            textAlign='center'
            fontWeight='bold'
            color='white'
            fontSize={18}
            fontFamily='DNFBitBitTTF'
          >
            가격 : {formatEther(price)} ETH
          </Text>
          <Divider my={4} />

          <Flex width='100%' flexWrap='wrap' justifyContent='center'>
            {attributes.map((attr, index) => (
              <Tag
                key={index}
                textAlign='center'
                display='flex'
                borderRadius='full'
                px={2}
                m={1}
                bgColor='white'
                fontFamily='DNFBitBitTTF'
                color='black'
                fontSize={12}
              >
                {attr.value}
              </Tag>
            ))}
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default GardenNftCard;
