import { Flex, Text, Switch, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { IOutletContext } from '../components/Layout';
import NftCardSlider from '../components/NftCardSlider';
import useNftMetadata from '../hooks/useNftMetadata';
import useApprovalStatus from '../hooks/useApprovalStatue';

const MyCoocooPage = () => {
  const [balanceOf, setBalanceOf] = useState<number>(0);

  const { mintContract, signer, saleContract } =
    useOutletContext<IOutletContext>();

  const { isApprovedForAll, isApproveLoading, onClickSetApprovalForAll } =
    useApprovalStatus({ mintContract, signer });

  const { nftMetadataArray, tokenIds } = useNftMetadata({
    mintContract,
    signer,
    balanceOf,
  });

  const getBalanceOf = async () => {
    try {
      const address = await signer?.getAddress();
      const response = await mintContract?.balanceOf(address);
      setBalanceOf(Number(response));
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  useEffect(() => {
    if (mintContract && signer) {
      getBalanceOf();
    }
  }, [mintContract, signer]);

  return (
    <Flex
      flexDirection='column'
      w='100%'
      background='linear-gradient(to bottom, #f1856a, #ce48c1)'
      py={8}
      px={20}
      alignItems='center'
      minW={530}
    >
      <Flex mb={4} gap={2}>
        <Text
          color='white'
          fontSize={[28, 32, 36]}
          fontWeight='bold'
          fontFamily='DNFBitBitTTF'
        >
          MY COO-COO NFT
        </Text>
        <Text
          color='white'
          fontSize={[28, 32, 36]}
          fontWeight='bold'
          fontFamily='DNFBitBitTTF'
        >
          : {balanceOf} 개
        </Text>
      </Flex>
      {signer && !balanceOf ? (
        <Flex justifyContent='center' alignItems='center' height='50vh'>
          <Spinner size='xl' color='white' />
        </Flex>
      ) : (
        signer && (
          <Flex
            alignItems='center'
            gap={4}
            p={4}
            borderRadius='24px'
            bg='white'
            boxShadow='md'
            justifyContent={['center', 'center', 'flex-end']}
            ml={[0, 0, 'auto']}
          >
            <Flex justifyContent={['center', 'center', 'end']}>
              <Text fontSize='lg' fontWeight='bold' fontFamily='DNFBitBitTTF'>
                판매 여부
              </Text>
              <Switch
                colorScheme='blue'
                isChecked={isApprovedForAll}
                onChange={onClickSetApprovalForAll}
                isDisabled={isApproveLoading}
              />
            </Flex>
          </Flex>
        )
      )}

      {balanceOf > 0 && (
        <NftCardSlider
          cards={nftMetadataArray.map((metadata, index) => ({
            nftMetadata: metadata,
            tokenId: tokenIds[index],
            saleContract,
            isApprovedForAll,
          }))}
        />
      )}
      {!signer && (
        <Text color='white' fontSize={24} fontWeight='semibold'>
          지갑을 연결해 주세요 :)
        </Text>
      )}
    </Flex>
  );
};

export default MyCoocooPage;
