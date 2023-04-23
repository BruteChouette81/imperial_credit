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
            <div class="tokenomics">
                <div class="token-intro" >
                    <h1>More about the project... </h1>
                    <br />
                    <h2 id="title">Tokenomics of the $CREDIT</h2>
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
                                    <p id="address"> 0x6CFADe18df81Cd9C41950FBDAcc53047EdB2e565 </p>
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
                        <h5>
                            The Imperial Market is using the Decentralized technology to offer to everyone an access to a new type of more profitable way of making online business. 
                            More precisly, we propose a market of real and virtual items that allows anyone to buy and sell those in the currency they want (support of fiat and cryptocurrency). 
                            Our goal is to solve a lot of today's online markets problems by providing a new model that allows a transition from the old "centralized" system to the new decentralized one.
                            All the technical informations are in the White Paper.
                        </h5>
                        <button onClick={whitepaper} class="btn btn-primary btn-lg">White Paper</button>
                    </div>
                    <div className="explain">
                        <h3>Why the $CREDIT?</h3>
                        <h5>
                            Imperial Market: accessibility, security and usefullness... <br />
                            Like mention in the White Paper, the $CREDIT is a very usefull token that has the main goal to securize transactions between a buyer and a seller. 
                            It is mainly use as a transfer token in order for users to pay and receive in the currency they want and to still have secure transactions.
    
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
                                        <p>Virtual Tickets will be sell in the Imperial Market for online contest, events, access to website and much more!</p>
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