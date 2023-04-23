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
import DiD from '../../artifacts/contracts/DiD.sol/DiD.json';
import DDSABI from '../../artifacts/contracts/DDS.sol/DDS.json'

import NftBox from './nfts';
import PayGasList from '../F2C/gas/payGasList';

const MarketAddress = '0x710005797eFf093Fa95Ce9a703Da9f0162A6916C'; // goerli new test contract
const DDSAddress = '0x2F810063f44244a2C3B2a874c0aED5C6c28D1D87'
const CreditsAddress = "0xD475c58549D3a6ed2e90097BF3D631cf571Bdd86" //goerli test contract
const NftAddress = '0x3d275ed3B0B42a7A3fCAA33458C34C0b5dA8Cc3A'; // goerli new test contract
const DiDAddress = "0x6f1d3cd1894b3b7259f31537AFbb930bd15e0EB8" //goerli test contract 

// two categories: bid and fix price. 
// each => one database
// each load separatly their components and have a different list fonction
// ui is different from purchase => bid and price => current price 
// include bid increment in info abut the token 

//do NOT execute this code down in Ohio!

const connectContract = (address, abi, injected_prov) => { //for metamask
    const provider = new ethers.providers.Web3Provider(injected_prov);

    // get the end user
    const signer = provider.getSigner();

    // get the smart contract
    const contract = new ethers.Contract(address, abi, signer);
    return contract
}

