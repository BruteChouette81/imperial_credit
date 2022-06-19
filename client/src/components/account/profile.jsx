import {useState, useEffect } from 'react';

import { ethers } from 'ethers';
import Credit from '../../artifacts/contracts/token.sol/credit.json';
import default_profile from "./profile_pics/default_profile.png"
import "./css/profile.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Install from '../install';
const contractAddress = '0xD3afbEFD991776426Fb0e093b1d9e33E0BD5Cd71';

//0x5FbDB2315678afecb367f032d93F642f64180aa3
const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(contractAddress, Credit.abi, signer);
//4C62fC52D5Ad4c827feb97684bA612288eE9507

//paste parameters to connect with the good address
//TODO: create a function that can get information from etherscan (graph, holders, price, transaction(actions?)) 
function Ethertest() {
	const [transac, setTransac] = useState();
	const getScan = () => {
		fetch("https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=0x3A47B8C9dee3679514781B9bC8637288147cEc7F&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=RCJJXRYSTIJT7NAAJA2IQKTQQCPBZ4ZGK4", { method: "GET" }) //, {mode:"no-cors"}
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				throw res;
			}).then(test => {
				setTransac(test);
				console.log("Transac: " + transac.result[0].hash);
			}).catch(error => {
				console.error("Error: ", error)
			});
	}

	return(
		<div>
			<button onClick={getScan} class="btn btn-primary">test Etherscan</button>
		</div>

	)
}

function DisplayActions() {
	return(
		<div>
			<p>	
				<button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseInfo" aria-expanded="false" aria-controls="collapseInfo"> 
					Info 
				</button>
                <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseChart" aria-expanded="false" aria-controls="collapseCharts">
                    Charts
                </button>
                <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" disabled>
                    Actions
                </button>
			</p>
			<div class="row">
                <div class="col">
                    <div class="collapse multi-collapse" id="collapseInfo" style={{marginLeft: 400+"px"}}>
                        <div class="card bg-dark card-body">
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
                                        <td class="table-dark">0</td>
                                        
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="collapse multi-collapse" id="collapseChart" style={{marginRight: 400 +"px"}}>
                        <div class="card card-body">
                            
                        </div>
                    </div>
                </div>
            </div>
		</div>
	);
}

function ShowAccount() {

    const [account, setAccount] = useState();

    const getAccount = async () => {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(account)
    };
    getAccount();

    return (
        <div>
            <h5>Your Account: {account}</h5>
        </div>
    )


};
function ShowBalance() {

    const [balance, setBalance] = useState();
    
    const getBalance = async () => {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log(account)
        const balance = await contract.balanceOf(account);
        console.log(parseInt(balance))
        setBalance(parseInt(balance));
    }

    return (
        <div>
            <h5>Your Balance: {balance} $CREDIT, (0 USD)</h5>
            <button onClick={getBalance} class="btn btn-primary">get balance</button>
        </div>
    )
};

function Profile() {
    const [back, setBack] = useState('white')
    const [img, setImg] = useState('white')

    //useEffect(() => {alert("Starting the webapp... need to connect to Metamask");})
    const getAddress = async () => {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        fetch("/connection", {
        
            // Adding method type
            method: "POST",
            
            // Adding body or contents to send
            body: JSON.stringify({
                address: account
            }),
            
            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }) //, {mode:"no-cors"}
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            throw res;
        }).then(test => {
            setBack(test.bg);
            setImg(test.img);

        }).catch(error => {
            console.error("Error: ", error)
        })
    }

    useEffect(() => {
        getAddress();
    })
    if (window.ethereum) {
        
        return(
            <div class='profile'>
                <div class='banner' style={{backgroundColor: back}}>
                    <img alt="" src={default_profile} id="profile_img" style={{backgroundColor: img}} />
                </div>
                <ShowAccount />
				<ShowBalance />
				<br />
				<Ethertest />
				<br />
				<DisplayActions />

                
            </div>
        )
    } else {
        return <Install />
  }
}

export default Profile;
