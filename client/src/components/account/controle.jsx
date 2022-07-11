import "./css/profile.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js';
import {useState, useEffect } from 'react';
import axios from 'axios';

import Chart2 from '../chart'

const contractAddress = '0xD3afbEFD991776426Fb0e093b1d9e33E0BD5Cd71';

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

function DisplayActions() {
	const [numtrans, setNumtrans] = useState();
    const [profit, setProfit] = useState();
    const [numdays, setNumdays] = useState(0);
    const [price, setPrice] = useState([]);
    const [color, setColor] = useState("green");

    const getPrice10Days = () => {
        let url = '/historical_price';

        axios.get(url).then((response) => {

            console.log(response.data.hprice)
            setPrice(response.data.hprice)

        });
    }
    const getTimeInvest = async() => {
        let url = '/time_invest';
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log(account)
        let data = {
            address: "0x51F29a5c52EAbFCcc5231954Ad154bf19d4BFD5b", //account,
            tokenAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7" //contractAddress
        }

        axios.post(url, data).then((response) => {
            //console.log(response.data.profit)
            var date1 = new Date(response.data.timeInvest)
            var date2 = new Date()

            //calculate time difference  
            var time_difference = date2.getTime() - date1.getTime();  
            //calculate days difference by dividing total milliseconds in a day  
            var days_difference = time_difference / (1000 * 60 * 60 * 24);  
            setNumdays(days_difference)
            setNumtrans(response.data.numTrans)
            setProfit(response.data.profit)
            if (response.data.profit < 0) {
                setColor("red")
            }

        });
    }
    const data = {
		labels: ['6/12/22', '6/13/22', '6/14/22', '6/15/22', '6/16/22', '6/17/22', '6/18/22', '6/19/22', '6/20/22', '6/21/22', '6/22/22'],
		datasets:[
			{
				label: 'Price',
				data: price.reverse(),
			}
		]

	}
	const getScan = () => {
		fetch("https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=0x3A47B8C9dee3679514781B9bC8637288147cEc7F&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=RCJJXRYSTIJT7NAAJA2IQKTQQCPBZ4ZGK4", { method: "GET" }) //, {mode:"no-cors"}
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				throw res;
			}).then(test => {
				setNumtrans(Object.keys(test.result).length);
				console.log("Transac: " + numtrans);
			}).catch(error => {
				console.error("Error: ", error)
			});
	}
	
	useEffect(() => { 
        getPrice10Days()
        getTimeInvest()

	}, [])

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
						
			</ul>
            <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pill-info" role="tabpanel" aria-labelledby="pills-info-tab">
                    <DisplayInfo numtrans={numtrans} numdays={numdays} profit={profit} color={color}/>
				</div>
				<div class="tab-pane fade" id="pill-chart" role="tabpanel" aria-labelledby="pilles-chart-tab">
                    <div class="charts">
                        <h4 style={{padding: 10 + "px"}}>Personnal Chart:</h4>
                        <p style={{color: 'green'}}>+360%, (0 USD)</p>
                        <div class="dropdown" style={{paddingBottom: 10+"px"}}>
                            <a class="btn btn-secondary btn-sm dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                Duration
                            </a>

                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <li><a class="dropdown-item" href="#">1 day</a></li>
                                <li><a class="dropdown-item" href="#">10 days</a></li>
                                <li><a class="dropdown-item" href="#">All</a></li>
                            </ul>
                        </div>
					    <Chart2 data={data}/>
                    </div>
				</div>
			</div>
		</div>
		);
}

export default DisplayActions;