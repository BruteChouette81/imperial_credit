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
            <img id="friendimg" src={default_profile} alt="" />      <h6>address: <a href="">{props.address}</a> </h6>
        </div>
        
    )
}
function ListOfFriends() {
    const friendList = ["0xDBC05B1ECB4FDAEF943819C0B04E9EF6DF4BABD6","0x721B68FA152A930F3DF71F54AC1CE7ED3AC5F867","0xB3B66043A8F1E7F558BA5D7F46A26D1B41F5CA2A"]
    return(<div class="friendList">
                {friendList.map(i => {
                return <Friend address={i} />
                })}
            </div>     
    ) //
}
function DisplayFriends() {
    return(
        <div class="friends">
            <h4>Friend List: </h4>
            <ListOfFriends />
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
    const dates = [];

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

    }, [])

    if (props.balance > 0) { // >
    
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
                        <button class="nav-link" id="pills-friends-tab" data-bs-toggle="pill" data-bs-target="#pill-friends" type="button" role="tab" aria-controls="pill-friends" aria-selected="false" disabled>Friends</button>
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
                        <DisplayFriends />
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