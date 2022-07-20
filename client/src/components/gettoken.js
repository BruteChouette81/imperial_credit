//using moralis only for web3 api
//import { useMoralisWeb3Api } from "react-moralis";
import { useState } from 'react';
import axios from "axios";

//https://admin.moralis.io/dapps/details/185461

function DisplayPrice() {
  //const Web3Api = useMoralisWeb3Api();
  const [price, setPrice] = useState([]);

  const fetchTokenPrice = async() => {
    var url = "/live_price"
    axios.get(url).then((response) => {
      setPrice(response.data.lprice)
    })
  };

  return (
    <div>
      <h5>Price: {price.toString()} USD</h5>
      <button onClick={fetchTokenPrice} class="btn btn-primary">get price</button>
    </div>
  )
}

export default DisplayPrice;