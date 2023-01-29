import "./css/profile.css"
import "./css/controle.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js';
import {useState, useEffect } from 'react';
import { ethers } from "ethers";
import { API } from 'aws-amplify';
import ReactLoading from "react-loading";

import Chart2 from '../chart'

import default_profile from "./profile_pics/default_profile.png"
import getGasPriceUsd from "../F2C/gazapi";

//const contractAddress = '0xD3afbEFD991776426Fb0e093b1d9e33E0BD5Cd71';

function dealWithFriend(address, accepted, is_accepted) {
    console.log(address)
    console.log(accepted)
    console.log(is_accepted)
    
    var data = {
        body: {
            address: address.toLowerCase(),
            accepted: accepted.toLowerCase(),
            is_accepted: is_accepted
        }
        
    }

    var url = "/acceptFriend"

    API.post('server', url, data).then((response) => {
        console.log(response)
    })
}
function Request(props) {
    const newDeal = () => {
        dealWithFriend(props.address, props.accepted, true)
    }

    const newDeny = () => {
        dealWithFriend(props.address, props.accepted, false)
    }
    return (<div> 
        <h6>Address: {props.accepted} </h6> <button onClick={newDeal} class="btn btn-success">Accept</button> <button onClick={newDeny} class="btn btn-danger">Deny</button>
    </div>)
}

function Friend(props) {
    /*
    <div class="container">
        <div class="row">
            <div class="col">
                {props.address}
            </div>
        </div>
    </div>
    */
    return (
        <div>
            <img id="friendimg" src={default_profile} alt="" />      <h6>address: <a href={`/Seller/${props.address}`}>{props.address}</a> </h6>
        </div>
        
    )
}
function ListOfFriends(props) {
    //const friendList = ["0xDBC05B1ECB4FDAEF943819C0B04E9EF6DF4BABD6","0x721B68FA152A930F3DF71F54AC1CE7ED3AC5F867","0xB3B66043A8F1E7F558BA5D7F46A26D1B41F5CA2A"]
    return(<div class="friendList">
                {props.friendList?.map(i => {
                return <Friend address={i} />
                })}
                {props.friendList?.length === 0 ? ( <p>You have no friend! Go request friendship to users in the market!</p> ) : ""}
            </div>     
    ) //
}

function ListOfRequests(props) {
    
    return(<div class="friendList">
                {props.request?.map(i => {
                    return <Request accepted={i} address={props.account} />
                })}
                {props.request?.length === 0 ? ( <p>You have no request!</p> ) : ""}
            </div>     
    ) //
}

function DisplayFriends(props) {
    return(
        <div class="friends">
            <h4>Friend List: </h4>
            <ListOfFriends friendList={props.friendList} />
            <br />
            <h4>Requests: </h4>
            <ListOfRequests request={props.request} account={props.account}/>
        </div>
    )
}


function PaymentCard(props) {
    return (
        <div class="paymentcard">
            <h6>Card Number: <strong>{props.card}</strong></h6>
            <p>expiration date: {props.date}</p>
            <button class="btn btn-danger">Delete</button>

        </div>
    )
}

function ListPaymentMethod(props) {
    const paymentid = window.localStorage.getItem("paymentid")
    if (paymentid) {
        return (
            <div class="payList">
                {props.paymentMethod?.map(i => {
                    return <PaymentCard card={i[0]} date={i[1]} cvv={i[2]}/>
                })}
            </div>
        )
    }
    else {
        return (
            <div class="payList">
                <p>No payment</p>
            </div>
        )
    }
    
}


