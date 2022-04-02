
import {useState} from 'react';

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
    const [owner_address, set_owner_address] = useState()
    
    const getBalance = async () => {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const balance = await contract.balanceOf(account);
        console.log(parseInt(balance));
        setBalance(parseInt(balance));
    }

    getBalance();

    const getOwner = () => {
        const owner = contract.get_owner();
        owner.then((result) => {
        console.log(result);
        set_owner_address(result);
    }).catch(err=>console.log(err));
    }

    return (
        <div>
            <h5>Your Balance: {balance}</h5>
            <button onClick={getOwner}>show owner address</button>
            <h5>Owner: {owner_address}</h5>
        </div>
    );
};
   

function balance_of(address) {
    pass
}

function BuyCredit() {
    // put buy logic here with wyre api

    // create a special only owner transfer to the metamask account
    const buying = () => {
        //console.log("buying diseable... working on it")
        const owner = contract.get_owner();
        owner.then((result) => {
        console.log(result);
        set_owner_address(result);
        }).catch(err=>console.log(err));
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