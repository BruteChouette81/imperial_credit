import {useState, useEffect } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';

import Credit from '../../artifacts/contracts/token.sol/credit.json';
import default_profile from "./profile_pics/default_profile.png"

import "./css/profile.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Install from '../install';
import Chart2 from '../chart'


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

function Settings() {
    const [image, setImage] = useState(null);

    const [account, setAccount] = useState();

    const getAccount = async () => {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(account)
    };
    getAccount()

    function handleChange(event) {
        setImage(event.target.files[0])
        console.log(image.name)
    }

    function handleSubmit(event) {
        event.preventDefault()
        const url = '/uploadFile';
        const formData = new FormData();
        formData.append('fileName', account);
        formData.append('file', image);
        
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        };
        axios.post(url, formData, config).then((response) => {
          console.log(response.data);
        });
    
      }
    
    return(
        <div>
            <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                Button with data-bs-target
            </button>

            <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" style={{textAlign: 'start'}}>
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasExampleLabel">Settings</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <div style={{paddingBottom: 30 + 'px' }}>
                        <h3 style={{color: 'black'}}>Customize your profile</h3>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <label for='profilepic' style={{color: 'black'}}> Change your profile picture: </label>
                            <input type='file' id='profilepic' name='profilepic' accept='image/png, image/jpeg' style={{color: 'black'}} onChange={handleChange}/>
                            <input type="submit" value="Submit"/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

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
				console.log("Transac: " + Object.keys(transac.result).length);
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
	const [numtrans, setNumtrans] = useState();
    const data = {
		labels: ['6/12/22', '6/13/22', '6/14/22', '6/15/22', '6/16/22', '6/17/22', '6/18/22', '6/19/22', '6/20/22', '6/21/22', '6/22/22'],
		datasets:[
			{
				label: 'Price',
				data: [0.000012, 0.00002, 0.000027, 0.000021, 0.000043, 0.000048, 0.00005, 0.000047, 0.000051, 0.000062, 0.00007],
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
		getScan()
	})

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
                                <td class="table-dark">{numtrans}</td>
                                        
                            </tr>
                        </tbody>
					</table>
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
                <Settings />
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
