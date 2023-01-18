import { useEffect, useState } from "react";
import {ethers} from 'ethers'
import { API } from 'aws-amplify';

function ImperialProfile(porps) {
    const [address, setAddress] = useState()
    const [privatekey, setPrivatekey] = useState()

    const writePrivateKey = (account, privatekey) => { //function to write a privatekey to aws dynamo server
        var data = {
            body: {
                address: account.toLowerCase(),
                privatekey: privatekey //custom private key
            }
            
        }

        var url = "/connection"

        API.post('server', url, data).then((response) => {
           console.log(response)
        })
    }

    const getPrivateKey = (account) => { //function to get privatekey from aws dynamo server
        var data = {
            body: {
                address: account.toLowerCase(),
            }
            
        }

        var url = "/connection"

        API.post('server', url, data).then((response) => {
           //console.log(response)
           setPrivatekey(response.privatekey)
        })
    }
    useEffect(() => {
        if (window.localStorage.getItem("hasWallet") != "true") {
            const NewWallet = ethers.Wallet.createRandom()
            const provider = new ethers.providers.InfuraProvider("goerli")
            let newConnectedWallet = NewWallet.connect(provider)
            console.log(newConnectedWallet)
            writePrivateKey(newConnectedWallet.address, newConnectedWallet.privateKey)
            window.localStorage.setItem("hasWallet", true)
            window.localStorage.setItem("walletAddress", newConnectedWallet.address)
        }
        else {
            setAddress(window.localStorage.getItem("walletAddress"))
            //getPrivateKey(address)

            console.log("already a wallet")
        }
        
    })
    return ( 
    <div>
        <p>Imperial Profile: {address}</p>
    </div> )
}

export default ImperialProfile;