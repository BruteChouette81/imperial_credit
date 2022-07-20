import "./css/token.css"

function Token() {
    const etherscan = () => {
        window.location.replace("https://ropsten.etherscan.io/token/0xD3afbEFD991776426Fb0e093b1d9e33E0BD5Cd71")
    }
    //find a chart site
    //white paper link
    return (
        <div class="tokenomics">
            <div class="token-intro" style={{marginLeft: 20 + 'px'}}>
                <h1>A long long time ago in a galaxy far far away...</h1>
                <div class="token-info">
                    <div class="container">
                        <div class="row">
                            <div class="col">
                                <h5>Address:</h5>
                            </div>
                            <div class="col">
                                <h5>Decimals: </h5>
                            </div>
                            <div class="col">
                                <h5>Total supply: </h5>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <p> 0xD3afbEFD991776426Fb0e093b1d9e33E0BD5Cd71 </p>
                            </div>
                            <div class="col">
                                <h5> 18 </h5>
                            </div>
                            <div class="col">
                                <h5> 1000000 </h5>
                            </div>
                        </div>
                    </div>
                    <div class="d-grid gap-2 col-3 mx-auto">
                        <button onClick={etherscan} class="btn btn-primary btn-lg">See $CREDIT on EtherScan</button>
                        <button class="btn btn-primary btn-lg">Charts</button>
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
                    <button class="btn btn-primary btn-lg">White Paper</button>
                </div>
                <div className="explain">
                    <h3>Why the $CREDIT?</h3>
                    <h5>
                        Like mention in the White Paper, the $CREDIT is a usefull token. 
                        Today, The users can only perform DEFI actions like buy and trade in any DEX (ex: uniswap), but
                        soon enough, in ImperialDAO 2.0 (see our <a href="">MoonMap</a>), tones of functionnality related to the $CREDIT will be implemented (see our White Paper for more information about our vision of the future).
                        In IMP 2.0, the users could use the token on our <a href="">special market</a> to buy virtual and real-world items. Users could also buy <a href="">tickets</a> for online lottery, bid on 
                        collectible items with the <a href="">hunting</a> action and a lot more.
                    </h5>
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
                        </div>
                        <div class="row">
                            <div class="col">
                                <p> Token </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <p> List To DEX(Uniswap, ...) </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Token;