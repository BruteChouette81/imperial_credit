import {useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { API , Storage} from 'aws-amplify';
import default_profile from "./profile_pics/default_profile.png"

import './css/market.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import abi from '../../artifacts/contracts/market.sol/market.json'
import erc721ABI from '../../artifacts/contracts/nft.sol/nft.json'
import Credit from '../../artifacts/contracts/token.sol/credit.json';

import NftBox from './nfts';

const MarketAddress = '0x710005797eFf093Fa95Ce9a703Da9f0162A6916C'; // goerli new test contract
const CreditsAddress = "0xD475c58549D3a6ed2e90097BF3D631cf571Bdd86" //goerli test contract
const NftAddress = '0x3d275ed3B0B42a7A3fCAA33458C34C0b5dA8Cc3A'; // goerli new test contract

const connectContract = (address, abi) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // get the end user
    const signer = provider.getSigner();

    // get the smart contract
    const contract = new ethers.Contract(address, abi, signer);
    return contract
}

const mintNFT = async (account) => {
    const nft = connectContract(NftAddress, erc721ABI.abi)
    const id = await nft.mint(account, "chad")
    console.log(id)
    const transac = await nft.ownerOf(id)
    console.log(transac)
}

//function to connect and get nft contract (form where you wether input the address and token id or let us scan your connected wallet)

const list = async (market, nftAddress, nftABI, tokenid, price, account) => {
    // price is in credit (5 decimals)

    try {
        const nft = connectContract(nftAddress, nftABI)
       

        //make the market approve to get the token
        await(await nft.approve(MarketAddress, tokenid)).wait()
        //add pending screem
    
        //create a new item with a sell order
        await(await market.listItem(nft.address, tokenid, price)).wait()
        const marketCountIndex = await market.itemCount()
        var data = {
            body: {
                address: account,
                itemid: parseInt(marketCountIndex),
                name: "first" //get the name in the form
            }
            
        }
        var url = "/listItem"

        API.post('server', url, data).then((response) => {
            console.log(response)
            alert("token listed!")
        })

        

    }
    catch {
        alert("Unable to connect to: " + nftAddress + ". Please make sure you are the nft owner! Error code - 1")
    }
   

}




