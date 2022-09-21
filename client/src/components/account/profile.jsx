import {useState, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import { API , Storage} from 'aws-amplify';


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


const contractAddress = '0x6CFADe18df81Cd9C41950FBDAcc53047EdB2e565';
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
    const userbalance = await contract.balanceOf(account);
    setBalance(parseInt(userbalance));
    let url = "/liveMoney"
    let data = {
        body: {
            numToken: parseInt(userbalance)
        }
        
            
    }

    API.post('server', url, data).then((response) => {
            var usdMoney = response.money
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
            <h5>Your Account: <strong>{account}</strong></h5>
        </div>
    )


};
function ShowBalance() {

    const [balance, setBalance] = useState(0);
    const [money, setMoney] = useState(0);
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
            <h5>Your Balance: <strong>{balance} $CREDIT, ({money} $ USD)</strong></h5>
            <button onClick={() => {getBalance(setBalance, setMoney)}} class="btn btn-primary" id='profile-info-balance'>Reload balance</button>
        </div>
    )
};

function Profile() {
    const [back, setBack] = useState('white')
    const [img, setImg] = useState('white')
    const [custimg, setCustimg] = useState(false)
    const [address, setAddress] = useState("")
    const [balance, setBalance] = useState(0);
    const [money, setMoney] = useState(0)
    const [image, setImage] = useState("https://r.search.yahoo.com/_ylt=AwrO.WND2PRiTGUXNtPtFAx.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkA2YyOTIzYjI3Mzg2NTdjYTU1ZGRhNGYyODdlYzhhNzgxBGdwb3MDOQRpdANiaW5n/RV=2/RE=1660242115/RO=11/RU=https%3a%2f%2ffabiolasickler.blogspot.com%2f2021%2f01%2fcool-epic-minecraft-background-free.html/RK=2/RS=RImunFNkEkRNl6fzhVNrZH5yPes-")

    //useEffect(() => {alert("Starting the webapp... need to connect to Metamask");})
    function setS3Config(bucket, level) {
        Storage.configure({
            bucket: bucket,
            level: level,
            region: "ca-central-1",
            identityPoolId: 'ca-central-1:85ca7a33-46b1-4827-ae75-694463376952'
        })
    }

    const getImage = async () => {
        setS3Config("clientbc6cabec04d84d318144798d9000b9b3205313-dev", "public")
        const file = await Storage.get(`${address}.png`) //add ".png"    `${address}.png` {download: true}
        setImage(file)
    }
    
    const connect = async () => {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAddress(account) //replace default_profile with image
        var data = {
            body: {
                address: account
            }
            
        }
        var url = "/connection"

        API.post('server', url, data).then((response) => {
            console.log(response)
            setBack(response.bg);
            setImg(response.img);
            setCustimg(response.cust_img);
        })
    }

    useEffect(() => {
        async function boot() {
            await connect();
            await getBalance(setBalance, setMoney);
        }
        boot()
            
        
    }, [])
    if (window.ethereum) {

        if (custimg === true) {
            //
            //
            getImage();
            console.log(image)
            return(
                <div class='profile'>
                    <div class='settingdiv'>
                        <Settings />
                    </div>
                    <div class='banner' style={{backgroundColor: back}}>
                        <img alt="" src={image} id="profile_img" />
                    </div>
                    <div class="profile-info">
                        <h4 id="profile-info-tag">personnal information:</h4>
                        <ShowAccount />
                        <ShowBalance />
                    </div>
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
