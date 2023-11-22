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
                            In this documentation, we will dicuss what is the Centralized Payment Ledger and what are its advantages. If you wish to explore this technology in more details, read our  <a href="https://drive.google.com/file/d/1J0zWu2maYsf6AoP6FMjcIqrLnhg52C-1/view?usp=drive_link">whitepaper</a>. 
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
export default Token;