import React, { useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/intro.css'
import './css/home.css'
import './css/idea.css'
import './css/faq.css'
import { API } from 'aws-amplify';



function BuyCredit() {
    // put buy logic here with wyre api

    const buying = () => {
        window.location.replace("/Tutorial") // url for launchpad https://app.uniswap.org/#/swap?chain=mainnet
    }
    const about = () => {
        window.location.replace("/Token") // url for launchpad 
    }
    const connectOneClick = () => {
        window.location.replace("/Account")
    }
    return (
        <div>
            <div class="d-grid gap-2 d-md-block">
                <button onClick={connectOneClick} class="btn btn-success btn-lg">Connectez-vous en un clique!</button>
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
        window.location.replace("/") // change to idea page
    }
    //represents the currency from the famous Sci-Fi movie, Star Wars
    return(
        <div class="idea">
            <h3>L'idee: </h3> 
            <h5>La gallerie de Simon est un marche en ligne base sur des technologies futuriste afin de pouvoir vendre de facon securitaire et a prix resonnable de l'art. <br/> Connectez-vous en un seul clique! </h5>
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
            <h2>Bienvenue sur L'Atelier De Simon </h2>
            <h3>Une gallerie en ligne permettant l'achat de toiles </h3>
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
        <h1>Mise a jour:</h1>
        <h3>Que ce passe-t-il?</h3>
        <br />
		<div class="row" style={{leftMargin: 50 + "px"}} >
            <Carding title="Platform is launched!" text="The platform is now open to everyone! Connect to get access to our market." link="/Account" button="Connect"/>
            <Carding title="New features" text="New features are coming! Follow us on Twitter so you don't miss a thing" link="https://twitter.com/ImperialT0ken" button="Twitter"/>
            <br />
            <Carding title="Already have an account ?" text="If you already have an account, you can connect directly to the Market!" link="/market" button="Join!" />
        </div>
        
    </section>
    )
}


function Q() {
    return (
        <div class="faq">
            <h3>Des Questions ? Vistez notre section <a href="/FAQ">FAQ</a> !</h3>
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
			<Q />
        </div>
    )

}

/// function display text
export default Home;
