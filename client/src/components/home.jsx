import React, { useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/intro.css'
import './css/home.css'
import './css/idea.css'
import './css/pricing.css'
import './css/faq.css'
import Chart2 from './chart'
import DisplayPrice from './gettoken'
import axios from 'axios';


function BuyCredit() {
    // put buy logic here with wyre api

    const buying = () => {
        window.location.replace("/Tutorial") // url for launchpad https://app.uniswap.org/#/swap?chain=mainnet
    }
    const about = () => {
        window.location.replace("http://localhost:3000/Token") // url for launchpad 
    }
    return (
        <div>
            <div class="d-grid gap-2 d-md-block">
                <button onClick={buying} class="btn btn-primary btn-lg" style={{marginRight: 10 + "px"}}>Buy $CREDIT</button>
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


function Idea() {
    const learn = () => {
        window.location.replace("/About") // change to idea page
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
        let url = '/historicalPrice'
        API.get('server', url).then((response) => {
            setPrice(response.data.lprice)
          })
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
