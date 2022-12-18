import React, { useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/intro.css'
import './css/home.css'
import './css/idea.css'
import './css/pricing.css'
import './css/faq.css'
import Chart2 from './chart'
import DisplayPrice from './gettoken'
import { API } from 'aws-amplify';

import metaimg from './css/thjpg.jpg'
import uni from './css/uniswap1647861012114.png'


function BuyCredit() {
    // put buy logic here with wyre api

    const buying = () => {
        window.location.replace("/Tutorial") // url for launchpad https://app.uniswap.org/#/swap?chain=mainnet
    }
    const about = () => {
        window.location.replace("/Token") // url for launchpad 
    }
    return (
        <div>
            <div class="d-grid gap-2 d-md-block">
                <button onClick={buying} class="btn btn-primary btn-lg" style={{marginRight: 10 + "px"}}>How to buy $CREDIT</button>
                <button onClick={about} class="btn btn-primary btn-lg">About the project</button>
            </div>
        </div>
    )
};


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


function Compatible() {
    return (
        <div className='compatible'>
            <h2>Compatible with: </h2>
            <div class="container">
                <div class="row">
                    <div class="col">
                        <a href='https://metamask.io/'>
                            <img id="metaimg" src={metaimg} alt="" /> 
                        </a>
                        
                    </div>
                    <div class="col">
                        <a href="https://uniswap.org/">
                            <img id="uniimg" src={uni} alt="" /> 
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}


function Idea() {
    const learn = () => {
        window.location.replace("/whitepaper") // change to idea page
    }
    //represents the currency from the famous Sci-Fi movie, Star Wars
    return(
        <div class="idea">
            <h3>The idea:</h3> 
            <h5>The Imperial Token is an Ethereum smart contract who is part of a new way of decentralizing . Our slogan: a galaxy worth of opportunities! </h5>
            <button onClick={learn} class="btn btn-primary btn-lg">Learn more!</button>
        </div>
    )
}

function Intro() {
    return(
        //by Star Wars fan for Star Wars fans
        //future of decentralization
        //for movie fans
        <section class="intro">
            <h2>First 20% is dropped! </h2>
            <h3>New way of seeing decentralization</h3>
            <BuyCredit />
            <Idea />
        </section>
        
    )
}

function Update() {
    //<br />
    //<div class="row">
    //  <Carding title="test1" text="test" link="#" button="test"/>
    //</div>

    //<Carding title="Token is out!" text="You can now buy our token on decentralize exchanges" link="" button="Buy!" />
    return(
    <section class="update">
        <h1>Updates:</h1>
        <h3>See what's new!</h3>
        <br />
		<div class="row" style={{leftMargin: 50 + "px"}} >
            <Carding title="Token is launched!" text="The first 20% of the $CREDITs are out! Want to be part of the project?" link="/liquidity" button="Learn how to invest!"/>
            <Carding title="New features" text="New features are coming! Follow us on Twitter so you don't miss a thing" link="https://twitter.com/ImperialT0ken" button="Twitter"/>
            <br />
            <Carding title="Community" text="New community tab! Blog posts are coming soon!" link="/community" button="Join!" />
        </div>
        
    </section>
    )
}
function Pricing() {
    const unreleased = [0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05,0.05];
    const [price, setPrice] = useState([]);
    const [date, setDate] = useState([]);
    const dates = [];

    /*
    const getHPrice = () => {
        let url = '/historical_price';

        axios.get(url).then((response) => {

            console.log(response.data.hprice)
            setPrice(response.data.hprice.reverse())

        });
    }
    */

    const getHPrice = () => {
        let date0 = new Date();
        dates.push(date0.getDate())
        let date1 = new Date(date0)
        for (let i = 0; i < 9; i++) {
            date1.setDate(date1.getDate() - 1)
            dates.push(date1.getDate())
        }
        setDate(dates.reverse())
        let url = '/historicalPrice'
        API.get('server', url).then((response) => {
            console.log(response.hprice)
            setPrice(response.hprice.reverse())
          })
    }


    const data = {
		labels: date, //['6/12/22', '6/13/22', '6/14/22', '6/15/22', '6/16/22', '6/17/22', '6/18/22', '6/19/22', '6/20/22', '6/21/22', '6/22/22'],
		datasets:[
			{
				label: 'Price',
				data: unreleased, //price
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
            <Compatible />
            <br />
			<Q />
        </div>
    )

}

/// function display text
export default Home;
