import './css/community.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import discord from './logo/discord.jpg'

function Community() {
    return(
        <div class="community">
            <h2 id='title'>Join our community</h2>
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class='discord'>
                            <h5>Join our Discord to stay updated on what is next !</h5>
                            <h6>be part of contest and win prizes!</h6>
                            <img class="discordimg" src={discord} alt="" />
                            <br />
                            <a class="btn btn-primary" href="https://discord.gg/TdjfjyvmTH" role="button">Join!</a>
                        </div>
                    </div>

                    <div class="col">
                        <div class='contact'>
                            <h5>Questions? You can contact us at the following address: </h5>
                            <br />
                            <h3 id='email'>creditsimperial@gmail.com</h3>
                            <br />
                            <h5>You can also refer to: <strong>@Brutechouette81</strong> on the Discord channel.</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Community;