import React, { useEffect, useState} from 'react'
import { useMoralisWeb3Api } from "react-moralis";
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/intro.css'
import './css/home.css'
import './css/idea.css'
import './css/pricing.css'
import './css/faq.css'
import Chart2 from './chart'
import DisplayPrice from './gettoken'
import axios from 'axios';

/* 
add background imperial 

1: explain + info

2: when connect --> balance (on menu)

3: buy the token 
    a) with fiat currenties 
    b) with ethereum

*/


function BuyCredit() {
    // put buy logic here with wyre api

    const buying = () => {
        window.location.replace("https://app.uniswap.org/#/swap?chain=mainnet") // url for launchpad 
    }
    const about = () => {
        window.location.replace("http://localhost:3000/About") // url for launchpad 
    }
    return (
        <div>
            <div class="d-grid gap-2 d-md-block">
                <button onClick={buying} class="btn btn-primary btn-lg" style={{marginRight: 10 + "px"}}>Buy $CREDIT</button>
                <button onClick={about} class="btn btn-primary btn-lg">About the project</button>
            </div>
        </div>
    ) // print data of launching
};
// make a nav bar to navigate easily between page ( home, about, price tracker, profile)
function Carding({title, text, link, button}) {
    return(
        <div class="col-sm-6">
			<div class="card">
                <div class="card-body">
                    <h5 class="card-title" style={{color: "black"}}>{title}</h5>
                    <p class="card-text" style={{color: "black"}}>{text}</p>
                    <a href={link} class="btn btn-primary">{button}</a>
                </div>
            </div>
        </div>
    )
}

function Idea() {
    const learn = () => {
        window.location.replace("http://localhost:3000/About") // change to idea page
    }
    return(
        <div class="idea">
            <h3>The idea:</h3>
            <h5>The Imperial Credits is an Ethereum token that represents the currency from Star Wars. Our slogan: a galaxy worth of opportunities! </h5>
            <button onClick={learn} class="btn btn-primary btn-lg">Learn more!</button>
        </div>
    )
}

function Intro() {
    return(
        <section class="intro">
            <h2>The official Imperial Token will launch soon!</h2>
            <h3>Made by Star Wars fan for Star Wars fans</h3>
            <BuyCredit />
            <Idea />
        </section>
        
    )
}
function Update() {
    return(
    <section class="update">
        <h1>Updates:</h1>
        <h3>See what's new!</h3>
        <br />
		<div class="row" style={{leftMargin: 50 + "px"}} >
            <Carding title="test" text="test" link="#" button="test"/>
            <Carding title="test1" text="test" link="#" button="test"/>
        </div>
        <br />
        <div class="row">
            <Carding title="test1" text="test" link="#" button="test"/>
        </div>
    </section>
    )
}
function Pricing() {

    const [price, setPrice] = useState([]);

    const getHPrice = () => {
        let url = '/historical_price';

        axios.get(url).then((response) => {

            console.log(response.data.hprice)
            setPrice(response.data.hprice)

        });
    }
    /*
    const getfordays = () => {
        let date0 = new Date();
        let date1 = new Date(date0)
        setPrice([])
        for (let i = 0; i < 10; i++) {
            date1.setDate(date1.getDate() - 1)
            console.log(date1)
            
            var block = fetchDateToBlock(date1)
            setTimeout(() => {console.log(block)}, 500)
        }

    }

    const hitoricalFetchPrice = async (block) => {
        //Get metadata for an array of tokens. Ex: USDT and USDC tokens on BSC
        const options = {
            address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
            chain: "eth",
            to_block: block

        };
        const tokenprice = await Web3Api.token.getTokenPrice(options);
        console.log(tokenprice["usdPrice"]);
        setPrice(prevPrice => [...prevPrice, tokenprice["usdPrice"]])
        //setPrice(price["usdPrice"])
    };

    //get block number (historical)
    const fetchDateToBlock = async(somedate) => {
        const options = { chain: "eth", date: somedate};
        const date = await Web3Api.native.getDateToBlock(options);
        console.log(date);
        hitoricalFetchPrice(date["block"])
        return date
    };
    */

    const data = {
		labels: ['6/12/22', '6/13/22', '6/14/22', '6/15/22', '6/16/22', '6/17/22', '6/18/22', '6/19/22', '6/20/22', '6/21/22', '6/22/22'],
		datasets:[
			{
				label: 'Price',
				data: price.reverse(),
			}
		]

	}
    useEffect(() => {
        getHPrice();
    }, [])

    return(
        <div class="pricing">
            <h1>$CREDIT price:</h1>
            <DisplayPrice />
            <div class="pricing-chart">
                <Chart2 data={data} />
            </div>
        </div>
    )
}

function Q() {
    return (
        <div class="faq">
            <h3>Any question? Check-out our <a href="/FAQ">FAQ</a> section!</h3>
        </div>

    )
}
function Home() {
    
    return(
        <div class="main">
            <Intro />
            <br />
            <Update/>
            <br />
            <Pricing/>
            <br />
			<Q />
        </div>
    )

}

/// function display text
export default Home;
