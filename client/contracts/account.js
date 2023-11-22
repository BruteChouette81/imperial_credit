/*
This file is for research only. the official file is in a production build.
*/

import { useEffect, useState } from "react";
import {ethers} from 'ethers'
import { API, Storage } from 'aws-amplify';
import { AES, enc } from "crypto-js"

import default_profile from "../profile_pics/default_profile.png"
import ReactLoading from "react-loading";


import Credit from '../../../artifacts/contracts/credits2.sol/credits2.json';
import DiD from '../../../artifacts/contracts/DiD.sol/DiD.json';
import AMMABI from '../../../artifacts/contracts/AMM.sol/AMM.json'
import DDSABI from '../../../artifacts/contracts/DDS.sol/DDS.json'
import realabi from '../../../artifacts/contracts/Real.sol/Real.json'

import "../css/profile.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import DisplayActions from '../controle';
import Settings from '../setting';

const contractAddress = '0xc183177E3207788ea9342255C8Fcb218763d46e2';
const DiDAddress = "0x6f1d3cd1894b3b7259f31537AFbb930bd15e0EB8"; //goerli

const Credit_AMM = '0xcAd1B86F5022A138053577ae03Ab773Ee770ec21'; 
const DDSADDr = '0xabF75FC997bdF082D1d22E5Da6701C56e8A356D2';
const ImperialRealAddress = '0xbC1Fe9f6B298cCCd108604a0Cf140B2d277f624a'

//load a contract
const getContract = (signer, abi, address) => {
    // get the end user
    console.log(signer)
    // get the smart contract
    const contract = new ethers.Contract(address, abi, signer);
    return contract
}

const [credit, setCredit] = useState()
const [tether, setTether] = useState()
const [did, setDid] = useState()
const [amm, setAmm] = useState()
//const [address, setAddress] = useState()
const [privatekey, setPrivatekey] = useState()
const [ needPassword, setNeedPassword ] = useState(true)
const [ profileLoading, setProfileLoading ] = useState(true)
const [password, setPassword] = useState("")
let passwordInp = ""


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

const [firstConnect, setFirstConnect] = useState(false)
const [fullname, setFullname] = useState("")
const [email, setEmail] = useState("")
const [fname, setFname] = useState("")
const [lname, setLname] = useState("")
const [country, setCountry] = useState("")
const [city, setCity] = useState("")
const [state, setState] = useState("")
const [street, setStreet] = useState("")
const [code, setCode] = useState("")
const [phone, setPhone] = useState("")

   
//decypher hash account using password
const connectUsingPassword = async (e) => {
    e.preventDefault()
    
    console.log(passwordInp)
    setPassword(passwordInp)
    const hasWallet = window.localStorage.getItem("hasWallet")
    //setAddress(window.localStorage.getItem("walletAddress"))
    await connection(hasWallet);
}


function GetPassword() {
}

//write a hash DiD account 
const writedId = async () => {
    //alert("writting your DID")
    if (window.localStorage.getItem("usingMetamask") === "true") {
        alert("Error... deconnecter votre compte Metamask...")
    }
    else {
        const NewWallet = ethers.Wallet.createRandom()
        const provider = new ethers.providers.InfuraProvider("goerli")
        let newConnectedWallet = NewWallet.connect(provider)
        console.log(newConnectedWallet.privateKey)
        writePrivateKey(newConnectedWallet.address, newConnectedWallet.privateKey) //writting pk to did
        window.localStorage.setItem("hasWallet", true)
        window.localStorage.setItem("walletAddress", newConnectedWallet.address)
        setFullname(fname + " " + lname)

        //console.log(props.signer)
        const data = {
            address: newConnectedWallet.address,
            pk: newConnectedWallet.privateKey,
            first_name: fname,
            last_name: lname,
            email: email,
            mobileNumber: phone, //"+19692154942"
            dob: "1994-11-26", // got to format well
            address: {
                addressLine1: street,
                city: city,
                state: state,
                postCode: code,
                countryCode: country
            }
        }
        console.log(data)

        let stringdata = JSON.stringify(data)
        //let bytedata = ethers.utils.toUtf8Bytes(stringdata)

        //console.log(props)
        console.log(password)
        var encrypted = AES.encrypt(stringdata, password)
        //hash the data object and store it in user storage
        //ethers.utils.computeHmac("sha256", key, bytedata)
        
            
        window.localStorage.setItem("did", encrypted);
        alert("Compte enregistré ! Bienvenue !")
    }

    
}

