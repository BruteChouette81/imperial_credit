import "./css/profile.css"
import "./css/controle.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js';
import {useState, useEffect } from 'react';
import axios from 'axios';
import { API } from 'aws-amplify';

import Chart2 from '../chart'

import default_profile from "./profile_pics/default_profile.png"

const contractAddress = '0xD3afbEFD991776426Fb0e093b1d9e33E0BD5Cd71';

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
function PaymentMethod(props) {
    const id = window.localStorage.getItem("id") //check if users have an ID
    
    return (
        <div class="pay">
            {id ? (<h4>Payment Methods:</h4>) : ( <h4>Decentralized Identification</h4> ) }
            <p><a href="">Learn more about payment methods</a> </p>
            <ListPaymentMethod paymentMethod={props.paymentMethod} />
            {id ? (<div><button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Add new Card</button> <button class="btn btn-primary">See ID</button></div>) : (<button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" >Add ID</button>)}
            
        </div>
    )
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

    const [fname, setFname] = useState()
    const [lname, setLname] = useState()
    const [country, setCountry] = useState()
    const [city, setCity] = useState()
    const [state, setState] = useState()
    const [street, setStreet] = useState()
    const [code, setCode] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()

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
    //payment architecture: 
    /*[
        ["card", "date", "cvv"], //each list is a payment method
        [],
        []
    ]
    */
    const saveId = async(event) => {
        event.preventDefault()
        //create a user ID. For now it will be IdCount
        const id = parseInt( await props.did.idCount()) + 1
        let key = Math.floor(Math.random() * 10000001); //0-10,000,000
        window.localStorage.setItem("key", key)
        window.localStorage.setItem("id", parseInt(id))
        console.log(parseInt(id), 1, city, state, code, country, street, phone, email, fname, lname)
        //params: uint id, uint _key, string memory _city, string memory _state, string memory _postalCode, string memory _country, string memory _street1, string memory _phone, string memory _email, string memory _name, string memory _lastname
        await ( await props.did.newId(parseInt(id), parseInt(key), city, state, code, country, street, phone, email, fname, lname)).wait()
        alert("New Decentralized Identity. You are now free to add a new payment method!")
    }

    const savePay = (event) => {
        event.preventDefault()
        console.log([card, eDate, cvv])
        console.log(account)
        const paymentid = window.localStorage.getItem("paymentid")
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
                                    <input type="text" id="country" name="country" class="form-control" placeholder="country : United State of America" onChange={onCountryChanged}/>
                                    <br />
                                    <input type="text" id="state" name="state" class="form-control" placeholder="state : New York" onChange={onCityChanged}/>
                                    <br />
                                    <input type="text" id="city" name="city" class="form-control" placeholder="city : New York" onChange={onStateChanged}/>
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
                        <PaymentMethod paymentMethod={props.pay} did={props.did}/>
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