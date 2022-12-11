import { useWeb3React } from "@web3-react/core"
import injected from './connector.js'
import {useState} from 'react';
import { ethers } from 'ethers';

import icon from './css/metamask.02e3ec27.png'
import Credit from '../../artifacts/contracts/token.sol/credit.json';
import './css/account.css'

import Profile from "./profile";

const contractAddress = '0x6CFADe18df81Cd9C41950FBDAcc53047EdB2e565';

const getContract = (injected_prov) => {
    const provider = new ethers.providers.Web3Provider(injected_prov);

    // get the end user
    const signer = provider.getSigner();

    // get the smart contract
    const contract = new ethers.Contract(contractAddress, Credit.abi, signer);
    return contract
}

function Account() {
    const { active, account, activate } = useWeb3React()
    const [credit, setCredit] = useState()

    async function connect() {
        try {
            let provider = await injected.getProvider()
            let credits = getContract(provider)
            setCredit(credits)
            await activate(injected)

            
        } catch (ex) {
            alert(ex)
            console.log(ex)
        }
    }

    return(
        
        <div className="account-setup">
                {active ? (
                <Profile account={account} credit={credit} />
                    
                ) : (
                    <div className="connection">
                        <h4>Connect your Wallet</h4>
                        <br />
                        <button className="btn  btn-primary" onClick={connect} >
                            <div className="icon">
                                <img src={icon} alt="icon" />
                            </div>
                            MetaMask
                            
                        </button>

                    </div>
                    
                )} 
        </div>
    )
}

export default Account;