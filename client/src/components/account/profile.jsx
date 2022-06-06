import {useState, useEffect } from 'react';

import { ethers } from 'ethers';
import Credit from '../../artifacts/contracts/token.sol/credit.json';
import default_profile from "./default_profile.png"
import "./css/profile.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import Install from '../install';
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
            <h5>Your Balance: {balance} $CREDIT, (0 USD)</h5>
            <button onClick={getBalance} class="btn btn-primary">get balance</button>
        </div>
    )
};

function Profile() {
    const [test, setTest] = useState(null)

    //useEffect(() => {alert("Starting the webapp... need to connect to Metamask");})
    const getAddress = async () => {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        fetch("/connection", {
        
            // Adding method type
            method: "POST",
            
            // Adding body or contents to send
            body: JSON.stringify({
                address: account
            }),
            
            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }) //, {mode:"no-cors"}
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            throw res;
        }).then(test => {
            setTest(test.bg);
        }).catch(error => {
            console.error("Error: ", error)
        })
    }

    useEffect(() => {
        getAddress();
    })
    if (window.ethereum) {
        
        return(
            <div class='profile'>
                <div class='banner'>
                    <img alt="" src={default_profile} id="profile_img" />
                </div>
                <p>background: {test}</p>
                <ShowAccount />
                <ShowBalance />
                
            </div>
        )
    } else {
        return <Install />
  }
}

export default Profile;