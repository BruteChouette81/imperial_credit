import { useEffect, useState } from "react";
import {ethers} from 'ethers'
import { API, Storage } from 'aws-amplify';

import default_profile from "../profile_pics/default_profile.png"

import Credit from '../../../artifacts/contracts/token.sol/credit.json';
import DiD from '../../../artifacts/contracts/DiD.sol/DiD.json';

import "../css/profile.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import DisplayActions from '../controle';
import Settings from '../setting';

const contractAddress = '0x6CFADe18df81Cd9C41950FBDAcc53047EdB2e565';
const DiDAddress = "0x6f1d3cd1894b3b7259f31537AFbb930bd15e0EB8"; //goerli

const getContract = (signer, abi, address) => {
    // get the end user
    console.log(signer)
    // get the smart contract
    const contract = new ethers.Contract(address, abi, signer);
    return contract
}

const getBalance = async(account, setBalance, setMoney, credits) => {
    const userbalance = await (await credits).functions.balanceOf(account)
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

function ShowAccount(props) {
    if (window.screen.width > 900) {
        return (
            <div>
                <h5>Your Account: <strong>{props.account}</strong> {props.level === 0 ? (<span class="badge bg-secondary"><a href={`/subs/${props.account}`}>Basic</a> </span>) : props.level === 1 ? (<span class="badge bg-info"><a href={`/subs/${props.account}`}>Premium</a></span>) : props.level === 2 ? (<span class="badge bg-warning">Expert</span>) : props.level === 3 ? (<span class="badge bg-success">Verified</span>) : ""}</h5>
            </div>
        )
    }

    else {
        return (
            <div>
                <h5>Your Account: <strong>{props.account?.slice(0,10)}...</strong> {props.level === 0 ? (<span class="badge bg-secondary"><a href={`/subs/${props.account}`}>Basic</a> </span>) : props.level === 1 ? (<span class="badge bg-info"><a href={`/subs/${props.account}`}>Premium</a></span>) : props.level === 2 ? (<span class="badge bg-warning">Expert</span>) : props.level === 3 ? (<span class="badge bg-success">Verified</span>) : ""} </h5>
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


function ImperialProfile() {
    const [credit, setCredit] = useState()
    const [did, setDid] = useState()
    //const [address, setAddress] = useState()
    const [privatekey, setPrivatekey] = useState()
    const [ needPassword, setNeedPassword ] = useState(true)
    const [password, setPassword] = useState("")

    const [back, setBack] = useState('white')
    const [img, setImg] = useState('white')
    const [custimg, setCustimg] = useState(false)
    const [balance, setBalance] = useState(0);
    const [money, setMoney] = useState(0)
    const [image, setImage] = useState("")
    const [name, setName] = useState("")
    const [request, setRequest] = useState()
    const [friendList, setFriendList] = useState()
    const [description, setDescription] = useState()
    const [pay, setPay] = useState()
    const [realPurchase, setRealPurchase] = useState()
    const [level, setLevel] = useState(0)
    const [signer, setSigner] = useState()

    const changePass = (event) => {
        setPassword(event.target.value)
    }

    const connectUsingPassword = (e) => {
        e.preventDefault()
        setNeedPassword(false)
    }

    function GetPassword() {
        return ( <div class="getPassword">
            <form onSubmit={connectUsingPassword}> 
                <h3>Setup or enter your password</h3>
                <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-2 col-form-label" onChange={changePass}>Password</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" id="inputPassword"/>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary mb-3">Connect</button>
            </form>
        </div> )
    }
    
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
        const file = await Storage.get(`${signer?.address.toLowerCase()}.png`) //add ".png"    `${address}.png` {download: true}
        setImage(file)
    }

    const writePrivateKey = (account, privatekey) => { //function to write a privatekey to aws dynamo server
        console.log(privatekey)
        var data = {
            body: {
                address: account.toLowerCase(),
                privatekey: privatekey.toString() //custom private key
            }
            
        }
        setPrivatekey(privatekey)

        var url = "/connection"

        API.post('server', url, data).then((response) => {
           console.log(response)
        })
    }

    const getPrivateKey = async(account) => { //function to get privatekey from aws dynamo server
        var data = {
            body: {
                address: account?.toLowerCase()
            }
        }

        var url = "/connection"

        const provider = new ethers.providers.InfuraProvider("goerli")
        API.post('server', url, data).then((response) => {
            setBack(response.bg);
            setImg(response.img);
            setCustimg(response.cust_img);
            setName(response.name)
            setRequest(response.request)
            setFriendList(response.friend)
            setDescription(response.description)
            setPay(response.pay)
            setRealPurchase(response.realPurchase)
            setLevel(response.level)
    
            //change user privatekey to the json
            let userwallet = new ethers.Wallet(response.privatekey, provider)
            //let userwallet = new ethers.Wallet.fromEncryptedJson(response.privatekey, password)
            let contract = getContract(userwallet, Credit.abi, contractAddress)
            setSigner(userwallet)
            //getBalance(account, setBalance, setMoney, contract); only connected to mainnet
            setCredit(contract)
            let diD = getContract(userwallet, DiD.abi, DiDAddress)
            console.log(diD)
            setDid(diD)

           
        })
    
    }

    const connection = async(haswallet) => {
        if (haswallet !== "true") {
            const NewWallet = ethers.Wallet.createRandom()
            const provider = new ethers.providers.InfuraProvider("goerli")
            let newConnectedWallet = NewWallet.connect(provider)
            console.log(newConnectedWallet.privateKey)
            writePrivateKey(newConnectedWallet.address, newConnectedWallet.privateKey) //newConnectedWallet.encrypt(password)
            window.localStorage.setItem("hasWallet", true)
            window.localStorage.setItem("walletAddress", newConnectedWallet.address)
        }
        else {
            window.localStorage.setItem("usingMetamask", false)
            getPrivateKey(window.localStorage.getItem("walletAddress"))
            
            //console.log("already a wallet")
        }
    }
    useEffect(() => {
        
        async function boot() {
            const hasWallet = window.localStorage.getItem("hasWallet")
            //setAddress(window.localStorage.getItem("walletAddress"))
            await connection(hasWallet);
            
        }
        boot()
        
    }, [])

    if (custimg === true) {
        //
        //
        getImage();
        //console.log(image)
        // {needPassword ? "set password " : div: Profile}
        return(
            <div class='profile'>
                <div class='settingdiv'>
                </div>

                <div class='banner' style={{backgroundColor: back}}>
                    <img alt="" src={image} id="profile_img" />
                </div>
                <div class="profile-info">
                    <h4 id="profile-info-tag">personnal information: </h4>
                    <Settings address={signer?.address}/>
                    
                    <ShowAccount account={signer?.address} level={level} />
                    <ShowUsername name={name}/>
                    <ShowDescription description={description} />
                    <ShowBalance account={signer?.address} credits={credit} />
                </div>
                <br />
                <DisplayActions balance={balance} livePrice={money} request={request} friendList={friendList} signer={signer} account={signer?.address} pay={pay}  did={did} realPurchase={realPurchase}/>

                
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
                    <Settings address={signer?.address} />

                    <ShowAccount account={signer?.address} level={level} />
                    <ShowUsername name={name}/>
                    <ShowDescription description={description} />
                    <ShowBalance account={signer?.address} credits={credit} />
                    
                </div>
                <br />
                <DisplayActions balance={balance} livePrice={money} request={request} friendList={friendList} signer={signer} account={signer?.address} pay={pay} did={did} realPurchase={realPurchase}/>

                
            </div>
        )
    }
}

export default ImperialProfile;