
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./MintNFT.sol";

contract SaleNft {
    MintNft mintNftContract;
    address public owner;

    mapping(uint => uint) tokenPrice;
    uint[] onSaleTokens;

    constructor(address _mintNftAddress) {
        mintNftContract = MintNft(_mintNftAddress);
        owner = msg.sender;  // 컨트랙트 배포자의 주소를 소유자로 설정
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner.");
        _;
    }

    function setForSaleNft(uint _tokenId, uint _price) public onlyOwner {
        require(mintNftContract.ownerOf(_tokenId) == owner, "Caller is not token owner.");
        require(_price > 0, "Price is zero.");
        require(mintNftContract.isApprovedForAll(msg.sender, address(this)), "Token owner did not approve token.");
        require(tokenPrice[_tokenId] == 0, "This token is already for sale.");

        tokenPrice[_tokenId] = _price; 
        onSaleTokens.push(_tokenId);
    }

    function purchaseNft(uint _tokenId) public payable {
        require(msg.value >= tokenPrice[_tokenId], "Caller sent lower than price.");
        require(tokenPrice[_tokenId] != 0, "Token is not for sale.");

        address tokenOwner = mintNftContract.ownerOf(_tokenId);
        payable(tokenOwner).transfer(msg.value);
        mintNftContract.transferFrom(tokenOwner, msg.sender, _tokenId);

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