import "./css/token.css"

function Token() {
    const etherscan = () => {
        window.location.replace("https://ropsten.etherscan.io/token/0xD3afbEFD991776426Fb0e093b1d9e33E0BD5Cd71") // url for launchpad 
    }
    return (
        <div class="tokenomics">
            <div class="token-intro" style={{marginLeft: 20 + 'px'}}>
                <h1>A long long time ago in a galaxy far far away...</h1>
                <h2>a Star Wars token</h2>
                <p><strong>address:</strong> 0xD3afbEFD991776426Fb0e093b1d9e33E0BD5Cd71</p>
                <div class="d-grid gap-2 col-3 mx-auto">
                    <button onClick={etherscan} class="btn btn-primary btn-lg">See $CREDIT on EtherScan</button>
                    <button class="btn btn-primary btn-lg">Charts</button>
                </div>
            </div>
            <h5>The Imperial Token($CREDIT) is an ethereum token that has the main goal to represent the famous Star Wars money. There are tones of things you can do with the 
                $CREDIT. You can use it on our <a href="">special market</a> to buy star wars items. you can use it to buy <a href="">tickets</a> for online lottery, you can also bid on 
                collectible items with the <a href="">hunting</a> action!
            </h5>
        </div>
    )
}
export default Token;