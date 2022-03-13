
import {useState } from 'react';

import { ethers } from 'ethers';
import Credit from '../artifacts/contracts/token.sol/credit.json';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(contractAddress, Credit.abi, signer);

/* 
add background imperial 

1: explain + info

2: when connect --> balance (on menu)

3: buy the token 
    a) with fiat currenties 
    b) with ethereum

*/
function ShowBalance() {

    const [balance, setBalance] = useState();
    
    const getBalance = async () => {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log(account)
        const balance = await contract.balanceOf(account);
        setBalance(balance);
    }

    getBalance();

    return (
        <div>
            <h5>Your Balance: {balance}</h5>
        </div>
    )
};

function BuyCredit() {
    // put buy logic here with wyre api

    const buying = () => {
        console.log("buying diseable... working on it")
    }
    return (
        <div>
            <h1>Buy the token with wyre and hold them on Metamask!</h1>
            <button onClick={buying}>Buy credit</button>
        </div>
    )
};

function Home() {
    return(
        <div>
            <ShowBalance />

            <BuyCredit />
        </div>
    )

}

/// function display text
export default Home;