function Market() {
    const [image, setImage] = useState(""); //empty string representation
    const [market, setMarket] = useState();
    const [credits, setCredits] = useState();
    const [account, setAccount] = useState("");
    const [connected, setConnected] = useState(false)
    const [items, setItems] = useState([])

    const [nftAddress, setNftAddress] = useState()
    const [tokenId, setTokenId] = useState()
    const [price, setPrice] = useState()
    const getAccount = async () => {
        const [address] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(address)
        setConnected(true)
        await getImage(address)
    };

    const onAddrChange = (event) => {
        setNftAddress(event.target.value)
    }

    const onIdChange = (event) => {
        setTokenId(event.target.value)
    }

    const onPriceChange = (event) => {
        setPrice(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        alert("connecting: " + nftAddress)

        //get metadata using moralis in app.js + loading screen
        list(market, nftAddress, erc721ABI.abi, tokenId, 1, account)


    }
    function setS3Config(bucket, level) {
        Storage.configure({
            bucket: bucket,
            level: level,
            region: "ca-central-1",
            identityPoolId: 'ca-central-1:85ca7a33-46b1-4827-ae75-694463376952'
        })
    }

    const getImage = async (address) => {
        setS3Config("clientbc6cabec04d84d318144798d9000b9b3205313-dev", "public")
        const file = await Storage.get(`${address}.png`) //add ".png"    `${address}.png` {download: true}
        setImage(file)
    }

    const configureMarket = () => {
        const marketContract = connectContract(MarketAddress, abi.abi) //
        setMarket(marketContract)
        console.log(marketContract)
        const creditsContract = connectContract(CreditsAddress, Credit.abi)
        setCredits(creditsContract)

        return marketContract
        
    }

    const getItems = async () => {
        const market = configureMarket()
        let itemsList = []
        const numItems = await market.itemCount()
        //console.log("numitems: " + numItems)
    
        //get the 10 most recent sell order
        if (numItems >= 10) {
            for( let i = 1; i<11; i++) {
                
                const item = await market.items(i) // (numItems - i)
                if(item.sold) {
                    continue
                }
                /*
                */
        
                else {
                    itemsList.push(item)
                }
                
            }
            return itemsList
        }

        else {
            for( let i = 1; i<=numItems; i++) {
                let item = await market.items(i)
                let newItem = {}

                if(item.sold) {
                    continue
                }
                else {
                    var data = {
                        body: {
                            address: item.seller.toLowerCase(),
                        }
                        
                    }
                    var url = "/getItems"

                    //console.log(typeof(item))
                    //console.log(item)
            
                    await API.post('server', url, data).then((response) => {
                        for(let i=0; i<=response.ids.length; i++) { //loop trought every listed item of an owner 
                            if (response.ids[i] == item.itemId) { // once you got the item we want to display:
                                newItem.itemId = item.itemId
                                newItem.price = item.price
                                newItem.seller = item.seller
                                newItem.name = response.names[i] //get the corresponding name
                                
                            }
                        }
                    })
                    itemsList.push(newItem)
                    
                }
                
            }
            
            
        }
        return itemsList
        
    
    }
    

    useEffect(() => {
        getAccount()
        //mintNFT(account)
        
        const itemslist = getItems()
        itemslist.then(res => {
            setItems(res)
            console.log(res[0])
            
        })
        

        
        //mintNFT(account) mint test nft
    }, [])

    //store everyone's name of items they are selling in the user database so its easier to get their nfts

    //make function to get specific items to see in "your items" tab so using the database, we can get all of an item and display it in the tab 

    //

    return(
        <div class="market">
            <div class="account">
                <img src={image} alt="" id='profilepic' /> <h6 id='account'>account: {account.slice(0,10) + "..."}</h6>
               { connected ? (<p id='connected' style={{color: "green"}}>connected</p>) : (<p id='connected' style={{color: "red"}}>disconnected</p>) }
               
              
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                sell your nfts 
                </button>

                
                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{color:"black"}}>
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Listing Your Nfts</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>sell order prequise: </p>
                            <form onSubmit={handleSubmit}>
                                <label for="addr">NFT Address:</label><br />
                                <input type="text" id="addr" name="addr" onChange={onAddrChange}/><br />
                                <label for="id">Token id:</label><br />
                                <input type="text" id="id" name="id" onChange={onIdChange}/><br />
                                <label for="price">Price:</label><br />
                                <input type="text" id="price" name="price" onChange={onPriceChange}/><br />
                                <label for="bid">Bid    </label>
                                <input type="radio" id='bid' value="Bid" name="type"/> <br />
                                <label for="fix">Fix price    </label>
                                <input type="radio" id='fix' value="Fix price" name="type"/> <br />
                                <input type="submit" value="Submit" />
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="nft">
                <nav class="nav">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="cnfts-tab" data-bs-toggle="tab" data-bs-target="#cnfts" type="button" role="tab" aria-controls="cnfts" aria-selected="true">Community Nfts</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="onfts-tab" data-bs-toggle="tab" data-bs-target="#onfts" type="button" role="tab" aria-controls="onfts" aria-selected="false">Your Nfts</button>
                        </li>
                    </ul>
                   
                </nav>
                <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="cnfts" role="tabpanel" aria-labelledby="cnfts-tab">
                            <div class="communityNfts">
                                <div class="row">
                                    {items.map((item) => (
                                        <NftBox key={parseInt(item.itemId)} myitem={false} id={parseInt(item.itemId)} name={item.name} price={parseInt(item.price)} seller={item.seller.slice(0,7) + "..."} market={market} credits={credits}/>
                                        )
                                    )}
                                </div>
                            
                            </div>
                        </div>
                        <div class="tab-pane fade" id="onfts" role="tabpanel" aria-labelledby="onfts-tab">
                                <div className='row'>
                                    {items.map((item) => 
                                            ( <div> {item.seller.toLowerCase()===account ? (<NftBox key={parseInt(item.itemId)} myitem={true} name={item.name} id={parseInt(item.itemId)} price={parseInt(item.price)} seller={item.seller.slice(0,7) + "..."} market={market}/>) : "" } </div>)
                                        
                                    
                                    )}
                                </div>

                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Market;