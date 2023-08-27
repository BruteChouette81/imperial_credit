import "./css/token.css"

function Token() {
    const holders = 5; 
    const etherscan = () => {
        window.location.replace("https://etherscan.io/token/0x6CFADe18df81Cd9C41950FBDAcc53047EdB2e565")
    }
    const upcoming = () => {
        alert("Upcoming feature! We are working on it")
    }
    const liquidity = () => {
        window.location.replace("/liquidity")
    }
    const whitepaper = () => {
        window.location.replace("/whitepaper") // change to idea page
    }
    //find a chart site
    //white paper link
    if (window.screen.width > 900) {
        return (
            <div class="about">
                <div class="about-intro" >
                    <h1> About CPL </h1>
                    <h5> Information and documentation</h5>
                    <br />
                </div>
                <div>
                    <div class='why-site'>
                        <h3>Introduction</h3>
                        <h5>
                            In this documentation, we will dicuss what is the Centralized Payment Ledger and what are its advantages. If you wish to explore this technology in more details, read our  <a href="/whitepaper">whitepaper</a>. 
                            <br />
                            <br />
                            So, let's get started! What is the CPL you might ask ? The Centralized Payment Ledger (or more frenquently refered as its acronym: CPL) is a new way of executing and validating transactions. The CPL approach is based on Peer-to-Peer technology which allow 3 big things; 
                            1: the CPL payment provider allows the lowest fee possible on transaction, 2: using our validation protocol, it achieves the greatest level of security possible, 3: the CPL has the potential
                            to became the most accessible payment system, since it can handle approximately any methot of payment or currency (either it is classic money or crypto-currencies). 
                            
                        </h5>
                        
                    </div>
                    <div className="why-account">
                        <h3>Transaction model</h3>
                        <h5>
                            How can the CPL reduces its fee down to near 0% while not offering a new structure in how payments are made? Well, while making this research, we discover that using Peer-to-Peer technology, we could distribute the system
                            between users. But how can this principle apply to payment? Well, using our participation program, users who get payed can take part in our system in order to lower their fees. This participation is extremely profitable for a user, since he can reduce his fee down
                            to 0% in matters of weeks. For more information on how our P2P pools function, check out our research paper! 
                        </h5>
                    </div>
                    <div className="why-account">
                        <h3>Transparency / Security</h3>
                        <h5>
                           Since our system utilize the power of distributated network, it allows for payment to be validated accross thousand of nodes (either on blockchains or on our ledger), which in itself, is the best way to validate a transaction. Also, like the name of our system
                           suggests, we have our own Ledger of transactions, which not only allows to track and verify transactions, but to confirm that all the fees are redistributed between users. This Ledger is public and anyone can have access to it, so it allows and extra level of transparency.
    
                        </h5>
                        
                    </div>
                    <div className="why-account">
                        <h3>Blockchain</h3>
                        <h5>
                           The CPL system is directly connected with blockchain technology, without, however, depending on it. So, in other words, CPL can utilize blockchain power without relying totaly on its functionnment. This feature allow decentralized marketplaces to connect to the CPL and use its full potential while not having to use a bridge such as an Oracle. For more information about how we use blockchain, we recommend you to read our research paper! 
    
                        </h5>
                        
                    </div>
                    
                </div>
            </div>
            
                    
                    
        )
    }
    
    else {
        return (
            <div class="tokenomics">
                <div class="token-intro" >
                    <h1>A long long time ago in a galaxy far far away...</h1>
                    <br />
                    <h2 id="title">Tokenomics</h2>
                    <div class="token-info">
                        <div class="container">
                            <div class="row">
                                <div class="col">
                                    <p>Address:</p>
                                </div>
                                <div class="col">
                                    <p>Decimals: </p>
                                </div>
                                <div class="col">
                                    <p>Total supply: </p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <p id="address"> 0x6CFADe18... </p>
                                </div>
                                <div class="col">
                                    <p> 5 </p>
                                </div>
                                <div class="col">
                                    <p> 2 G </p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <p>Num. Holders: </p>
                                </div>
                                <div class="col">
                                    <p>Symbol: </p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <p> {holders} </p>
                                </div>
                                <div class="col">
                                    <p> $CREDIT </p>
                                </div>
                            </div>
                        </div>
                        <div class="d-grid gap-2 col-3 mx-auto">
                            <button onClick={etherscan} class="btn btn-primary btn-md">EtherScan</button>
                            <button onClick={upcoming} class="btn btn-primary btn-md">Charts</button>
                        </div>
                    </div>
                </div>
                <div>
                    <div class='whitepaper'>
                        <h3>The Project:</h3>
                        <h5>The Imperial Token($CREDIT) is an Ethereum-based token that has the main goal to create a crypto token that is easy to access, while being a safe and pseudo-anonymous decentralized application. 
                            The ImperialDAO(web-app) is the Dapp that allow holders to use the token at its full potential. Also, The ImperialDAO puts individual at its center. In-fact, all the users have a full control of their identity and their data (which is, according to TBD
                            web 5.0 the most secure and decentralized web).
                            All the technical informations are in the White Paper.
                        </h5>
                        <button onClick={whitepaper} class="btn btn-primary btn-lg">White Paper</button>
                    </div>
                    <div className="explain">
                        <h3>Why the $CREDIT?</h3>
                        <h5>
                            ImperialDAO: accessibility, security and usefullness... <br />
                            Like mention in the White Paper, the $CREDIT is a usefull and secure token that highly value the privacy of user's data. 
                            Today, The users can only perform DEFI actions like swap and liquidity providing in any DEX (ex: uniswap), but 
                            soon enough, in ImperialDAO 2.0 (see our <a href="/Token#plan">RoadMap</a> for more informations), tones of functionnality related to the $CREDIT will be implemented (see our White Paper for more information about our vision of the future).
                            In the version 2.0 of the DAO, users could use their tokens in our <a href="#MarketModal" data-bs-toggle="modal" data-bs-target="#MarketModal">special market</a> to buy virtual and real-world items. Users could also buy <a href="#TicketModal" data-bs-toggle="modal" data-bs-target="#TicketModal">tickets</a> to participate to online contests, bid on 
                            collectible items with the integrated Market's actions and much more.
    
                        </h5>
                        <button onClick={liquidity} class="btn btn-primary btn-lg">How to participate</button>
                        <div class="modal fade" id="MarketModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{color:"black"}}>
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Imperial Market</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <p>The Imperial Market will soon release... you can check our twitter or our news section to stay updated!</p>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div class="modal fade" id="TicketModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{color:"black"}}>
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Digital Tickets</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <p>Virtual Tickets will be sell in the Imperial Market for online contest, win prices or collectibles and much more!</p>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='plan'>
                        <h3>Our RoadMap (plan): </h3>
                        <div class="container">
                            <div class="row">
                                <div class="col">
                                    <h5>Phase 1:</h5>
                                </div>
                                <div class="col">
                                    <h5>Phase 2:</h5>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <p>  ImperialDAO 1.0 </p>
                                </div>
                                <div class="col">
                                    <p>  ImperialDAO 2.0 </p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <p> WebApp and Mobile app </p>
                                </div>
                                <div class="col">
                                    <p> <a href="/Account">Imperial Account</a> Basic functionnalities </p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <p> Token release (first 20% dropped) </p>
                                </div>
                                <div class="col">
                                    <p>  Basic <a href="/Upcoming">Imperial Market</a> to use $CREDIT </p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <p> List To DEX(Uniswap, ...) </p>
                                </div>
                                <div class="col">
                                    <p>  List Token to CEX like Binance and Kraken </p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <p> release v1 whitepaper</p>
                                </div>
                                <div class="col">
                                    <p>  release full documentation for developpers and users</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}
export default Token;