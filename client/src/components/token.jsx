import "./css/token.css"

function Token() {
    const holders = 0; 
    const etherscan = () => {
        window.location.replace("https://ropsten.etherscan.io/token/0xD3afbEFD991776426Fb0e093b1d9e33E0BD5Cd71")
    }
    const upcoming = () => {
        alert("Upcoming feature! We are working on it")
    }
    //find a chart site
    //white paper link
    return (
        <div class="tokenomics">
            <div class="token-intro" style={{marginLeft: 20 + 'px'}}>
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
                                <p id="address"> 0xD3afbEFD991776426Fb0e093b1d9e33E0BD5Cd71 </p>
                            </div>
                            <div class="col">
                                <p> 18 </p>
                            </div>
                            <div class="col">
                                <p> 2 B </p>
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
                    <h5>The Imperial Token($CREDIT) is an Ethereum-based token that has the main goal to represent the famous Star Wars money, while being a safe and pseudo-anonymous decentralized application. 
                        The ImperialDAO(web-app) is the Dapp that allow holders to use the token at its full potential. Aslo, The ImperialDao puts individual in his center. In-fact, all the users have a full control of their identity and the owner of their data (which is, according to Tbd
                        web 5.0 the most secure and decentralized web).
                        All the technical informations are in the White Paper.
                    </h5>
                    <button onClick={upcoming} class="btn btn-primary btn-lg">White Paper</button>
                </div>
                <div className="explain">
                    <h3>Why the $CREDIT?</h3>
                    <h5>
                        ImperialDAO: security, privacy and usefullness... <br />
                        Like mention in the White Paper, the $CREDIT is a usefull and secure token that value the privacy of user's data. 
                        Today, The users can only perform DEFI actions like buy and trade in any DEX (ex: uniswap), but
                        soon enough, in ImperialDAO 2.0 (see our <a href="#plan">MoonMap</a> for more informations), tones of functionnality related to the $CREDIT will be implemented (see our White Paper for more information about our vision of the future).
                        In IMP 2.0, users could use their tokens in our <a href="#MarketModal" data-bs-toggle="modal" data-bs-target="#MarketModal">special market</a> to buy virtual and real-world items. Users could also buy <a href="#MarketModal" data-bs-toggle="modal" data-bs-target="#MarketModal">tickets</a> for online lottery, bid on 
                        collectible items with the integrated Market's actions and much more.

                    </h5>
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
                                    <p>Virtual Tickets will be sell in the Imperial Market for online lottery and contest to win collectible.</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='plan'>
                    <h3>Our MoonMap (plan): </h3>
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
                                <p> WebApp </p>
                            </div>
                            <div class="col">
                                <p> <a href="/Profile">Imperial Account</a> Basic functionnalities </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <p> Token </p>
                            </div>
                            <div class="col">
                                <p>  Basic <a href="/Upcoming">Imperial Market</a> to use our Tokens </p>
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
export default Token;