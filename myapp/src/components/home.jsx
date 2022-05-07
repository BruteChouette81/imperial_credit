
import { ethers } from 'ethers';
import Credit from '../artifacts/contracts/token.sol/credit.json';

const contractAddress = '0xD3afbEFD991776426Fb0e093b1d9e33E0BD5Cd71';

//0x5FbDB2315678afecb367f032d93F642f64180aa3
const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(contractAddress, Credit.abi, signer);

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
        window.location.replace("") // url for launchpad 
    }
    return (
        <div>
            <h1>The official Imperial Token will launch soon!</h1> 
            <button onClick={buying}>Buy credit</button>
        </div>
    ) // print data of launching
};
// make a nav bar to navigate easily between page ( home, about, price tracker, profile)

function Home() {
    return(
        <div>

            <BuyCredit />
        </div>
    )

}

/// function display text
export default Home;