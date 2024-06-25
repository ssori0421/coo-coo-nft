// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./MintCooCooNft.sol";

contract SaleCooCooNft {
    MintCooCooNft public MintCooCooNftContract;

    mapping(uint => uint) public tokenPrice;
    uint[] public onSaleTokens;

    constructor(address _cooCooMintNftAddress) {
        MintCooCooNftContract = MintCooCooNft(_cooCooMintNftAddress);
    }

    function setForSaleNft(uint _tokenId, uint _price) public {
        require(msg.sender == MintCooCooNftContract.ownerOf(_tokenId), "Caller is not token owner.");
        require(_price > 0, "Price is zero.");
        require(MintCooCooNftContract.isApprovedForAll(msg.sender, address(this)), "Token owner did not approve token.");
        require(tokenPrice[_tokenId] == 0, "This token is already for sale.");

        tokenPrice[_tokenId] = _price;
        onSaleTokens.push(_tokenId);
    }

    function purchaseNft(uint _tokenId) public payable {
        require(msg.sender != MintCooCooNftContract.ownerOf(_tokenId), "Caller is token owner.");
        require(msg.value >= tokenPrice[_tokenId], "Caller sent lower than price.");
        require(tokenPrice[_tokenId] != 0, "Token is not for sale.");

        payable(MintCooCooNftContract.ownerOf(_tokenId)).transfer(msg.value);
        MintCooCooNftContract.transferFrom(MintCooCooNftContract.ownerOf(_tokenId), msg.sender, _tokenId);

        tokenPrice[_tokenId] = 0;

        for (uint i = 0; i < onSaleTokens.length; i++) {
            if (onSaleTokens[i] == _tokenId) {
                onSaleTokens[i] = onSaleTokens[onSaleTokens.length - 1];
                onSaleTokens.pop();
                break;
            }
        }
    }

    function getOnSaleTokens() public view returns (uint[] memory) {
        return onSaleTokens;
    }

    function getTokenPrice(uint _tokenId) public view returns (uint) {
        return tokenPrice[_tokenId];
    }
}
