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
    //white paper link https://drive.google.com/file/d/1J0zWu2maYsf6AoP6FMjcIqrLnhg52C-1/view?usp=drive_link
   
    return (
        window.localStorage.getItem("language") == "fr" ? <div class="about">
                <div class="about-intro" >
                    <h1> À propos du  CPL </h1>
                    <h5> Informations et documentation</h5>
                    <br />
                </div>
                <div>
                    <div class='why-site'>
                        <h3>Introduction</h3>
                        <h5>
                        Dans cette documentation, nous aborderons ce qu'est le système de paiement semi-centralisé et quels sont ses avantages. Si vous souhaitez explorer cette technologie plus en détail, lisez notre <a href="">whitepaper</a>.
                            <br />
                            <br />
                            le système de paiement semi-centralisé (ou plus fréquemment appelé par son acronyme anglais : CPL) est une nouvelle façon d'exécuter et de valider les transactions. L'approche CPL s'appuie sur la technologie Peer-to-Peer qui permet 3 choses :
                             <ul><li>1 - le fournisseur de paiement CPL permet les frais de transaction les plus bas possibles</li> <li>2 - en utilisant notre protocole de validation, il atteint le plus haut niveau de sécurité possible</li><li>3 - le CPL a le potentiel de devenir le système de paiement le plus accessible possible, car il peut gérer à peu près n’importe quel mode de paiement ou devise (qu’il s’agisse de monnaie classique ou de crypto-monnaies). </li></ul>
                            
                        </h5>
                        
                    </div>
                    <div className="why-account">
                        <h3>Transactions</h3>
                        <h5>
                        Le CPL réduit les frais à près de 0 % sans modifier les principes fondamentaux de la manière dont les paiements sont effectués. En fait, grâce à la technologie Peer-to-Peer, nous avons découvert que nous pourrions distribuer un système de paiement
                             entre utilisateurs utilisant un programme de participation. Grâce à notre programme de participation, les utilisateurs recevant des fonds peuvent participer à notre système afin de réduire leurs frais. Cette participation est extrêmement rentable pour un utilisateur, puisqu'il peut réduire ses propres frais
                             à 0% en quelques semaines. Pour plus d’informations sur le fonctionnement de nos pools de revenus P2P, consultez notre document de recherche !
                        </h5>
                    </div>
                    <div className="why-account">
                        <h3>Transparence / Securité</h3>
                        <h5>
                        Puisque notre système utilise la puissance d'un réseau distribué, les paiements sont validés sur des milliers de nœuds (soit sur des blockchains, soit sur notre ledger), ce qui permet de protéger les transactions. Aussi, comme le nom de notre système
                            le suggère, nous avons notre propre ledger, qui permet non seulement de suivre et de vérifier les transactions, mais aussi de confirmer que tous les frais sont redistribués entre les utilisateurs (voir : Section Transactions). Ce ledger est public et tout le monde peut y avoir accès, il permet donc plus de transparence.
    
                        </h5>
                        
                    </div>
                    <div className="why-account">
                        <h3>Blockchain</h3>
                        <h5>
                        Le système CPL est directement connecté à la technologie blockchain, sans toutefois en dépendre. En d’autres termes, CPL peut utiliser la puissance de la blockchain sans s’appuyer sur elle. Cette fonctionnalité permet aux commerces en ligne décentralisées de se connecter au CPL et d'utiliser tout son potentiel sans avoir à utiliser un pont tel qu'un oracle. Pour plus d’informations sur la façon dont nous utilisons la blockchain, nous vous recommandons de lire notre document de recherche !
    
                        </h5>
                        
                    </div>
                    
                </div>
            </div> : <div class="about">
                <div class="about-intro" >
                    <h1> About CPL </h1>
                    <h5> Information and documentation</h5>
                    <br />
                </div>
                <div>
                    <div class='why-site'>
                        <h3>Introduction</h3>
                        <h5>
                            In this documentation, we will discuss what is the Centralized Payment Ledger and what are its advantages. If you wish to explore this technology in more details, read our  <a href="">whitepaper</a>. 
                            <br />
                            <br />
                            The Centralized Payment Ledger (or more frequently referred as its acronym: CPL) is a new way of executing and validating transactions. The CPL approach is based on Peer-to-Peer technology which allows 3 things: 
                            <ul><li>1 - the CPL payment provider allows the lowest transaction fees possible</li> <li>2 - using our validation protocol, it achieves the greatest level of security possible</li><li>3 - the CPL has the potential to become the most accessible payment system, since it can handle approximately any payment method or currency (either it is classic money or crypto-currencies). </li></ul> 
                           
                            
                        </h5>
                        
                    </div>
                    <div className="why-account">
                        <h3>Transactions</h3>
                        <h5>
                            The CPL reduces the fees down to near 0% while not changing the fundamentals of how payments are made. In fact, using Peer-to-Peer technology, we discover we could distribute a payment system 
                            between users using a participation program. Using our participation program, users who get payed can take part in our system in order to lower their fees. This participation is extremely profitable for a user, since he can reduce his own fees down
                            to 0% in matters of weeks. For more information on how our P2P earning pools work, check out our research paper! 
                        </h5>
                    </div>
                    <div className="why-account">
                        <h3>Transparency / Security</h3>
                        <h5>
                           Since our system uses the power of distributated network, payments are validated accross thousand of nodes (either on blockchains or on our ledger) which allows the best way to protect transactions. Also, like the name of our system
                           suggests, we have our own ledger, which not only allows to track and verify transactions, but to confirm that all the fees are redistributed between users (see: Transaction section). This ledger is public and anyone can have access to it, so it allows more transparency.
    
                        </h5>
                        
                    </div>
                    <div className="why-account">
                        <h3>Blockchain</h3>
                        <h5>
                           The CPL system is directly connected with blockchain technology, without, however, depending on it. So, in other words, CPL can use the power of blockchain, without relying on it. This feature allows decentralized marketplaces to connect to the CPL and use its full potential while not having to use a bridge such as an Oracle. For more information about how we use blockchain, we recommend you to read our research paper! 
    
                        </h5>
                        
                    </div>
                    
                </div>
            </div>
            
                    
                    
        )
    
}
export default Token;