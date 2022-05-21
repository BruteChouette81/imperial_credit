import {useState, useEffect } from 'react';

import { ethers } from 'ethers';
import Credit from '../../artifacts/contracts/token.sol/credit.json';
import default_profile from "./default_profile.png"
import "./css/profile.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import Install from '../Install';
const contractAddress = '0xD3afbEFD991776426Fb0e093b1d9e33E0BD5Cd71';

//0x5FbDB2315678afecb367f032d93F642f64180aa3
const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(contractAddress, Credit.abi, signer);



function ShowAccount() {

    const [account, setAccount] = useState();

    const getAccount = async () => {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(account)
    };
    getAccount();

    return (
        <div>
            <h5>Your Account: {account}</h5>
        </div>
    )


};
function ShowBalance() {

    const [balance, setBalance] = useState();
    
    const getBalance = async () => {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log(account)
        const balance = await contract.balanceOf(account);
        console.log(parseInt(balance))
        setBalance(parseInt(balance));
    }

    return (
        <div>
            <h5>Your Balance: {balance} $CREDIT</h5>
            <button onClick={getBalance} class="btn btn-primary">get balance</button>
        </div>
    )
};

function Profile() {
    if (window.ethereum) {
        //console.log("i exist")
        useEffect(() => {
            alert("Starting the webapp... need to connect to Metamask");
        })
        
        return(
            <div class='profile'>
                <div class='banner'>
                    <img src={default_profile} id="profile_img" />
                </div>
                <ShowAccount />
                <ShowBalance />
            </div>
        )
    } else {
        return <Install />
  }
}

export default Profile;