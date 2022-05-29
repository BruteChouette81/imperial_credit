import React from 'react'
import { Chart } from 'react-charts'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/intro.css'
import './css/home.css'
import './css/idea.css'
import './css/pricing.css'

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
                <div class="card-body" style={{borderStyle: "solid", color: "black"}}>
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
        <div class="row">
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
    const data = React.useMemo(
        () => [
          {
            label: 'Price',
            data: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]
          }
        ],
        []
    )
     
    const axes = React.useMemo(
        () => [
          { primary: true, type: 'linear', position: 'bottom' },
          { type: 'linear', position: 'left' }
        ],
        []
    )

    return(
        <div class="pricing">
            <h1>$CREDIT price:</h1>
            <h5>Actual price: 0.000000 USD</h5>
            <div class="pricing-chart">
                <Chart data={data} axes={axes} />
            </div>
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
        </div>
    )

}

/// function display text
export default Home;