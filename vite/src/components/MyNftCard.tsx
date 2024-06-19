import {
  Button,
  Divider,
  Flex,
  GridItem,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Tag,
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
        maxW={440}
        p={4}
        h={600}
        bg='linear-gradient(to bottom, #9168ea, #e483db)'
      >
        <Text
          textAlign='center'
          fontSize={[16, 16, 20]}
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
          mb={4}
          w={180}
          borderRadius='50%'
        />
        <Text color='white' mb={2} fontWeight={600} fontSize={[12, 12, 14]}>
          {description}
        </Text>
        <Divider my={2} />

        <Flex width='100%' flexWrap='wrap' justifyContent='center'>
          {attributes?.map((attr, index) => (
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

        <Flex mt={4} justifyContent='center'>
          {currentPrice ? (
            <Text
              color='white'
              fontSize={[12, 12, 16]}
              fontWeight={800}
              position='absolute'
              bottom={2}
            >
              판매가격 : {formatEther(currentPrice)} ETH
            </Text>
          ) : isApprovedForAll ? (
            <Flex position='absolute' left={3} right={3} bottom={2}>
              <InputGroup>
                <Input
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                  textAlign='right'
                  focusBorderColor='white'
                  isDisabled={isLoading}
                />
                <InputRightAddon>ETH</InputRightAddon>
              </InputGroup>
              <Button
                ml={2}
                textColor='black'
                bgColor='white'
                onClick={onClickSetForSaleNft}
                isDisabled={isLoading || !salePrice || isNaN(Number(salePrice))}
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
