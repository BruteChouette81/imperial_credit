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
            <h2 className='intro-text'>10 most ask Questions with Answers: </h2>
            <Tipbox q="How do i Install a wallet" a="We have a Special tutorial (video and text) to Install a compatible wallet" />
            <Tipbox q="ohaoshA" a="ijqdqijd"/>
        </div>
    )
}

export default Faq;