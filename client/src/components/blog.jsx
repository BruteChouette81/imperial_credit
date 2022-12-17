import './css/blog.css'
function Tipbox(props) {
    return (
        <div class="tipbox">
            <div className='question'>
                <h3>Q: {props.q}</h3>
            </div>
            <div className='answer'>
                <h4>A: {props.a}</h4>
            </div>
        </div>
    )
}

function Faq() {
    return (
        <div className="blog">
            <h2 className='intro-text'>5 frequently asked questions with answers: </h2>
            <Tipbox q="How do I install a wallet ?" a="We have a Special tutorial (video and text) to Install a compatible wallet ." />
            <Tipbox q="Where can I buy the $CREDIT token ?" a="The $CREDITS are available on DEX (like Uniswap and Pancake swap) ."/>
            <Tipbox q="What are the compatible wallets ?" a="All Chrome extension wallets can be connect, but our team suggest MetaMask . "/>
            <Tipbox q="Can I connect to my Imperial Account on a mobile device ?" a="Yes, using the Brave integrated wallet, you can connect like on a PC ."/>
            <Tipbox q="Is there a mobile app ?" a="Not yet, but our team is working on creating one !"/>
            
        </div>
    )
}

export default Faq;