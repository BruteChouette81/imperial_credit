
import 'bootstrap/dist/css/bootstrap.min.css'

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
        window.location.replace("https://app.uniswap.org/#/swap?chain=mainnet") // url for launchpad 
    }
    const about = () => {
        window.location.replace("http://localhost:3000/About") // url for launchpad 
    }
    return (
        <div>
            <h1>The official Imperial Token will launch soon!</h1>
            <h3>Made by Star Wars fan for Star Wars fans</h3>
            <br />
            <div class="d-grid gap-2 d-md-block">
                <button onClick={buying} class="btn btn-primary btn-lg" style={{marginRight: 10 + "px"}}>Buy $CREDIT</button>
                <button onClick={about} class="btn btn-primary btn-lg">About the project</button>
            </div>
        </div>
    ) // print data of launching
};
// make a nav bar to navigate easily between page ( home, about, price tracker, profile)
function Carding({title, text, link, button}) {
    return(
        <div class="col-sm-6">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">{title}</h5>
                    <p class="card-text">{text}</p>
                    <a href={link} class="btn btn-primary">{button}</a>
                </div>
            </div>
        </div>
    )
}
function Home() {
    return(
        <div class="main" style={{marginLeft: 20 + 'px'}}>
            <section class="home">
                <BuyCredit />
                <br />
            </section>
            <section class="update">
                <h3>Update:</h3>
                <div class="row">
                    <Carding title="test" text="test" link="#" button="test"/>
                    <Carding title="test1" text="test" link="#" button="test"/>
                </div>
                <br />
                <div class="row">
                    <Carding title="test1" text="test" link="#" button="test"/>
                </div>
            </section>
        </div>
    )

}

/// function display text
export default Home;