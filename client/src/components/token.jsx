function Token() {
    const etherscan = () => {
        window.location.replace("https://ropsten.etherscan.io/token/0xD3afbEFD991776426Fb0e093b1d9e33E0BD5Cd71") // url for launchpad 
    }
    return (
        <div style={{marginLeft: 20 + 'px'}}>
            <h1>Star Wars Token</h1>
            <p><strong>address:</strong> 0xD3afbEFD991776426Fb0e093b1d9e33E0BD5Cd71</p>
            <div class="d-grid gap-2 col-3">
                <button onClick={etherscan} class="btn btn-primary btn-lg">See $CREDIT on EtherScan</button>
                <button class="btn btn-primary btn-lg">Charts</button>
            </div>
        </div>
    )
}
export default Token;