const getContract = (address, abi, signer ) => { //for Imperial Account
    // get the end user
    //console.log(signer)
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



const list = async (market, auction, nftAddress, nftABI, tokenid, price, account, type, tag, name, description, bidIncrement, startDate, endDate) => {
    // price is in credit (5 decimals)
    var data = {
        body: {
            address: nftAddress,
            tokenid: tokenid
        }
        
    }

    var url = "/metadata"

    API.post('server', url, data).then(async(response) => {
        console.log(response)
        try {
            let provider = await injected.getProvider()
            const nft = connectContract(nftAddress, nftABI, provider) //check if erc1155 for abi (response.contractType) 
            //get contract for imperial
            console.log(nft)
            
    
            if (type === "fp") {
                //make the market approve to get the token
                await(await nft.approve(MarketAddress, tokenid)).wait()
                //add pending screem
                
                //create a new item with a sell order
                await(await market.listItem(nft.address, tokenid, (price * 10000))).wait()
                const marketCountIndex = await market.itemCount()
                var data = {
                    body: {
                        address: account,
                        itemid: parseInt(marketCountIndex), //market item id
                        name: name, //get the name in the form
                        score: 0, //set score to zero
                        tag: tag, 
                        description: description,
                        image: response.metadata.image
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
                 await(await auction.listItem(nft.address, tokenid, (price * 10000), startDate, endDate, bidIncrement )).wait()
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
    })
    
   

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
    const [did, setDid] = useState()
    const [dds, setDds] = useState()
    const [userwallet, setUserwallet] = useState()
    const [pay, setPay] = useState()
    const [usdPrice2, setUsdPrice2] = useState(0)
    //const [account, setAccount] = useState("");
    const [address, setAddress] = useState("")
    const { active, account, activate } = useWeb3React()
    //const [connected, setConnected] = useState(false)
    const [items, setItems] = useState([])
    const [sorted, setSorted] = useState([]) // for activity
    const [realItems, setRealItems] = useState([])
    const [realSorted, setRealSorted] = useState()
    const [type, setType] = useState("fp")

    const [nftAddress, setNftAddress] = useState()
    const [tokenId, setTokenId] = useState()
    const [price, setPrice] = useState()
    const [tag, setTag] = useState("nft")
    const [description, setDescription] = useState("")

    const [sortedby, setSortedby] = useState('recently')
    const [haveItem, setHaveItem] = useState(false)

    const updateItemOwn = () => {
        setHaveItem(true)
    }

    const [search, setSearch] = useState("")
    const [seaching, setSearching] = useState(false)

    const getPrivateKey = async(account) => { //function to get privatekey from aws dynamo server
        var data = {
            body: {
                address: account?.toLowerCase()
            }
            
        }

        var url = "/connection"

        const provider = new ethers.providers.InfuraProvider("goerli")
        API.post('server', url, data).then((response) => {
            let userwallet = new ethers.Wallet(response.privatekey, provider)
            setAddress(userwallet.address)
            setUserwallet(userwallet)
            
            setPay(response.pay)
            let itemslist = getItems("true", userwallet)
            itemslist.then(res => {
                setItems(res[0])
                let newRes = res[0];
                //console.log(itemslist)
                console.log(items)

                let newitemslist = scoreQuickSort(newRes)
                setSorted(newitemslist.reverse())
                
                console.log(newitemslist)

                setRealItems(res[1])
                let newReal = res[1];
                //console.log(itemslist)
                console.log(realItems)

                let newreallist = scoreQuickSort(newReal)
                setRealSorted(newreallist)
                
                console.log(newitemslist)
            })
            
        })
    
    }

    const getAccount = async () => {
        await activate(injected)
        const [accountAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAddress(accountAddress)
        //setAccount(address)
        //setConnected(true)
    };
    //Sorted by
    const onChangeSortedActivity = () => {
        setSortedby('activity')
    }

    const onChangeSortedRecently = () => {
        setSortedby('recently')
    }

    const onChangeSortedAi = () => {
        setSortedby('Ai')
    }

    //change form
    const onChangeTags = (event) => {

        switch (event.target.value) {
            case "1": 
                setTag("nft")
                console.log("nft")
                break;
            case "2": 
                setTag("tickets")
                console.log("tickets")
                break;
            case "3":
                setTag("vp")
                console.log("vp")
                break;
            default:
                console.log("400: Bad request error code - 5")
                break;
        }
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

    const onBioChange = (event) => {
        setDescription(event.target.value)
    }

    const onPriceChange = (event) => {
        setPrice(event.target.value)
    }

    const handleSubmit = async(event) => {
        event.preventDefault()
        alert("connecting: " + nftAddress)

        let _ = ""

        //get metadata using moralis in app.js + loading screen
        try {
            list(market, _, nftAddress, erc721ABI.abi, tokenId, price, account, type, tag,_, description, _, _, _) //fill underscores with real value
        } catch(e) {
            if (window.localStorage.getItem("usingMetamask") === "true") {
                let provider = await injected.getProvider()
                const nft = connectContract(nftAddress, erc721ABI.abi, provider) //check if erc1155 for abi (response.contractType)
                const market = connectContract(MarketAddress, abi.abi, provider)
                console.log(nft)

                const gasPrice = await nft.provider.getGasPrice();
                let gas1 = await nft.estimateGas.approve(MarketAddress, tokenId)
                let price1 = gas1 * gasPrice
                let gas2 = await market.estimateGas.listItem(nft.address, tokenId, (price * 10000))
                let price2 = gas2 * gasPrice
                //get the ether price and a little bit more than gaz price to be sure not to run out
                fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&api_key=5c62b32f93bf731a5eae052066e37683cdee22fd71f3f4e2b987d495113f8534").then(res => {
                    res.json().then(jsonres => {
                        console.log(jsonres.USD)
                        let usdPrice = (ethers.utils.formatEther(price1) * jsonres.USD) + (ethers.utils.formatEther(price2) * jsonres.USD)
                        setUsdPrice2(usdPrice)
                    })
                })
            } else {
                //const provider  = new ethers.providers.InfuraProvider("goerli")
                const nft = getContract(nftAddress, erc721ABI.abi, userwallet) //check if erc1155 for abi (response.contractType)
                const market = getContract(MarketAddress, abi.abi, userwallet)
                console.log(nft)

                const gasPrice = await nft.provider.getGasPrice();
                let gas1 = await nft.estimateGas.approve(MarketAddress, tokenId)
                let price1 = gas1 * gasPrice
                let gas2 = await market.estimateGas.listItem(nft.address, tokenId, (price * 10000))
                let price2 = gas2 * gasPrice
                //get the ether price and a little bit more than gaz price to be sure not to run out
                fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD&api_key=5c62b32f93bf731a5eae052066e37683cdee22fd71f3f4e2b987d495113f8534").then(res => {
                    res.json().then(jsonres => {
                        console.log(jsonres.USD)
                        let usdPrice = (ethers.utils.formatEther(price1) * jsonres.USD) + (ethers.utils.formatEther(price2) * jsonres.USD)
                        setUsdPrice2(usdPrice)
                    })
                })
                
            }
        }
        


    }

    //search component
    const onChangeSearch = (event) => {
        setSearch(event.target.value)

        if (event.target.value === "") {
            setSearching(false)
        }
    }

    const handleSearch = (event) => {
        event.preventDefault()
        console.log(search)
        setSearching(true)
    }
    

    const configureMarket = async (haswallet, userwallet) => {
        if (haswallet === "true") {
            //const provider = new ethers.providers.InfuraProvider("goerli")
            console.log(userwallet)
            const marketContract = getContract(MarketAddress, abi.abi, userwallet)
            setMarket(marketContract)
            const creditsContract = getContract(CreditsAddress, Credit.abi, userwallet)
            setCredits(creditsContract)
            const didContract = getContract(DiDAddress, DiD.abi, userwallet)
            setDid(didContract)
            const DDSContract = getContract(DDSAddress, DDSABI.abi, userwallet)
            setDds(DDSContract)
            return [marketContract, DDSContract]
        }

        else {
            let provider = await injected.getProvider()
            const marketContract = connectContract(MarketAddress, abi.abi, provider) //
            setMarket(marketContract)
            const creditsContract = connectContract(CreditsAddress, Credit.abi, provider)
            setCredits(creditsContract)
            const DDSContract = connectContract(DDSAddress, DDSABI.abi, provider)
            setDds(DDSContract)
            return [marketContract, DDSContract]
        }
    }

    const getItems = async (haswallet, wallet) => {
        const markets = await configureMarket(haswallet, wallet)
        console.log(markets)
        let market = markets[0]
        let ddsc = markets[1] //load both market

        console.log(ddsc)
        console.log(market)
        let itemsList = []
        

        
        const numItems = await market?.functions.itemCount()
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
                let item = await market.functions.items(i)
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
                            if (response.ids[i] == item.itemId && response.tags[i] !== "real") { // once you got the item we want to display:
                                newItem.itemId = item.itemId
                                newItem.price = item.price
                                newItem.seller = item.seller
                                newItem.name = response.names[i] //get the corresponding name
                                newItem.score = response.scores[i] //get the corresponding score
                                newItem.tag = response.tags[i] //get the corresponding tag
                                newItem.description = response.descriptions[i]
                                newItem.image = response.image[i]
                            }
                        }
                    })

                    itemsList.push(newItem)
                    
                }
                
            }
            
            
        }
        let realList = []
        const numReal = await ddsc?.functions.itemCount()
        //console.log(parseInt(numItems))
        //console.log("numitems: " + numItems)
    
        //get the 10 most recent sell order
        if (numReal >= 10) {
            for( let i = 1; i<11; i++) {
                
                const item = await ddsc.items(i) // (numItems - i)
                if(item.sold) {
                    continue
                }
                /*
                */
        
                else {
                    realList.push(item)
                }
                
            }
            return realList
        }

        else {
            for( let i = 1; i<=numReal; i++) {
                let item = await ddsc.items(i)
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
                                newItem.tokenId = item.tokenId
                                newItem.price = item.price
                                newItem.seller = item.seller
                                newItem.name = response.names[i] //get the corresponding name
                                newItem.score = response.scores[i] //get the corresponding score
                                newItem.tag = response.tags[i] //get the corresponding tag
                                newItem.description = response.descriptions[i]
                                newItem.image = response.image[i]
                            }
                        }
                    })

                    realList.push(newItem)
                    
                }
                
            }
            
            
        }
        itemsList.push({
            itemId: 4,
            price: 5000,
            seller: "test",
            name: "Canadians V Bruins",
            image: "https://blackngoldhockey.com/wp-content/uploads/2020/05/boston-bruins-vs-montreal-canadiens.jpg?w=676",
            score: 3, 
            tag: "ticket",
            description: "Canadians V Bruins, Bell center, section C; place 12B"

        })
        itemsList.push({
            itemId: 5,
            price: 5000,
            seller: "test",
            name: "Access card: the EPIC bar",
            image: "data:image/jpeg;base64,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",
            score: 1, 
            tag: "nft",
            description: "An exclusive access to the EPIC bar in Montreal"

        })
        itemsList.push({
            itemId: 6,
            price: 5000,
            seller: "test",
            name: "Metaverse - house",
            image: "data:image/jpeg;base64,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",
            score: 6, 
            tag: "vp",
            description: "Amazing Metaverse house!"

        })
        itemsList.push({
            itemId: 7,
            price: 5000,
            seller: "test",
            name: "Metaverse - house",
            image: "data:image/jpeg;base64,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",
            score: 6, 
            tag: "vp",
            description: "Amazing Metaverse house!"

        })




        realList.push({
            itemId: 7,
            price: 5000,
            seller: "0x4c62fc52d5ad4c8273feb97684ba612288ee9507",
            name: "Canadian Cap",
            image: "data:image/jpeg;base64,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",
            score: 2, 
            tag: "real",
            description: "1/1 Montreal Canadian cap! Delieverd in 3 days in Canada!"
        })
        
        return [itemsList, realList]
        
    
    }

    function scoreQuickSort(origArray) {
        if (origArray.length <= 1) {
            return origArray;
        } else {

            var left = [];
            var right = [];
            var newArray = [];
            var pivot = origArray.pop();
            var length = origArray.length;
            for (var i = 0; i < length; i++) {
                if (origArray[i][4] <= pivot[4]) {
                    left.push(origArray[i]);
                } else {
                    right.push(origArray[i]);
                }
            }

            return newArray.concat(scoreQuickSort(left), pivot, scoreQuickSort(right));
        }
    }

    /*
    itemlist: 
        [item, score ...],
        [],
        []
    
    */
    

    useEffect(() => {
        
        //mintNFT(account)
        if (window.localStorage.getItem("hasWallet") === "true" && window.localStorage.getItem("usingMetamask") !== "true") { //only have Imperial Account
            getPrivateKey(window.localStorage.getItem("walletAddress")) // if Imperial Account load account

            
        }
        else {
            getAccount()

            let itemslist = getItems(false, "")
            itemslist.then(res => {
                setItems(res[0])
                let newRes = res[0];
                
                //console.log(itemslist)
                
                console.log(res[0])

                let newitemslist = scoreQuickSort(newRes)
                setSorted(newitemslist.reverse())
                
                console.log(newitemslist)

                setRealItems(res[1])
                let newReal = res[1];
                console.log(itemslist)
                console.log(realItems)

                let newreallist = scoreQuickSort(newReal)
                setRealSorted(newreallist)
                
                console.log(newreallist)
                
                console.log(items)
            })
            
        }
        
        //mintNFT(account) mint test nft
    }, [])

    //store everyone's name of items they are selling in the user database so its easier to get their nfts

    //make function to get specific items to see in "your items" tab so using the database, we can get all of an item and display it in the tab 

    //{items.map((item) => (<NftBox key={parseInt(item.itemId)} myitem={false} id={parseInt(item.itemId)} name={item.name} price={parseInt(item.price)} seller={item.seller.slice(0,7) + "..."} market={market} credits={credits}/> ))}

    return(
        <div class="market">
            <div class="account">
               {userwallet ? (<RenderImage account={userwallet?.address} />) :  active ? (<RenderImage account={account} />) : ( <img src={default_profile} alt="" id='profilepic' /> )} {userwallet ? (<h6 id='account'>account: {userwallet?.address.slice(0,10) + "..."}</h6>) : (<h6 id='account'>account: {account?.slice(0,10) + "..."}</h6>)}
               {userwallet ? (<p id='connected' style={{color: "green"}}>connected</p>) : active ? (<p id='connected' style={{color: "green"}}>connected</p>) : (<p id='connected' style={{color: "red"}}>disconnected</p>)}
               
              
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                sell your nfts 
                </button>

                <div class="premium">
                    <h5>To access all of our features, subscribe to our premium access!</h5>
                    <a href={`/subs/${address}`} class="btn btn-info">See offers</a>
                </div>

                
                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{color:"black"}}>
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Listing Your NFTs</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {usdPrice2 > 0 ? ( <PayGasList account={account} total={usdPrice2} pay={pay} listItem={list} did={did} nftAddress={nftAddress} tokenid={tokenId} name="test" description={description} image="test" tag={tag} price={price} />) : ( <div>
                                <p>Sell order requirements: </p>
                            <form onSubmit={handleSubmit}>
                                <label for="addr" class="form-label">NFT Address:</label><br />
                                <input type="text" id="addr" name="addr" onChange={onAddrChange} class="form-control"/><br />
                                <label for="id" class="form-label">Token id:</label><br />
                                <input type="text" id="id" name="id" onChange={onIdChange} class="form-control"/><br />
                                <label for="id" class="form-label">Description:</label><br />
                                <input type="text" id="id" name="id" onChange={onBioChange} class="form-control"/><br />
                                <label for="price" class="form-label">Price:</label><br />
                                <div class="input-group mb-3">
                                    <input type="number" class="form-control" id="price" name="price" aria-describedby="basic-addon2" onChange={onPriceChange} />
                                    <span class="input-group-text" id="basic-addon2">$CREDIT</span>
                                </div>

                                <div class="form-floating">
                                    <select onChange={onChangeTags} class="form-select" id="floatingSelect" aria-label="Floating label select example">
                                        <option selected>Categorize your digital item </option>
                                        <option value="1" >NFT</option>
                                        <option value="2" >Tickets</option>
                                        <option value="3" >Virtual Property</option>
                                    </select>
                                    <label for="floatingSelect">Tag</label>
                                </div>

                                <br />

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={onTypeChange} checked />
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        Fix Price
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={onTypeChange} disabled />
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        Bid
                                    </label>
                                </div>
                                <input type="submit" class="btn btn-primary" value="Submit" />
                            </form>
                            </div> )}
                            
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
                            <button class="nav-link" id="ticket-tab" data-bs-toggle="tab" data-bs-target="#ticket" type="button" role="tab" aria-controls="ticket" aria-selected="false">Tickets</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="vp-tab" data-bs-toggle="tab" data-bs-target="#vp" type="button" role="tab" aria-controls="vp" aria-selected="false">Virtual property</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="real-tab" data-bs-toggle="tab" data-bs-target="#real" type="button" role="tab" aria-controls="real" aria-selected="false" disabled>Music</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="real-tab" data-bs-toggle="tab" data-bs-target="#real" type="button" role="tab" aria-controls="real" aria-selected="false" disabled>Art</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="real-tab" data-bs-toggle="tab" data-bs-target="#real" type="button" role="tab" aria-controls="real" aria-selected="false" disabled>Courses</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="real-tab" data-bs-toggle="tab" data-bs-target="#real" type="button" role="tab" aria-controls="real" aria-selected="false" disabled>Books</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="real-tab" data-bs-toggle="tab" data-bs-target="#real" type="button" role="tab" aria-controls="real" aria-selected="false" disabled>Services</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="real-tab" data-bs-toggle="tab" data-bs-target="#real" type="button" role="tab" aria-controls="real" aria-selected="false" disabled>Funding</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="real-tab" data-bs-toggle="tab" data-bs-target="#real" type="button" role="tab" aria-controls="real" aria-selected="false">Real Items</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="onfts-tab" data-bs-toggle="tab" data-bs-target="#onfts" type="button" role="tab" aria-controls="onfts" aria-selected="false">Your NFTs</button>
                        </li>

                    </ul>
                    <form class="d-flex" onSubmit={handleSearch}>
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={onChangeSearch} />
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                   
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
                                        {sortedby==="activity" ? seaching===false ? sorted.map((item) => 
                                            item.tag==="nft" ? (<NftBox key={item.itemId.toString()} myitem={false} id={parseInt(item.itemId)} name={item.name} description={item.description} price={parseInt(item.price)} seller={item.seller} image={item.image} account={address} signer={userwallet} pay={pay} did={did} market={market} credits={credits}/> ) : ""
                                        )  : sorted.map((item) => 
                                            item.name.includes(search)===true ? (<NftBox key={item.itemId.toString()} myitem={false} id={parseInt(item.itemId)} name={item.name} description={item.description} price={parseInt(item.price)} seller={item.seller} image={item.image} account={address} signer={userwallet} pay={pay} did={did} market={market} credits={credits}/> ) : ""
                                        ) : seaching===false ? items.map((item) => 
                                            item.tag==="nft" ? (<NftBox key={item.itemId.toString()} myitem={false} id={parseInt(item.itemId)} name={item.name} description={item.description} price={parseInt(item.price)} seller={item.seller} image={item.image} account={address} signer={userwallet} pay={pay} did={did} market={market} credits={credits}/> ) : ""
                                        )  : items.map((item) => 
                                            item.name.includes(search)===true ? (<NftBox key={item.itemId.toString()} myitem={false} id={parseInt(item.itemId)} name={item.name} description={item.description} price={parseInt(item.price)} seller={item.seller} image={item.image} account={address} signer={userwallet} pay={pay} did={did} market={market} credits={credits}/> ) : ""
                                        )}
                                        
                                       


                                    </div>
                                </div>
                                
                            
                            </div>
                        </div>
                        <div class="tab-pane fade" id="ticket" role="tabpanel" aria-labelledby="ticket-tab">
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
                                    {sortedby==="activity" ? ( <p>recently</p> ) : ( <p>recently</p> )}
                                        {seaching===false ? items.map((item) => 
                                            item.tag==="ticket" ? (<NftBox key={item.itemId.toString()} myitem={false} id={parseInt(item.itemId)} name={item.name} description={item.description} price={parseInt(item.price)} seller={item.seller} image={item.image} account={address} signer={userwallet} pay={pay} did={did} market={market} credits={credits}/> ) : ""
                                        )  : items.map((item) => 
                                            item.name.includes(search)===true ? (<NftBox key={item.itemId.toString()} myitem={false} id={parseInt(item.itemId)} name={item.name} description={item.description} price={parseInt(item.price)} seller={item.seller} image={item.image}  account={address} signer={userwallet} pay={pay} did={did} market={market} credits={credits}/> ) : ""
                                        )}
                                        

                                    </div>
                                </div>
                                
                            
                            </div>
                        </div>
                        <div class="tab-pane fade" id="vp" role="tabpanel" aria-labelledby="vp-tab">
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
                                        {seaching===false ? items.map((item) => 
                                            item.tag==="vp" ? (<NftBox key={item.itemId.toString()} myitem={false} id={parseInt(item.itemId)} name={item.name} description={item.description} price={parseInt(item.price)} seller={item.seller} image={item.image}  account={address} signer={userwallet} pay={pay} did={did} market={market} credits={credits}/> ) : ""
                                        )  : items.map((item) => 
                                            item.name.includes(search)===true ? (<NftBox key={item.itemId.toString()} myitem={false} id={parseInt(item.itemId)} name={item.name} description={item.description} price={parseInt(item.price)} seller={item.seller} image={item.image}  account={address} signer={userwallet} pay={pay} did={did} market={market} credits={credits}/> ) : ""
                                        )}
                                        

                                    </div>
                                </div>
                                
                            
                            </div>
                        </div>
                        <div class="tab-pane fade" id="onfts" role="tabpanel" aria-labelledby="onfts-tab">
                                <div className='row'>
                                    {items.map((item) => 
                                            item.seller===account ? (<NftBox key={parseInt(item.itemId)} myitem={true} name={item.name} description={item.description} id={parseInt(item.itemId)} price={parseInt(item.price)} seller={item.seller.slice(0,7) + "..."} market={market} credits={credits} setHaveItem={setHaveItem}/> ) : "" 
                                    )}

                                    {haveItem===false ? ( <div><p>You are currenlty selling no items</p></div> ) : "" }
                                </div>

                        </div>
                        <div class="tab-pane fade" id="real" role="tabpanel" aria-labelledby="real-tab">
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
                                        {seaching===false ? realItems.map((item) => 
                                            item.tag==="real" ? (<NftBox key={(item.itemId + 99).toString()} real={true} tokenId={item.tokenId} myitem={false} id={parseInt(item.itemId)} name={item.name} description={item.description} price={parseInt(item.price)} seller={item.seller} image={item.image}  account={address} signer={userwallet} pay={pay} did={did} market={market} credits={credits} dds={dds}/> ) : ""
                                        )  : realItems.map((item) => 
                                            item.name.includes(search)===true ? (<NftBox key={item.itemId.toString()} real={true} tokenId={item.tokenId} myitem={false} id={parseInt(item.itemId)} name={item.name} description={item.description} price={parseInt(item.price)} seller={item.seller} image={item.image}  account={address} signer={userwallet} pay={pay} did={did} market={market} credits={credits} dds={dds}/> ) : ""
                                        )}
                                        
                                    </div>
                                </div>
                                
                            
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Market;