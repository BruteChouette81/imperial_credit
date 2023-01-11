import {useState, useEffect } from 'react';
import { useWeb3React } from "@web3-react/core"
import { ethers } from 'ethers';
import { API , Storage} from 'aws-amplify';
import injected from '../account/connector';
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

// two categories: bid and fix price. 
// each => one database
// each load separatly their components and have a different list fonction
// ui is different from purchase => bid and price => current price 
// include bid increment in info abut the token 

//do NOT execute this code down in Ohio!

const connectContract = (address, abi, injected_prov) => {
    const provider = new ethers.providers.Web3Provider(injected_prov);

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



const list = async (market, auction, nftAddress, nftABI, tokenid, price, account, type, bidIncrement, startDate, endDate) => {
    // price is in credit (5 decimals)

    try {
        const nft = connectContract(nftAddress, nftABI)

        if (type === "Fix price") {
            //make the market approve to get the token
            await(await nft.approve(MarketAddress, tokenid)).wait()
            //add pending screem
            
            //create a new item with a sell order
            await(await market.listItem(nft.address, tokenid, price)).wait()
            const marketCountIndex = await market.itemCount()
            var data = {
                body: {
                    address: account,
                    itemid: parseInt(marketCountIndex), //market item id
                    name: "first", //get the name in the form
                    score: 0 //set score to zero
                }
                
            }

            var url = "/listItem"

            API.post('server', url, data).then((response) => {
                console.log(response)
                alert("token listed!")
            })
        }
        else {
             //make the market approve to get the token
             await(await nft.approve(MarketAddress, tokenid)).wait()
             //add pending screem

             //set fonction to get start and end block
             
             //create a new item with a sell order
             await(await auction.listItem(nft.address, tokenid, price, startDate, endDate, bidIncrement )).wait()
             const auctionCountIndex = await auction.itemCount()

             //new database 
             var data = {
                 body: {
                     address: account,
                     itemid: parseInt(auctionCountIndex),
                     name: "first" //get the name in the form
                 }
                 
             }
 
             var url = "/listItem"
 
             API.post('server', url, data).then((response) => {
                 console.log(response)
                 alert("token listed!")
             })
        }
       

        

        

    }
    catch {
        alert("Unable to connect to: " + nftAddress + ". Please make sure you are the nft owner! Error code - 1")
    }
   

}

function RenderImage(props) {
    const [image, setImage] = useState(""); //empty string representation
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

    useEffect(() => {
        getImage(props.account?.toLowerCase())

    }, [])
    
    return (
        <img src={image} alt="" id='profilepic' /> 
    )
}



function Market() {
    
    const [market, setMarket] = useState();
    const [credits, setCredits] = useState();
    //const [account, setAccount] = useState("");
    const { active, account, activate } = useWeb3React()
    //const [connected, setConnected] = useState(false)
    const [items, setItems] = useState([])
    const [sorted, setSorted] = useState([]) // for activity
    const [type, setType] = useState("Bid")

    const [nftAddress, setNftAddress] = useState()
    const [tokenId, setTokenId] = useState()
    const [price, setPrice] = useState()
    const [sortedby, setSortedby] = useState('activity')

    const getAccount = async () => {
        await activate(injected)
        //setAccount(address)
        //setConnected(true)
    };

    const onChangeSortedActivity = () => {
        setSortedby('activity')
    }

    const onChangeSortedRecently = () => {
        setSortedby('recently')
    }

    const onChangeSortedAi = () => {
        setSortedby('Ai')
    }

    const onTypeChange = (event) => {
        console.log(event.target.value);
        setType(event.target.value)

    }

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
    

    const configureMarket = async () => {
        let provider = await injected.getProvider()
        const marketContract = connectContract(MarketAddress, abi.abi, provider) //
        setMarket(marketContract)
        const creditsContract = connectContract(CreditsAddress, Credit.abi, provider)
        setCredits(creditsContract)

        return marketContract
        
    }

    const getItems = async () => {
        const market = configureMarket()
        let itemsList = []
        const numItems = await (await market).functions.itemCount()
        console.log(parseInt(numItems))
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
                let item = await (await market).functions.items(i)
                console.log(item)
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
                                newItem.score = response.scores[i] //get the corresponding score
                                
                            }
                        }
                    })

                    itemsList.push(newItem)
                    
                }
                
            }
            
            
        }
        itemsList.push({
            itemId: 2,
            price: 5000,
            seller: "bruh",
            name: "test3"

        })
        return itemsList
        
    
    }

    /*
    itemlist: 
        [item, score ...],
        [],
        []
    
    */
    

    useEffect(() => {
        
        //mintNFT(account)
        getAccount()
        
        const itemslist = getItems()
        itemslist.then(res => {
            setItems(res)
        })
        /*
        itemslist.sort(function(a,b){return b[4] - a[4]}) //sort based on the 5th element
        itemslist.then(res => {
            setSorted(res) //sorted element
            
        })
        */
        

        
        //mintNFT(account) mint test nft
    }, [])

    //store everyone's name of items they are selling in the user database so its easier to get their nfts

    //make function to get specific items to see in "your items" tab so using the database, we can get all of an item and display it in the tab 

    //{items.map((item) => (<NftBox key={parseInt(item.itemId)} myitem={false} id={parseInt(item.itemId)} name={item.name} price={parseInt(item.price)} seller={item.seller.slice(0,7) + "..."} market={market} credits={credits}/> ))}

    return(
        <div class="market">
            <div class="account">
               { active ? (<RenderImage account={account} />) : ( <img src={default_profile} alt="" id='profilepic' /> )}<h6 id='account'>account: {account?.slice(0,10) + "..."}</h6>
               { active ? (<p id='connected' style={{color: "green"}}>connected</p>) : (<p id='connected' style={{color: "red"}}>disconnected</p>) }
               
              
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
                            <p>sell order informations: </p>
                            <form onSubmit={handleSubmit}>
                                <label for="addr" class="form-label">NFT Address:</label><br />
                                <input type="text" id="addr" name="addr" onChange={onAddrChange} class="form-control"/><br />
                                <label for="id" class="form-label">Token id:</label><br />
                                <input type="text" id="id" name="id" onChange={onIdChange} class="form-control"/><br />
                                <label for="price" class="form-label">Price:</label><br />
                                <div class="input-group mb-3">
                                    <input type="number" class="form-control" id="price" name="price" aria-describedby="basic-addon2" onChange={onPriceChange} />
                                    <span class="input-group-text" id="basic-addon2">$CREDIT</span>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={onTypeChange} checked />
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        Fix Price
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={onTypeChange} />
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        Bid
                                    </label>
                                </div>
                                <input type="submit" class="btn btn-primary" value="Submit" />
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
                    <ul class="nav nav-pills" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="cnfts-tab" data-bs-toggle="tab" data-bs-target="#cnfts" type="button" role="tab" aria-controls="cnfts" aria-selected="true">NFTs</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="cnfts-tab" data-bs-toggle="tab" data-bs-target="#cnfts" type="button" role="tab" aria-controls="cnfts" aria-selected="false">Tickets</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="cnfts-tab" data-bs-toggle="tab" data-bs-target="#cnfts" type="button" role="tab" aria-controls="cnfts" aria-selected="false">Virtual property</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="onfts-tab" data-bs-toggle="tab" data-bs-target="#onfts" type="button" role="tab" aria-controls="onfts" aria-selected="false">Your NFTs</button>
                        </li>
                    </ul>
                   
                </nav>
                <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="cnfts" role="tabpanel" aria-labelledby="cnfts-tab">
                            <br />
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Sorted by
                                </button>
                                <ul class="dropdown-menu dropdown-menu-dark">
                                    <li><button class="dropdown-item" onClick={onChangeSortedActivity}>Trending</button></li>
                                    <li><button class="dropdown-item" onClick={onChangeSortedRecently}>Recently Posted</button></li>
                                    <li><button class="dropdown-item disabled" onClick={onChangeSortedAi}>Imperial-AI</button></li>
                                </ul>
                            </div>
                            <div class="communityNfts">
                                <div class="row">
                                    <div class="col">
                                        {sortedby==="activity" ? ( <p>activity</p> ) : ( <p>recently</p> )}
                                        {items.map((item) => (<NftBox key={item.itemId.toString()} myitem={false} id={parseInt(item.itemId)} name={item.name} price={parseInt(item.price)} seller={item.seller} market={market} credits={credits}/> ))}
                                        <NftBox key={"3"} myitem={false} name={"test"} id={3} price={500} seller={"test"}  market={market} credits={credits}/>
                                        <NftBox key={"4"} myitem={false} name={"test"} id={4} price={100} seller={"test"}  market={market} credits={credits}/>

                                    </div>
                                </div>
                                
                            
                            </div>
                        </div>
                        <div class="tab-pane fade" id="onfts" role="tabpanel" aria-labelledby="onfts-tab">
                                <div className='row'>
                                    {items.map((item) => 
                                            ( <div> {item.seller===account ? (<NftBox key={parseInt(item.itemId)} myitem={true} name={item.name} id={parseInt(item.itemId)} price={parseInt(item.price)} seller={item.seller.slice(0,7) + "..."} market={market} credits={credits}/>) : "" } </div>)
                                        
                                    
                                    )}
                                </div>

                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Market;