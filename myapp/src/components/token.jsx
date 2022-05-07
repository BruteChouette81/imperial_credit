function Token() {
    const price = 0;
    return (
        <div>
            <h3>info about the token</h3>
            <p><strong>address:</strong> 0xD3afbEFD991776426Fb0e093b1d9e33E0BD5Cd71</p>
            <a href="https://ropsten.etherscan.io/token/0xD3afbEFD991776426Fb0e093b1d9e33E0BD5Cd71">Link to EtherScan</a>
            <p>Price: {price} ETH</p>
        </div>
    )
}
export default Token;