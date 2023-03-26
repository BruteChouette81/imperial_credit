// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

// stands for imperial exchange token. used to comfirm smart contract and reduce the crypto repercutions. Build a normal coin and an oracle that is use to algorithmicly back the token 1:1 (special AMM)

//this is a input oracle that allows to connect to external data point

//this program has two potential usage: 
//1: changing the api to get ETH price, we can create an algorithmic stable coin as a transfer coin
//2: connected to the impBlock, our source of connection to the blockchain in order to automaticly confirm transactions

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract RequestPrice is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    uint256 public price;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    constructor() {
        setPublicChainlinkToken();
        oracle = 0xc57B33452b4F7BB189bB5AfaE9cc4aBa1f7a4FD8; //chainlink node
        jobId = "d5270d1c311941d0b08bead21fea7747"; //job for the node to run
        fee = 0.1 * 10 ** 18; 
    }

    /**
     * Create a Chainlink request to retrieve API response, find the target
     * data.
     */
    function requestPriceData() public returns (bytes32 requestId)
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);


        // Set the URL to perform the GET request on
        request.add("get", "https://min-api.cryptocompare.com/data/generateAvg?fsym=BTC&tsym=USD&e=Kraken"); //change the url to imp block to confirm orders

        // Specify the path for retrieving the data
        request.add("path", "RAW.PRICE"); //not needed
        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }

      /**
     * Callback Function
     */
    function fulfill(bytes32 _requestId, uint256 _price) public recordChainlinkFulfillment(_requestId)
    {
        price = _price;
    }
}