import {
  Badge,
  Button,
  Flex,
  GridItem,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
} from '@chakra-ui/react';
import { Contract, parseEther, formatEther } from 'ethers';
import { useState } from 'react';
import useGetTokenPrice from '../hooks/useGetTokenPrice';

interface INftCardProps {
  nftMetadata: NftMetadata;
  tokenId: number;
  saleContract: Contract | null;
  isApprovedForAll: boolean;
}

const MyNftCard = ({
  nftMetadata,
  tokenId,
  saleContract,
  isApprovedForAll,
}: INftCardProps) => {
  const [salePrice, setSalePrice] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { image, name, description, attributes } = nftMetadata;

  const { currentPrice, getTokenPrice } = useGetTokenPrice(
    saleContract,
    tokenId
  );

  const onClickSetForSaleNft = async () => {
    try {
      if (!salePrice || isNaN(Number(salePrice))) return;

      setIsLoading(true);

      const response = await saleContract?.setForSaleNft(
        tokenId,
        parseEther(salePrice)
      );

      await response.wait();

      await getTokenPrice();

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <Flex
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      position='relative'
    >
      <GridItem
        display='flex'
        flexDir='column'
        border='3px solid'
        borderColor='white'
        boxShadow='4px 4px 6px rgba(244, 238, 238, 0.7)'
        borderRadius='12px'
        bgColor='white'
        w={440}
        p={4}
        h={800}
        bg='linear-gradient(to bottom, #9168ea, #e483db)'
      >
        <Text
          textAlign='center'
          fontSize={24}
          variant='link'
          fontFamily='DNFBitBitTTF'
          color='white'
          mb={2}
        >
          {name}
        </Text>

        <Image
          alignSelf='center'
          src={image}
          alt={name}
          mb={8}
          w={300}
          borderRadius={12}
        />
        <Text color='white' mb={4}>
          {description}
        </Text>
        <Flex flexWrap='wrap' justifyContent='center' mb={4}>
          {attributes?.map((attr, index) => (
            <Badge
              key={index}
              borderRadius='full'
              px={2}
              py={1}
              m={1}
              colorScheme='purple'
            >
              <Text fontSize='sm'>
                {attr.trait_type}: {attr.value}
              </Text>
            </Badge>
          ))}
        </Flex>
        <Flex mt={4} justifyContent='center'>
          {currentPrice ? (
            <Text color='white' fontSize={20} fontWeight='semibold'>
              판매가격 : {formatEther(currentPrice)} ETH
            </Text>
          ) : isApprovedForAll ? (
            <Flex position='absolute' bottom={4}>
              <InputGroup>
                <Input
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                  textAlign='right'
                  isDisabled={isLoading}
                />
                <InputRightAddon>ETH</InputRightAddon>
              </InputGroup>
              <Button
                ml={2}
                textColor='black'
                bgColor='white'
                onClick={onClickSetForSaleNft}
                isDisabled={isLoading}
                isLoading={isLoading}
                loadingText='로딩중'
              >
                등록
              </Button>
            </Flex>
          ) : null}
        </Flex>
      </GridItem>
    </Flex>
  );
};

export default MyNftCard;
