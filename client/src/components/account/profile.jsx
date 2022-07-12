import {useState, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';

import Credit from '../../artifacts/contracts/token.sol/credit.json';
import default_profile from "./profile_pics/default_profile.png"

import "./css/profile.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import Install from '../install';
import DisplayActions from './controle';
import Settings from './setting';


const contractAddress = '0xD3afbEFD991776426Fb0e093b1d9e33E0BD5Cd71';

//0x5FbDB2315678afecb367f032d93F642f64180aa3
const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(contractAddress, Credit.abi, signer);
//4C62fC52D5Ad4c827feb97684bA612288eE9507

//paste parameters to connect with the good address
//TODO: create a function that can get information from etherscan (graph, holders, price, transaction(actions?)) 
function AutoRefresh( t ) {
    setTimeout("location.reload(true);", t);
}

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
    const [money, setMoney] = useState();
    
    const getBalance = async () => {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log(account)
        const balance = await contract.balanceOf(account);
        //console.log(parseInt(balance))
        setBalance(parseInt(balance));
        let url = "/live_money"
        let data = {
            numToken: parseInt(balance)
        }

        axios.post(url, data).then((response) => {
            //console.log(response.data.profit)
            var usdMoney = response.data.money
            //console.log(usdMoney)
            setMoney(parseFloat(usdMoney))
        })

    }

    return (
        <div>
            <h5>Your Balance: {balance} $CREDIT, ({money} $ USD)</h5>
            <button onClick={getBalance} class="btn btn-primary">get balance</button>
        </div>
    )
};

function Profile() {
    const [back, setBack] = useState('white')
    const [img, setImg] = useState('white')
    const [custimg, setCustimg] = useState(false)
    const [address, setAddress] = useState("")
    const [balance, setBalance] = useState();
    const [money, setMoney] = useState()

    //useEffect(() => {alert("Starting the webapp... need to connect to Metamask");})
    const getBalance = async () => {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const balance = await contract.balanceOf(account);
        setBalance(parseInt(balance));
        let url = "/live_money"
        let data = {
            numToken: parseInt(balance)
        }

        axios.post(url, data).then((response) => {
            //console.log(response.data.profit)
            var usdMoney = response.data.money
            //console.log(usdMoney)
            setMoney(parseFloat(usdMoney))
        })
    }

    const getAddress = async () => {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAddress(account)
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
        }).then(info => {
            setBack(info.bg);
            setImg(info.img);
            setCustimg(info.cust_img)

        }).catch(error => {
            console.error("Error: ", error)
        })
    }

    useEffect(() => {
        getBalance();
        getAddress();
    })
    if (window.ethereum) {

        if (custimg === true) {
            return(
                <div class='profile'>
                    <div class='settingdiv'>
                        <Settings />
                    </div>
                    <div class='banner' style={{backgroundColor: back}}>
                        <img alt="" src={require(`../../../server/uploads/${address}.jpg`)} id="profile_img" />
                    </div>
                    <ShowAccount />
                    <ShowBalance />
                    <br />
                    <DisplayActions balance={balance} livePrice={money} />

                    
                </div>
            )
        }
        
        else {
            return(
                <div class='profile'>
                    <div class='banner' style={{backgroundColor: back}}>
                        <img alt="" src={default_profile} id="profile_img" style={{backgroundColor: img}} />
                    </div>
                    <Settings />
                    <ShowAccount />
                    <ShowBalance />
                    <br />
                    <DisplayActions balance={balance}/>

                    
                </div>
            )
        }
    } else {
        return <Install />
  }
}

export default Profile;
