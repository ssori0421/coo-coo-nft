import { useState, useEffect } from 'react';
import { Contract } from 'ethers';
import { saleContractAddress } from '../lib/contractAddress';

interface UseApprovalStatusProps {
  mintContract: Contract | null;
  signer: any;
}

const useApprovalStatus = ({
  mintContract,
  signer,
}: UseApprovalStatusProps) => {
  const [isApprovedForAll, setIsApprovedForAll] = useState<boolean>(false);
  const [isApproveLoading, setIsApproveLoading] = useState<boolean>(false);

  const getIsApprovedForAll = async () => {
    try {
      const address = await signer?.getAddress();
      const response = await mintContract?.isApprovedForAll(
        address,
        saleContractAddress
      );
      setIsApprovedForAll(response);
    } catch (error) {
      console.error('Error checking approval status:', error);
    }
  };

  const onClickSetApprovalForAll = async () => {
    try {
      setIsApproveLoading(true);

      const response = await mintContract?.setApprovalForAll(
        saleContractAddress,
        !isApprovedForAll
      );

      await response.wait();

      setIsApprovedForAll(!isApprovedForAll);
      setIsApproveLoading(false);
    } catch (error) {
      console.error('Error setting approval status:', error);
      setIsApproveLoading(false);
    }
  };

  useEffect(() => {
    if (mintContract && signer) {
      getIsApprovedForAll();
    }
  }, [mintContract, signer]);

  return { isApprovedForAll, isApproveLoading, onClickSetApprovalForAll };
};

export default useApprovalStatus;
