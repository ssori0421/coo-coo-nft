import {
  Badge,
  Button,
  Flex,
  Box,
  Image,
  Text,
  Divider,
} from '@chakra-ui/react';
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

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '..';
};

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

  const { image, name, description, attributes, price, tokenOwner } =
    nftMetadata;

  return (
    <Flex flexDirection='column' alignItems='center' justifyContent='center'>
      <Box
        display='flex'
        flexDir='column'
        border='3px solid'
        borderColor='white'
        boxShadow='4px 4px 6px rgba(244, 238, 238, 0.7)'
        borderRadius='12px'
        h={680}
        bg='linear-gradient(to bottom, #9168ea, #e483db)'
        w={400}
        p={4}
        position='relative'
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
            <Text
              fontSize={24}
              variant='link'
              fontFamily='DNFBitBitTTF'
              color='white'
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

          <Image
            alignSelf='center'
            src={image}
            alt={name}
            w={300}
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
          <Divider my={3} />
          <Text fontSize='sm' mb={4} textColor='white' fontWeight={800} px={8}>
            {truncateText(description, 50)}
          </Text>
          <Flex flexWrap='wrap' justifyContent='center' mb={4}>
            {attributes.map((attr, index) => (
              <Badge
                key={index}
                borderRadius='full'
                px={2}
                m={1}
                colorScheme='purple'
              >
                <Text fontSize='sm'>
                  {attr.trait_type}: {attr.value}
                </Text>
              </Badge>
            ))}
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default GardenNftCard;
