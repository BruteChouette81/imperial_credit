// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
pragma abicoder v2;


import "./credit.sol";

import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";
import "@uniswap/v3-core/contracts/libraries/TickMath.sol";

contract Credit_AMM {
    using SafeMath for uint256;

    uint256 totalShares;  // Stores the total amount of share issued for the pool
    uint256 totalToken1;  // Stores the amount of Token1 locked in the pool ==> replace with USD tether
    uint256 totalToken2;  // Stores the amount of Token2 locked in the pool ==> replace with $credits Stable
    uint256 K;            // Algorithmic constant used to determine price (K = totalToken1 * totalToken2) p * q = K

    credit public credits; 
    IERC20 public tether; // erc20 ==> usdc
    IUniswapV3Pool public pool;

    uint256 constant PRECISION = 1_000_000;  // Precision of 6 decimal places

    mapping(address => uint256) shares;  // Stores the share holding of each provider

    //mapping(address => uint256) token1Balance;  // Stores the available balance of user outside of the AMM
    //mapping(address => uint256) token2Balance;
    constructor(credit _addrCredit, IERC20 _addrTether, IUniswapV3Pool _addrPool) {
        credits = _addrCredit;
        tether = _addrTether;
        pool = _addrPool;
    }
    //MODIFIERS

    // Ensures that the _qty is non-zero and the user has enough balance
    modifier validAmountCheck(uint _tkn, uint256 _qty) {
        require(_qty > 0, "Amount cannot be zero!");
        if (_tkn == 1) {
            require(_qty <= credits.balanceOf(msg.sender), "Insufficient amount");
        } else {
            if(_tkn == 2) {
                require(_qty <= tether.balanceOf(msg.sender), "Insufficient amount");
            } else {
                require(_qty <= shares[msg.sender], "Insufficient amount");
            }
            
        }
        
        _;
    }

    // Restricts withdraw, swap feature till liquidity is added to the pool
    // can't withdram unexisting liquidity
    modifier activePool() {
        require(totalShares > 0, "Zero Liquidity");
        _;
    }

    //INFORMATIONS

    // Returns the balance of the user
    function getMyHoldings() external view returns(uint256 amountToken1, uint256 amountToken2, uint256 myShare) {
        amountToken1 = credits.balanceOf(msg.sender);
        amountToken2 = tether.balanceOf(msg.sender);
        myShare = shares[msg.sender];
    }

    // Returns the total amount of tokens locked in the pool and the total shares issued corresponding to it
    function getPoolDetails() external view returns(uint256, uint256, uint256) {
        return (totalToken1, totalToken2, totalShares);
    }

    //POOL

    // Adding new liquidity in the pool
    // Returns the amount of share issued for locking given assets
    function provide(uint256 _amountToken1, uint256 _amountToken2) external validAmountCheck(1, _amountToken1) validAmountCheck(2, _amountToken2) returns(uint256 share) {
        if(totalShares == 0) { // Genesis liquidity is issued 100 Shares ==> first time liquidity
            share = 100*PRECISION;
        } else{
            uint256 share1 = totalShares.mul(_amountToken1).div(totalToken1);
            uint256 share2 = totalShares.mul(_amountToken2).div(totalToken2);
            require(share1 == share2, "Equivalent value of tokens not provided...");
            share = share1;
        }

        require(share > 0, "Asset value less than threshold for contribution!");
        //remove
        //token1Balance[msg.sender] -= _amountToken1; //credits
        //token2Balance[msg.sender] -= _amountToken2; //tether

        //transfer
        credits.transferFrom(msg.sender, address(this), _amountToken1);
        tether.transferFrom(msg.sender, address(this), _amountToken2);

        totalToken1 += _amountToken1;
        totalToken2 += _amountToken2;
        K = totalToken1.mul(totalToken2);

        totalShares += share;
        shares[msg.sender] += share;
    }

    // Returns amount of Token1 required when providing liquidity with _amountToken2 quantity of Token2
    function getEquivalentToken1Estimate(uint256 _amountToken2) public view activePool returns(uint256 reqToken1) {
        reqToken1 = totalToken1.mul(_amountToken2).div(totalToken2);
    }

    // Returns amount of Token2 required when providing liquidity with _amountToken1 quantity of Token1
    function getEquivalentToken2Estimate(uint256 _amountToken1) public view activePool returns(uint256 reqToken2) {
        reqToken2 = totalToken2.mul(_amountToken1).div(totalToken1);
    }

    // WITHDRAW

    // Returns the estimate of Token1 & Token2 that will be released on burning given _share
    function getWithdrawEstimate(uint256 _share) public view activePool returns(uint256 amountToken1, uint256 amountToken2) {
        require(_share <= totalShares, "Share should be less than totalShare");
        amountToken1 = _share.mul(totalToken1).div(totalShares);
        amountToken2 = _share.mul(totalToken2).div(totalShares);
    }

    // Removes liquidity from the pool and releases corresponding Token1 & Token2 to the withdrawer
    function withdraw(uint256 _share) external activePool validAmountCheck(3, _share) returns(uint256 amountToken1, uint256 amountToken2) {
        (amountToken1, amountToken2) = getWithdrawEstimate(_share);
        
        shares[msg.sender] -= _share;
        totalShares -= _share;

        totalToken1 -= amountToken1;
        totalToken2 -= amountToken2;
        K = totalToken1.mul(totalToken2);

        //remove
        //token1Balance[msg.sender] += amountToken1;
        //token2Balance[msg.sender] += amountToken2;

        credits.transfer(msg.sender, amountToken1);
        tether.transfer(msg.sender, amountToken2);
    }

    //TRADE $Credits - Tether

    // Returns the amount of $credit that the user will get when swapping a given amount of $credits for tether
    function getSwapToken1Estimate(uint256 _amountToken1) public view activePool returns(uint256 amountToken2) {
        uint256 token1After = totalToken1.add(_amountToken1);
        uint256 token2After = K.div(token1After);
        amountToken2 = totalToken2.sub(token2After);

        // To ensure that Token2's pool is not completely depleted leading to inf:0 ratio
        if(amountToken2 == totalToken2) amountToken2--;
    }

    // Returns the amount of tether that the user should swap to get $credits in return
    function getSwapToken1EstimateGivenToken2(uint256 _amountToken2) public view activePool returns(uint256 amountToken1) {
        require(_amountToken2 < totalToken2, "Insufficient pool balance");
        uint256 token2After = totalToken2.sub(_amountToken2);
        uint256 token1After = K.div(token2After);
        amountToken1 = token1After.sub(totalToken1);
    }

    // Swaps given amount of $Credits to Tether using algorithmic price determination
    function swapCredits(uint256 _amountToken1) external activePool validAmountCheck(1, _amountToken1) returns(uint256 amountToken2) {
        amountToken2 = getSwapToken1Estimate(_amountToken1);

        //token1Balance[msg.sender] -= _amountToken1;
        credits.transferFrom(msg.sender, address(this), _amountToken1);
        totalToken1 += _amountToken1;
        totalToken2 -= amountToken2;
        tether.transfer(msg.sender, amountToken2);
        //token2Balance[msg.sender] += amountToken2;
    }

    //TRADE Tether - $Credits

    // Returns the amount of $credits that the user will get when swapping a given amount of Tether for $credits
    // tether --> $credits
    function getSwapToken2Estimate(uint256 _amountToken2) public view activePool returns(uint256 amountToken1) {
        uint256 token2After = totalToken2.add(_amountToken2);
        uint256 token1After = K.div(token2After);
        amountToken1 = totalToken1.sub(token1After);

        // To ensure that Token1's pool is not completely depleted leading to inf:0 ratio
        if(amountToken1 == totalToken1) amountToken1--;
    }
    
    // Returns the amount of tether that the user should swap to get credits in return
    // credits --> tether
    function getSwapToken2EstimateGivenToken1(uint256 _amountToken1) public view activePool returns(uint256 amountToken2) {
        require(_amountToken1 < totalToken1, "Insufficient pool balance");
        uint256 token1After = totalToken1.sub(_amountToken1);
        uint256 token2After = K.div(token1After);
        amountToken2 = token2After.sub(totalToken2);
    }

    // Swaps given amount of Tether to $credits using algorithmic price determination
    function swapTether(uint256 _amountToken2) external activePool validAmountCheck(2, _amountToken2) returns(uint256 amountToken1) {
        amountToken1 = getSwapToken2Estimate(_amountToken2);
        
        //token2Balance[msg.sender] -= _amountToken2;
        tether.transferFrom(msg.sender, address(this), _amountToken2);
        totalToken2 += _amountToken2;
        totalToken1 -= amountToken1;
        credits.transfer(msg.sender, amountToken1);
        //token1Balance[msg.sender] += amountToken1;
    }

    //functionning: 
    // when Stake, a new function triggers where liquidity and all the others are calculated in javascript. 
    // a new satkeToken2 is called and the amount of token2 is burn in credits, half of it is transfer to ETH, where it can be stake
    // the address is saved with the amount staked in a struct, which will come with a modifier in order to unstake (note, the position will be minted to the contract address)
    // when we retrieve the token, we need to brun the position and collect( with fees). Then, we transfer the amount to the seller and take a cut

    function stakeToken2(uint256 _amountToken2, uint256 liquidity, address recipient, uint160 sqrtPriceLimitX96) external returns (amount1, amount2) {
        //exchange half of the Tether ==> wETH/ETH
      
        //NEED TO: transfer token 2 to the contract
        uint256 amount1;
        uint256 amount2;

        //the amount exchanged 
        uint256 _amount1;
        uint256 _amount2;

        //_amount0 = negatives (gives usdc) and _amount1 = positives (receive eth)
        // sqrtPriceLimitX96 The Q64.96 sqrt price limit. If zero for one, the price cannot be less than this

        (_amount1, _amount2) = pool.swap(address(this), true, _amountToken2.div(2), sqrtPriceLimitX96); //swap half into ETH
        credits.burn(_amountToken2);

        //calculate liquidity using this 
        //example for 1 eth to usdc
        //sqrt = square root ou racine carre

        /*
        x = 1
        price = 2486.8
        price_high = 2998.9
        price_low = 1994.2
        L = x * sqrt(price) * sqrt(price_high) / (sqrt(price_high) - sqrt(price))
        */

        (amount1, amount2) = pool.mint(address(this), TickMath.MIN_TICK, TickMath.MAX_TICK, liquidity); //full range Liquidity = total amount worth of USDC ex: 2000 USDC liquidity = 1000 USDC and 0.6 eth
    }

    function unStakeToken2(uint256 _amountToken2, uint256 _amountToken3, uint160 sqrtPriceLimitX96) external returns ( bool confirmation) {

        uint256 amount1;
        uint256 amount2;

        (amount1, amount2) = pool.collect(address(this), TickMath.MIN_TICK, TickMath.MAX_TICK, _amountToken2, _amountToken3);

        pool.swap(recipient, false, amount2, sqrtPriceLimitX96);

        tether.transfer(msg.sender, amount1.mul(2));



    }
}