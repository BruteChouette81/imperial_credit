//using moralis only for web3 api
import { useMoralisWeb3Api } from "react-moralis";
import { useState } from 'react';

//https://admin.moralis.io/dapps/details/185461

function DisplayPrice() {
  const Web3Api = useMoralisWeb3Api();
  const [price, setPrice] = useState([]);

  const fetchTokenPrice = async() => {
      //Get metadata for an array of tokens. Ex: USDT and USDC tokens on BSC
      const options = {
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        chain: "eth",
      };
      const price = await Web3Api.token.getTokenPrice(options);
      console.log(price["usdPrice"]);
      setPrice(price["usdPrice"])
  };

  return (
    <div>
      <h5>Price: {price.toString()} USD</h5>
      <button onClick={fetchTokenPrice} class="btn btn-primary">get price</button>
    </div>
  )
}

export default DisplayPrice;