import { Flex, IconButton, Box } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import MyNftCard from './MyNftCard';
import { Contract } from 'ethers';
import { INftMetadata } from '../types/metadata';

interface INftCardProps {
  nftMetadata: INftMetadata;
  tokenId: number;
  saleContract: Contract | null;
  isApprovedForAll: boolean;
}

const NftCardSlider = ({ cards }: { cards: INftCardProps[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  useEffect(() => {
    setIsPrevDisabled(currentIndex === 0);
    setIsNextDisabled(currentIndex >= cards.length - 3);
  }, [currentIndex, cards.length]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= cards.length - 3 ? prevIndex : prevIndex + 1
    );
  };

  const visibleCards = cards.slice(currentIndex, currentIndex + 3);

  return (
    <Flex alignItems='center' mt={4}>
      {cards.length > 0 && (
        <IconButton
          icon={<ChevronLeftIcon />}
          onClick={handlePrevious}
          aria-label='Previous'
          isDisabled={isPrevDisabled}
          mr={2}
          size='lg'
        />
      )}
      <Flex flexDirection='row' alignItems='center' justifyContent='center'>
        {visibleCards.map((card, index) => (
          <Box key={index} mx={2}>
            <MyNftCard {...card} />
          </Box>
        ))}
      </Flex>
      {cards.length > 0 && (
        <IconButton
          icon={<ChevronRightIcon />}
          onClick={handleNext}
          aria-label='Next'
          isDisabled={isNextDisabled}
          ml={2}
          size='lg'
        />
      )}
    </Flex>
  );
};

export default NftCardSlider;
