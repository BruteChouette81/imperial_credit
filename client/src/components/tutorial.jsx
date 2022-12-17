import tumbnail1 from './css/2022-07-11 13-31-32_Moment.jpg'
import './css/tutorial.css'

function VideoTumbnail() {
    return(
        <div className='video'>
            <div class="card">
                <img src={tumbnail1} class="card-img-top" alt="Tumbnail 1" />
                <div class="card-body">
                    <h5 class="card-title">Buying</h5>
                    <p class="card-text">An example of how to buy the Imperial Credit token</p>
                    <a href="https://youtu.be/lVfQMM8bHME" class="btn btn-primary">Watch on Youtube®</a>
                </div>
            </div>
        </div>
    )

}

function Textbase() {
    return (
        <div class="textbase">
            <h4>Text-base tutorial: </h4>
            <h5>First, you need to get a <a href="https://ethereum.org/en/wallets/find-wallet/">wallet</a>. we recommend <a href="https://metamask.io/download.html">MetaMask</a> for In-Browser connection. </h5>
            <h5>Once you got a wallet, you need to buy Ethereum, since the CREDITS run on ETH blockchain.</h5>
            <h5>When you've got enough Ethereum, you can go to any decentralize exchange (we recommend <a href="https://app.uniswap.org/#/swap?chain=mainnet">Uniswap v3</a> for it's user friendly app). </h5>
            <h5>If you don't find the token by searching, you can copy the address in the <a href="/Token">Token page</a></h5>
            <h5>Warning! make sure it's the good token before making a purchase!</h5>
            <h5>Finally, you can see in MetaMask the amount of tokens you bought. You are now free to use them!</h5>
        </div>
    )
}

//<div class="col-sm-6">
//  <VideoTumbnail />
//</div>
function Tutorial() {
    //style={{backgroundColor: "grey"}}
    return (
        <div class="Tutorial">
            <div className="container" > 
                <div class="row">
                    <div class="col">
                        <h3>Getting Started: </h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <VideoTumbnail />
                    </div>
                    
                </div>
            </div>
            <div className='container'>
                <Textbase />
            </div>
        </div>
    )
}

export default Tutorial;