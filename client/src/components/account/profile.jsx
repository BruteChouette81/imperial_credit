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



//"Technoblade never dies..."
//RIP Technoblade


const contractAddress = '0xD3afbEFD991776426Fb0e093b1d9e33E0BD5Cd71';
//put the contract address in each file needed

//0x5FbDB2315678afecb367f032d93F642f64180aa3

//4C62fC52D5Ad4c827feb97684bA612288eE9507
const getContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // get the end user
    const signer = provider.getSigner();

    // get the smart contract
    const contract = new ethers.Contract(contractAddress, Credit.abi, signer);
    return contract
}

const getBalance = async(setBalance, setMoney) => {
    const contract = getContract()
    const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const balance = await contract.balanceOf(account);
    setBalance(parseInt(balance));
    let url = "/live_money"
    let data = {
            numToken: parseInt(balance)
    }

    axios.post(url, data).then((response) => {
            var usdMoney = response.data.money
            setMoney(parseFloat(usdMoney))
    })
}

function ShowAccount() {

    const [account, setAccount] = useState();
    const getAccount = async () => {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(account)
    };
    useEffect(() => {
        getAccount();
    })

    return (
        <div>
            <h5>Your Account: {account}</h5>
        </div>
    )


};
function ShowBalance() {

    const [balance, setBalance] = useState();
    const [money, setMoney] = useState();
    /*
    const getBalance = async () => {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });

        const balance = await contract.balanceOf(account);
        setBalance(parseInt(balance));
        let url = "/live_money"
        let data = {
            numToken: parseInt(balance)
        }

        axios.post(url, data).then((response) => {
            var usdMoney = response.data.money
            setMoney(parseFloat(usdMoney))
        })

    }
    */
    return (
        <div>
            <h5>Your Balance: {balance} $CREDIT, ({money} $ USD)</h5>
            <button onClick={() => {getBalance(setBalance, setMoney)}} class="btn btn-primary">get balance</button>
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
    
    const connect = async () => {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAddress(account)
        var data = {
            address: account
        }
        var url = "/connection"

        axios.post(url, data).then((response) => {
            setBack(response.data.bg);
            setImg(response.data.img);
            setCustimg(response.data.cust_img);
        })
    }

    useEffect(() => {
        connect();
        getBalance(setBalance, setMoney);
        
    }, [])
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
                    <div class='settingdiv'>
                        <Settings />
                    </div>
                    <div class='banner' style={{backgroundColor: back}}>
                        <img alt="" src={default_profile} id="profile_img" style={{backgroundColor: img}} />
                    </div>
                    <ShowAccount />
                    <ShowBalance />
                    <br />
                    <DisplayActions balance={balance} livePrice={money}/>

                    
                </div>
            )
        }
    } else {
        return <Install />
  }
}

export default Profile;
