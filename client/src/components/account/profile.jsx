import {useState, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import { API , Storage} from 'aws-amplify';


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

const getBalance = async(account, setBalance, setMoney, credits) => {
    
    const userbalance = await credits.balanceOf(account);
    setBalance(parseInt(userbalance));
    let url = "/liveMoney"
    let data = {
        body: {
            numToken: parseInt(userbalance)
        }
        
            
    }

    API.post('server', url, data).then((response) => {
            var usdMoney = response.money
    })

    setMoney(parseInt(userbalance * 0.00005))
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

    if (window.screen.width > 900) {
        return (
            <div>
                <h5>Your Account: <strong>{account}</strong></h5>
            </div>
        )
    }

    else {
        return (
            <div>
                <h5>Your Account: <strong>{account?.slice(0,10)}...</strong></h5>
            </div>
        )
    }

    


};
function ShowBalance(props) {

    const [balance, setBalance] = useState(0);
    const [money, setMoney] = useState(0);

    const loadMarket = () => {
        window.location.replace("/market")
    }
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
            <h5>Your Balance: <strong>{balance / 100000} $CREDIT, ({money / 100000} $ USD)</strong></h5>
            <button onClick={() => {getBalance(props.account, setBalance, setMoney, props.credits)}} class="btn btn-primary" id='profile-info-balance'>Reload balance</button>
            <br />
            <br />
            <button onClick={loadMarket} class="btn btn-primary" id='profile-info-balance'>Connect market - New! </button>
        </div>
    )
};

function ShowUsername(props) {
    //function to get the custom username from the database
    return ( <div>
                <h5>Connected as: {props.name}</h5>
            </div>
     )
}

function ShowDescription(props) {
    return (
        <div>
            <h5>Bio: {props.description}</h5>
        </div>
    )
}

function Profile(props) {
    const [back, setBack] = useState('white')
    const [img, setImg] = useState('white')
    const [custimg, setCustimg] = useState(false)
    const [address, setAddress] = useState("")
    const [balance, setBalance] = useState(0);
    const [money, setMoney] = useState(0)
    const [image, setImage] = useState("")
    const [name, setName] = useState("")
    const [request, setRequest] = useState()
    const [friendList, setFriendList] = useState()
    const [description, setDescription] = useState()
    const [pay, setPay] = useState()

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
        //const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAddress(props.account.toLowerCase()) //replace default_profile with image
        var data = {
            body: {
                address: props.account.toLowerCase(),
                privatekey: ""
            }
            
        }

        var url = "/connection"

        API.post('server', url, data).then((response) => {
            console.log(response)
            setBack(response.bg);
            setImg(response.img);
            setCustimg(response.cust_img);
            setName(response.name)
            setRequest(response.request)
            setFriendList(response.friend)
            setDescription(response.description)
            setPay(response.pay)
            

        })
    }

    useEffect(() => {
        async function boot() {
            await connect();
            await getBalance(props.account, setBalance, setMoney, props.credit);
            
        }
        window.localStorage.setItem("usingMetamask", true)
        boot()
            
        
    }, [])
    if (window.ethereum) {

        if (custimg === true) {
            //
            //
            getImage();
            //console.log(image)
            return(
                <div class='profile'>
                    <div class='settingdiv'>
                    </div>

                    <div class='banner' style={{backgroundColor: back}}>
                        <img alt="" src={image} id="profile_img" />
                    </div>
                    <div class="profile-info">
                        <h4 id="profile-info-tag">personnal information: </h4>
                        <Settings address={props.account}/>
                        
                        <ShowAccount />
                        <ShowUsername name={name}/>
                        <ShowDescription description={description} />
                        <ShowBalance account={props.account} credits={props.credit} />
                    </div>
                    <br />
                    <DisplayActions balance={0} livePrice={money} request={request} friendList={friendList} account={props.account.toLowerCase()} pay={pay} did={props.did} />

                    
                </div>
            )
        }
        
        else {
            return(
                <div class='profile'>
                    <div class='settingdiv'>
                    </div>
                    <div class='banner' style={{backgroundColor: back}}>
                        <img alt="" src={default_profile} id="profile_img" style={{backgroundColor: img}} />
                    </div>
                    <div class="profile-info">
                        <h4 id="profile-info-tag">personnal information:</h4>
                        <Settings />

                        <ShowAccount />
                        <ShowUsername name={name}/>
                        <ShowBalance account={props.account} credits={props.credit} />
                    </div>
                    <br />
                    <DisplayActions balance={balance} livePrice={money} request={request} friendList={friendList} account={props.account.toLowerCase()} pay={pay} did={props.did}/>

                    
                </div>
            )
        }
    } else {
        return <Install />
  }
}

export default Profile;