//save your did using a component 
const saveId = async(event) => {
    event.preventDefault()
    //create a user ID. For now it will be IdCount
    //const id = parseInt( await props.did.idCount()) + 1
    //let key = Math.floor(Math.random() * 10000001); //0-10,000,000
    //window.localStorage.setItem("key", key)
    //window.localStorage.setItem("id", parseInt(id))
    //console.log(parseInt(id), 1, city, state, code, country, street, phone, email, fname, lname)
    //params: uint id, uint _key, string memory _city, string memory _state, string memory _postalCode, string memory _country, string memory _street1, string memory _phone, string memory _email, string memory _name, string memory _lastname
    if (city !== "" && state !== "" && code !== "" && country !== "" && street !== "" && phone !== "" && email !== "" && fname !== "" && lname !== "") {
        writedId()  
    }
    else {
        alert("Vous devez entrer vos informations... Veuiller réessayer...")
    }
    
    
    
}

    
//create your crypto hash account
const writePrivateKey = (account, privatekey) => { //function to write infos to aws dynamo server
    
    const did_data = {
        address: account,
        pk: privatekey.toString()
    }

    let stringdata = JSON.stringify(did_data)
    var encrypted = AES.encrypt(stringdata, password)
    window.localStorage.setItem("did", encrypted);


    var data = {
        body: {
            address: account.toLowerCase(),
            privatekey: "" //set did to "" for new accounts
        }
    }
    setPrivatekey(privatekey)

    var url = "/connection"
    const provider = new ethers.providers.InfuraProvider("goerli")

    API.post('', url, data).then(async (response) => {
        console.log(response)
        

        //change user privatekey to the json
        let userwallet = new ethers.Wallet(privatekey, provider) //response.privatekey
        console.log(userwallet)
        //let userwallet = new ethers.Wallet.fromEncryptedJson(response.privatekey, password)

        let contract = getContract(userwallet, Credit, contractAddress)
        

        setSigner(userwallet)
        

        let AMMContract = getContract(userwallet, DDSABI, DDSADDr)
        setAmm(AMMContract)
        setFirstConnect(false)
        setProfileLoading(false)
        //alert("Bienvenue sur ! Il ne vous reste qu'à vous créer une Identité Decentralizée pour accèder à l'Atelier!")

    })
}

const getPrivateKey = async(account, privatekey) => { //function to get infos from aws dynamo server
    var data = {
        body: {
            address: account?.toLowerCase()
        }
    }

    var url = "/connection"

    const provider = new ethers.providers.InfuraProvider("goerli")
    //const binanceProvider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org/")

    API.post('serverv2', url, data).then(async (response) => {
       

        //change user privatekey to the json
        let userwallet = new ethers.Wallet(privatekey, provider) //response.privatekey
        console.log(userwallet)
        //let userwallet = new ethers.Wallet.fromEncryptedJson(response.privatekey, password)

        setSigner(userwallet)

        let AMMContract = getContract(userwallet, DDSABI, DDSADDr)
        setAmm(AMMContract)
        setProfileLoading(false)

        
    })
    try {
        API.get('serverv2', "/getOracleAddr").then((response) => {
            console.log(response);
        }).catch((e) => {
            console.log(e)
        })
    } catch (e) {
        console.log(e)
    }
    

}

//decypher hash DID account
const connection = async(haswallet) => {
    if (haswallet !== "true") {
        
        setFirstConnect(true)
        setNeedPassword(false)
    }
    else {
        window.localStorage.setItem("usingMetamask", false)
        let did = window.localStorage.getItem("did")
        let res1 = AES.decrypt(did, passwordInp) //props.signer.privateKey
        try {
            let res = JSON.parse(res1.toString(enc.Utf8));
            if (res.pk) {
                if (!window.sessionStorage.getItem("password")) {
                    window.sessionStorage.setItem("password", passwordInp)
                    window.location.reload()
                }
                window.sessionStorage.setItem("password", passwordInp)
                getPrivateKey(window.localStorage.getItem("walletAddress"), res.pk)
                if (res.email) {
                    setEmail(res.email)
                    setFullname(res.first_name + " " + res.last_name)
                }
                setNeedPassword(false)

            } else {
                alert("mauvais mot de passe")
            }
        } catch(e) {
            alert("mauvais mot de passe");
        }
        
        
        //
        
        //console.log("already a wallet")
    }
}

//boot an account
async function boot() {
           
    if(window.sessionStorage.getItem("password")) {
                setNeedPassword(false);
                passwordInp = window.sessionStorage.getItem("password");
                setPassword(passwordInp)
                connection("true")


        }
    }
