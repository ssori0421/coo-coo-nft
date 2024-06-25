// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

// Uniswap V2 팩토리 인터페이스 정의
interface IUniswapV2Factory {
    function createPair(address tokenA, address tokenB) external returns (address pair);
}

contract COOCOO is ERC20, Ownable {
    IUniswapV2Router02 internal uniswapV2Router;
    address public uniswapV2Pair;

    // COOCOO토큰 민팅, Uniswap V2 라우터로는 세폴리아 테스트넷 사용
    constructor() ERC20("COOCOO", "COOCOO") Ownable(msg.sender) {
        _mint(msg.sender, 18000 * 10**decimals());
        uniswapV2Router = IUniswapV2Router02(0x425141165d3DE9FEC831896C016617a52363b687);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }

    function burnFrom(address account, uint256 amount) public {
        uint256 currentAllowance = allowance(account, msg.sender);
        require(currentAllowance >= amount, "ERC20: burn amount exceeds allowance");
        _approve(account, msg.sender, currentAllowance - amount);
        _burn(account, amount);
    }

    function myBalance() public view returns (uint256) {
        return balanceOf(msg.sender);
    }

    function openTrading() external onlyOwner {
        _approve(address(this), address(uniswapV2Router), totalSupply());
        uniswapV2Pair = IUniswapV2Factory(uniswapV2Router.factory()).createPair(address(this), uniswapV2Router.WETH());
        
        // 유동성 추가 시 최소 수량 설정 (토큰과 ETH)
        uint amountTokenMin = 0;
        uint amountETHMin = 0;
        
        uniswapV2Router.addLiquidityETH{value: address(this).balance}(
            address(this), 
            balanceOf(address(this)), 
            amountTokenMin, 
            amountETHMin, 
            address(this), 
            block.timestamp
        );
        
        IERC20(uniswapV2Pair).approve(address(uniswapV2Router), type(uint).max);
    }

    function removeLP() external onlyOwner {
        uniswapV2Router.removeLiquidityETH(
            address(this), 
            IERC20(uniswapV2Pair).balanceOf(address(this)), 
            0, 
            0, 
            owner(), 
            block.timestamp
        );
    }

    function withdraw() external onlyOwner {        
        payable(owner()).transfer(address(this).balance);
    }

    function deposit() external payable {
        // 입금 이벤트 기록 (선택 사항)
        emit Deposit(msg.sender, msg.value);
    }

    event Deposit(address indexed from, uint256 amount);

    // ETH를 CooCooToken으로 스왑하는 함수
    function swapExactETHForCooCoo(uint256 amountOutMin) external payable {
        require(msg.value > 0, "Must send ETH to swap");

        address[] memory path = new address[](2);
        path[0] = uniswapV2Router.WETH();
        path[1] = address(this);

        uniswapV2Router.swapExactETHForTokensSupportingFeeOnTransferTokens{value: msg.value}(
            amountOutMin,
            path,
            msg.sender,
            block.timestamp
        );
    }

    // CooCooToken을 ETH로 스왑하는 함수
    function swapCooCooForExactETH(uint256 amountIn, uint256 amountOutMin) external {
        require(amountIn > 0, "Must send CooCoo to swap");

        _transfer(msg.sender, address(this), amountIn);
        _approve(address(this), address(uniswapV2Router), amountIn);

        address[] memory path = new address[](2);
        path[0] = address(this);
        path[1] = uniswapV2Router.WETH();

        uniswapV2Router.swapExactTokensForETHSupportingFeeOnTransferTokens(
            amountIn,
            amountOutMin,
            path,
            msg.sender,
            block.timestamp
        );
    }
}