function DisplayNoToken() {
    return(
        <div className="notoken">
            <h2>Unlock the Control Panel by becoming an holder!</h2>
        </div>
    )
}
function DisplayInfo(props) {
    return(
        <div class="info">
            <h4 style={{padding: 10 + "px"}}>Personnal Info:</h4>
            <p style={{color: 'white'}}>information about transactions of your $CREDIT</p>
            <table class="table table-dark">
                <thead>
                    <tr class="table-dark">
                        <th class="table-dark" scope="col">Info</th>
                        <th class="table-dark" scope="col">User</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="table-dark">
                        <th class="table-dark" scope="row">Transaction</th>
                        <td class="table-dark">{props.numtrans}</td>                         
                    </tr>
                    <tr class="table-dark">
                        <th class="table-dark" scope="row">Holder since</th>
                        <td class="table-dark">{props.numdays} days</td>                         
                    </tr>
                    <tr class="table-dark">
                        <th class="table-dark" scope="row">Profit/loss</th>
                        <td class="table-dark" style={{color: props.color}}>{props.profit} % (<a href='#'>see charts</a>)</td>                         
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
function DisplayActions(props) {
	const [numtrans, setNumtrans] = useState();
    const [profit, setProfit] = useState();
    const [numdays, setNumdays] = useState(0);
    const [price, setPrice] = useState([]);
    const [colors, setColors] = useState("green");
    const [date, setDate] = useState([]);

    const [card, setCard] = useState("");
    const [eDate, setEdate] = useState("")
    const [cvv, setCvv] = useState("");
    const [account, setAccount] = useState("")

    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [street, setStreet] = useState("")
    const [code, setCode] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    const [payingGas, setPayingGas] = useState(false)
    const [loading, setLoading] = useState(false)


    const [tag, setTag] = useState("nft")
    const [price2, setPrice2] = useState(0)
    const [nftname, setNftname] = useState("")
    const [description, setDescription] = useState("")
    const [image_file, setImage] = useState(null);

    const [ynft, setYnft] = useState([])
    const dates = [];
    const onFnameChanged = (event) => {
        setFname(event.target.value)
    }
    const onLnameChanged = (event) => {
        setLname(event.target.value)
    }
    const onCountryChanged = (event) => {
        setCountry(event.target.value)
    }
    const onCityChanged = (event) => {
        setCity(event.target.value)
    }
    const onStateChanged = (event) => {
        setState(event.target.value)
    }
    const onStreetChanged = (event) => {
        setStreet(event.target.value)
    }
    const onCodeChanged = (event) => {
        setCode(event.target.value)
    }
    const onEmailChanged = (event) => {
        setEmail(event.target.value)
    }
    const onPhoneChanged = (event) => {
        setPhone(event.target.value)
    }

    const onCardChanged = (event) => {
        setCard(event.target.value)
    }

    const onDateChanged = (event) => {
        setEdate(event.target.value)
    }

    const onCvvChanged = (event) => {
        setCvv(event.target.value)
    }
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
    //payment architecture: 
    /*[
        ["card", "date", "cvv"], //each list is a payment method
        [],
        []
    ]
    */
    const createNft = async(event) => {
        event.preventDefault()
       if (nftname !== "" && price2 > 0 && description !== "") {

       }
       else {
           alert("Need to fill out the whole form!")
       }
    }

    const createReal = async(event) => {
        event.preventDefault()
        if (nftname !== "" && price2 > 0 && description !== "") {

        }
        else {
            alert("Need to fill our the whole form!")
        }
    }

    const onImageChange = (event) => {
        setImage(event.target.files[0])
    }

    const onPriceChange = (event) => {
        setPrice2(event.target.value)
    }
    const onNameChange = (event) => {
        setNftname(event.target.value)
    }
    const onDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    function DislayCreate() {
        return (
            <div class="create">
                <ul class="nav nav-pills" id="pills-tab" role="tablist">
    
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="pills-nft-tab" data-bs-toggle="pill" data-bs-target="#pill-nft" type="button" role="tab" aria-controls="pill-nft" aria-selected="true">NFTs</button>
                    </li>

                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-real-tab" data-bs-toggle="pill" data-bs-target="#pill-real" type="button" role="tab" aria-controls="pill-real" aria-selected="false">Real Items</button>
                    </li>
                </ul>
                <br />
                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pill-nft" role="tabpanel" aria-labelledby="pills-nft-tab">
                        <form onSubmit={createNft}>
                            <div class="mb-3">
                                <label for="formFile" class="form-label">Select an image to represent your NFT</label>
                                <input class="form-control" type="file" id="formFile" accept='image/png, image/jpeg' onChange={onImageChange}/>
                            </div>
                            <br />
                            <input class="form-control" type="text" placeholder="Name" onChange={onNameChange}/>    
                            <br />  
                            <input class="form-control" type="text" placeholder="Description" onChange={onDescriptionChange}/>    
                            <br /> 
                            <div class="form-floating">
                                <select onChange={onChangeTags} class="form-select" id="floatingSelect" aria-label="Floating label select example">
                                    <option selected>Categorize your digital item. currenlty selecting: {tag} </option>
                                    <option value="1" >NFT</option>
                                    <option value="2" >Tickets</option>
                                    <option value="3" >Virtual Property</option>
                                </select>
                            </div>
                            <br />
                            <label for="price" class="form-label">Price:</label><br />
                            <div class="input-group mb-3">
                                    <input type="number" class="form-control" id="price" name="price" aria-describedby="basic-addon2" onChange={onPriceChange} />
                                    <span class="input-group-text" id="basic-addon2">$CREDIT</span>
                            </div>
                            <input type="submit" class="btn btn-primary" value="Create!" />
                        </form>
                    </div>
                    <div class="tab-pane fade show" id="pill-real" role="tabpanel" aria-labelledby="pills-real-tab">
                        <div class="tab-pane fade show active" id="pill-nft" role="tabpanel" aria-labelledby="pills-nft-tab">
                            <form onSubmit={createReal}>
                            <div class="mb-3">
                                <label for="formFile" class="form-label">Image of the item you are selling</label>
                                <input class="form-control" type="file" id="formFile"/>
                            </div>
                            <br />
                            <input class="form-control" type="text" placeholder="Name" aria-label="default input example" onChange={onNameChange}/>    
                            <br />  
                            <input class="form-control" type="text" placeholder="Description" aria-label="default input example" onChange={onDescriptionChange}/>    
                            <br />
                            <label for="price" class="form-label">Price:</label><br />
                            <div class="input-group mb-3">
                                <input type="number" class="form-control" id="price" name="price" aria-describedby="basic-addon2" onChange={onPriceChange} />
                                <span class="input-group-text" id="basic-addon2">$CREDIT</span>
                            </div>
                            <input type="submit" class="btn btn-primary" value="Create!" />
                            </form>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
    function PaymentMethod(props) {
        //const id = window.localStorage.getItem("id") //check if users have an ID
        
        return (
            <div class="pay">
                <h4>Payment Methods:</h4>
                <p><a href="">Learn more about payment methods</a> </p>
                <ListPaymentMethod paymentMethod={props.paymentMethod} />
                <div><button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Add new Card</button></div>
                <br />
                <DisplayDiD />
                
            </div>
        )
    }

    function DisplayDiD() {
        const paymentid = window.localStorage.getItem("paymentid")
        const id = window.localStorage.getItem("id") //check if users have an ID
    
        return (
            <div class="did">
                <h4>Decentralized Identification: </h4>
                <p><a href="">Learn more about DiD</a> </p>
                {id ? ( <div><button onClick={getdId} data-bs-toggle="modal" data-bs-target="#staticBackdrop3" class="btn btn-primary" >See ID</button> <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" >Change ID</button></div> ) : 
                paymentid ? (<button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" >Add ID</button>) : ( <h6>Need to add a payment method to complete your DiD</h6> )}
            </div>
        )
    }

    const getdId = async () => {
        let res = await props.did.getId(parseInt(window.localStorage.getItem("id")), parseInt(window.localStorage.getItem("key")), parseInt(window.localStorage.getItem("id")))
        console.log(res)
        setCity(res.city)
        setCode(res.postalCode)
        setCountry(res.country)
        setEmail(res.email)
        setFname(res.name)
        setLname(res.lastname)
        setPhone(res.phone)
        setStreet(res.street1)
        setState(res.state)
    }

    const payGas = async () => {
        setLoading(true)
        const gasPrice = await props.did.provider.getGasPrice();
        let gas = await props.did.estimateGas.newId(parseInt(window.localStorage.getItem("id")), parseInt(window.localStorage.getItem("id")), city, state, code, country, street, phone, email, fname, lname)
        let price = gas * gasPrice
        //get the ether price and a little bit more than gaz price to be sure not to run out
        let usdPrice = ethers.utils.formatEther(price) * 1600 

        let mounthDate = eDate.split("/")
        let paymentList = [card, mounthDate[0], "20" + mounthDate[1], cvv]

        let completed = false
        //const completed = await getGasPriceUsd(usdPrice, props.did.signer.address, paymentList, city, state, code, country, street, phone, email, fname, lname) //"+" + phone
        if (completed) {
            await ( await props.did.newId(parseInt(window.localStorage.getItem("id")), parseInt(window.localStorage.getItem("id")), city, state, code, country, street, phone, email, fname, lname)).wait()
           
            alert("New Decentralized Identity. You are now free to use the F2C prrotocol to buy and sell Items!")
            setLoading(false)
            setPayingGas(false)

        }
        else {
            alert("something went wrong..." + completed)
            setLoading(false)
            setPayingGas(false)
        }
    }

    const cancel = () => {
        setPayingGas(false)
    }

    const DisplayPayGas = () => {
        return (
            <div class="payGas">
            {loading ? (<div style={{paddingLeft: 25 + "%"}}><ReactLoading type="spin" color="#0000FF"
        height={200} width={200} /><h5>Transaction loading...</h5></div>) : (<div>
                <h4>F2C Checkout</h4>
                <p><a href="">Learn about F2C</a></p>
                <p>This Ethereum fee allow your data to be securly store in the BlockChain</p>
                <br />
                <h6>Payment method: <strong>{card}</strong></h6>
                <h5>Total USD price: 0.004$</h5>

                <button onClick={payGas} class="btn btn-primary">Approve</button> <button onClick={cancel} class="btn btn-danger">Cancel</button>
            </div>)}
            

        </div>
        )
    }

    function YnftCard(props) {
        return (
            <div class="ynftcard">
               <img id='itemimg' src={props.image} alt="" />
                <br />
                <br />
                <h4><a href="">{props.name}</a></h4>
                <p>description: {props.description}</p>
                <button type="button" class="btn btn-secondary">Sell</button> 
            </div>
        )
    }

    function DisplayYnft () {
        const loadNft = () => {
            //get nft using moralis
            let data = {
                body: {
                    address: "0x7675CF4abb1A19F7Bd5Ed23d132F9dFfA0C9587D"
                }
            }
            let url ="/nftbyaddress"
            API.post('server', url, data).then((response) => {
                console.log(response)
                console.log(props.account)
            })
        }
        return (
            <div class="ynft">
                <h1>list of your NFT</h1>
                {ynft.map(i => {
                    <YnftCard name={i.name} description={i.description} image={i.image} address={i.address} tokenid={i.tokenid} />
                })}

                <button onClick={loadNft}>Load collection</button>
            </div>
        )
    }

    const saveId = async(event) => {
        event.preventDefault()
        //create a user ID. For now it will be IdCount
        const id = parseInt( await props.did.idCount()) + 1
        let key = Math.floor(Math.random() * 10000001); //0-10,000,000
        window.localStorage.setItem("key", key)
        window.localStorage.setItem("id", parseInt(id))
        //console.log(parseInt(id), 1, city, state, code, country, street, phone, email, fname, lname)
        //params: uint id, uint _key, string memory _city, string memory _state, string memory _postalCode, string memory _country, string memory _street1, string memory _phone, string memory _email, string memory _name, string memory _lastname
        if (city !== "" && state !== "" && code !== "" && country !== "" && street !== "" && phone !== "" && email !== "" && fname !== "" && lname !== "") {
            try {
                await ( await props.did.newId(parseInt(id), parseInt(key), city, state, code, country, street, phone, email, fname, lname)).wait()
                alert("New Decentralized Identity. You are now free to use the F2C protocol to buy and sell Items!")
            } catch (error) {
                alert("Need Ethereum to add Decentralized Identity. Ethereum Fees of 0,004$.")
                setPayingGas(true)
               
                
    
            }
        }
        else {
            alert("Information of DiD not well written... Try again...")
        }
        
        
        
    }

    const savePay = (event) => {
        event.preventDefault()
        console.log(card.length)
        const paymentid = window.localStorage.getItem("paymentid")
        if (card !== "" && eDate !== "" && cvv !== "" && card.length === 16 && eDate.length === 5 && cvv.length === 3) { //requirement
            if (paymentid) {
                let intpaymentids = parseInt(paymentid)
                window.localStorage.setItem("paymentid", intpaymentids+1)
                const url = '/uploadFile';
                var config = {
                    body: {
                        account: props.account?.toLowerCase(),
                        pay: [card, eDate, cvv],
                        is_cust: false
                    }
                };
                API.put('server', url, config).then((response) => {
                    console.log(response);
                    alert("successfully added new payment method")
                });
            }
            else {
                window.localStorage.setItem("paymentid", 0)
                const url = '/uploadFile';
                var config = {
                    body: {
                        account: props.account?.toLowerCase(),
                        pay: [card, eDate, cvv],
                        is_cust: false
                    }
                };
                API.put('server', url, config).then((response) => {
                    console.log(response);
                });
            }
        }
        else {
            alert("All field are required... Please ensure you have written the good information.")
        }
    }

    const getPrice10Days = () => {
        let url = '/historicalPrice';
        var pPrice = []

        let date0 = new Date();
        dates.push(date0.getDate())
        let date1 = new Date(date0)
        for (let i = 0; i < 9; i++) {
            date1.setDate(date1.getDate() - 1)
            dates.push(date1.getDate())
        }
        setDate(dates.reverse())

        API.get('server', url).then((response) => {

            for (let i=0; i < 10; i++) {
                //console.log(response.data.hprice[i] * props.balance)
                pPrice.push((response.data.hprice[i] * props.balance))
            }
            //console.log(pPrice)
            setPrice(pPrice.reverse())

        });
    }
    
    const getTimeInvest = async() => {
        let url = '/timeInvest';
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        //console.log(account)
        let data = {
            body: {
                address: "0x51F29a5c52EAbFCcc5231954Ad154bf19d4BFD5b", //account,
                tokenAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7" //contractAddress
            }
            
        }

        API.post('server', url, data).then((response) => {
            //console.log(response.data.profit)
            var date1 = new Date(response.timeInvest)
            var date2 = new Date()

            //calculate time difference  
            var time_difference = date2.getTime() - date1.getTime();
            //calculate days difference by dividing total milliseconds in a day
            var days_difference = time_difference / (1000 * 60 * 60 * 24);
            setNumdays(parseInt(days_difference))
            setNumtrans(response.numTrans)
            setProfit(response.profit)
            if (response.profit < 0) {
                setColors("red")
            }

        });
    }
    const data = {
		labels: date, //['6/12/22', '6/13/22', '6/14/22', '6/15/22', '6/16/22', '6/17/22', '6/18/22', '6/19/22', '6/20/22', '6/21/22'],
		datasets:[
			{
				label: 'Price',
				data: price,
			}
		]

	}
    useEffect(() => {
        if (props.balance > 0) { // >
            getPrice10Days()
            getTimeInvest()
        }
        console.log(props)

    }, [])

    if (props.balance === 0) { // >
    
        //<button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseInfo" aria-expanded="false" aria-controls="collapseInfo"> Info </button>
        return(
            <div class="control-panel">
                <ul class="nav nav-pills" id="pills-tab" role="tablist">
    
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="pills-info-tab" data-bs-toggle="pill" data-bs-target="#pill-info" type="button" role="tab" aria-controls="pill-info" aria-selected="true">Info</button>
                    </li>
    
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-chart-tab" data-bs-toggle="pill" data-bs-target="#pill-chart" type="button" role="tab" aria-controls="pill-chart" aria-selected="false">Charts</button>
                    </li>

                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-friends-tab" data-bs-toggle="pill" data-bs-target="#pill-friends" type="button" role="tab" aria-controls="pill-friends" aria-selected="false">Friends</button>
                    </li>

                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-pay-tab" data-bs-toggle="pill" data-bs-target="#pill-pay" type="button" role="tab" aria-controls="pill-pay" aria-selected="false">Decentralized ID</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-create-tab" data-bs-toggle="pill" data-bs-target="#pill-create" type="button" role="tab" aria-controls="pill-create" aria-selected="false">Create !</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-ynft-tab" data-bs-toggle="pill" data-bs-target="#pill-ynft" type="button" role="tab" aria-controls="pill-ynft" aria-selected="false">Your NFTs</button>
                    </li>
                            
                </ul>
                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pill-info" role="tabpanel" aria-labelledby="pills-info-tab">
                        <DisplayInfo numtrans={numtrans} numdays={numdays} profit={profit} color={colors}/>
                    </div>
                    <div class="tab-pane fade" id="pill-chart" role="tabpanel" aria-labelledby="pills-chart-tab">
                        <div class="charts">
                            <h4 style={{padding: 10 + "px"}}>Personnal Chart:</h4>
                            <p style={{color: colors}}>{profit} %, ({parseInt(props.livePrice)} USD)</p>
                            <div class="dropdown" style={{paddingBottom: 10+"px"}}>
                                <a class="btn btn-secondary btn-sm dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                    Duration (10 days)
                                </a>
    
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                    <li><a class="dropdown-item disabled" href="#">1 day</a></li>
                                    <li><a class="dropdown-item " href="#">10 days</a></li>
                                    <li><a class="dropdown-item disabled" href="#">All</a></li>
                                </ul>
                            </div>
                            <Chart2 data={data}/>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="pill-friends" role="tabpanel" aria-labelledby="pills-friend-tab">
                        <DisplayFriends account={props.account} request={props.request} friendList={props.friendList} />
                    </div>
                    <div class="tab-pane fade" id="pill-pay" role="tabpanel" aria-labelledby="pills-pay-tab">
                    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{color:"black"}}>
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">New Payment Method</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p>You can always delete any payment method ( <a href=""> see our security policy</a>) </p>
                                <form onSubmit={savePay}>
                                    <input type="text" id="card" name="card" class="form-control" placeholder="Card Number" onChange={onCardChanged}/>
                                    <br />
                                    <input type="text" id="date" name="date" class="form-control" placeholder="expiration date" onChange={onDateChanged}/>
                                    <br />
                                    <input type="text" id="cvv" name="cvv" class="form-control" placeholder="cvv" onChange={onCvvChanged}/>
                                    <br />
                                    <input type="submit" class="btn btn-primary" value="Submit" />
                                </form>
                                </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdrop2Label" aria-hidden="true" style={{color:"black"}}>
                        <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">New Decentralized Identification</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p>You can always delete any DiD ( <a href=""> see our security policy</a>) </p>
                                <form onSubmit={saveId}>
                                    <input type="text" id="fname" name="fname" class="form-control" placeholder="First Name : Thomas" onChange={onFnameChanged}/>
                                    <br />
                                    <input type="text" id="lname" name="lname" class="form-control" placeholder="Last Name : Berthiaume " onChange={onLnameChanged}/>
                                    <br />
                                    <input type="text" id="country" name="country" class="form-control" placeholder="country : US " onChange={onCountryChanged}/>
                                    <br />
                                    <input type="text" id="state" name="state" class="form-control" placeholder="state : NY" onChange={onCityChanged}/>
                                    <br />
                                    <input type="text" id="city" name="city" class="form-control" placeholder="city : New York City" onChange={onStateChanged}/>
                                    <br />
                                    <input type="text" id="street" name="street" class="form-control" placeholder="street address : 1 example road" onChange={onStreetChanged}/>
                                    <br />
                                    <input type="text" id="code" name="code" class="form-control" placeholder="Postal code : 000 000" onChange={onCodeChanged}/>
                                    <br />
                                    <input type="text" id="phone" name="phone" class="form-control" placeholder="Phone : 14188889065" onChange={onPhoneChanged}/>
                                    <br />
                                    <input type="text" id="email" name="email" class="form-control" placeholder="Email : thom@example.com" onChange={onEmailChanged}/>
                                    <br />
                                    <input type="submit" class="btn btn-primary" value="Submit" />
                                </form>
                                </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal fade" id="staticBackdrop3" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdrop3Label" aria-hidden="true" style={{color:"black"}}>
                        <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Your Id</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p>You can always delete or change your decentralized Identification ( <a href=""> see our security policy</a>) </p>
                                
                                <h4>Name: <strong>{fname}</strong></h4> <br />
                                <h4>Last Name: <strong>{lname}</strong></h4> <br />
                                <h4>Email: <strong>{email}</strong></h4> <br />
                                <h4>Phone: <strong>{phone}</strong></h4> <br />
                                <h4>Address:</h4>
                                <h6>Country: <strong>{country}</strong></h6>
                                <h6>State: <strong>{state}</strong></h6>
                                <h6>City: <strong>{city}</strong></h6>
                                <h6>Street: <strong>{street}</strong></h6>
                                <h6>Postal code: <strong>{code}</strong></h6>
                               
                                </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {payingGas ? (<DisplayPayGas />) : (<div><PaymentMethod paymentMethod={props.pay} did={props.did}/></div>)}
                        
                    </div>
                    <div class="tab-pane fade" id="pill-create" role="tabpanel" aria-labelledby="pills-create-tab">
                        <h1>create!</h1>
                        <DislayCreate />
                    </div>
                    <div class="tab-pane fade" id="pill-ynft" role="tabpanel" aria-labelledby="pills-ynft-tab">
                        <DisplayYnft />
                    </div>
                </div>
            </div>
            );
    }

    else {
        return (
            <div>
                <DisplayNoToken />
            </div>
        )
    }
	
	
}

export default DisplayActions;