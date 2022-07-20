import {useState } from 'react';
import axios from 'axios';

import "./css/profile.css"
import 'bootstrap/dist/css/bootstrap.min.css'

function AutoRefresh( t ) {
    setTimeout("location.reload(true);", t);
}


function Settings() {
    const [image, setImage] = useState(null);
    const [backcolor, setBackcolor] = useState("")

    const [account, setAccount] = useState();

    const getAccount = async () => {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(account)
    };
    getAccount()

    function handleBackChange(color) {
        setBackcolor(color)
    }

    function handleChange(event) {
        setImage(event.target.files[0])
    }

    function handleSubmit(event) {
        event.preventDefault()
        const url = '/uploadFile';
        const formData = new FormData();
        formData.append('account', account);
        formData.append('background', backcolor);
        formData.append('file', image);
        
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        };
        axios.post(url, formData, config).then((response) => {
          console.log(response.data);
          
        });
        AutoRefresh(1000);
        
    
      }
    
    return(
        <div>
            <button class="notboot" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            </button>

            <div class="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" style={{textAlign: 'start'}}>
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasExampleLabel">Settings</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <div style={{paddingBottom: 30 + 'px' }}>
                        <h3 style={{color: 'black'}}>Customize your profile</h3>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor='profilepic' style={{color: 'black'}}> Change your profile picture: </label>
                            <input type='file' id='profilepic' name='profilepic' accept='image/png, image/jpeg' style={{color: 'black'}} onChange={handleChange}/>
                            <br />
                            <p style={{color: 'black'}} >change your background color:</p>
                            <div class="dropdown">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown button
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><a class="dropdown-item" href="#" onClick={() => handleBackChange("blue")}>Blue</a></li>
                                    <li><a class="dropdown-item" href="#" onClick={() =>handleBackChange("red")}>Red</a></li>
                                    <li><a class="dropdown-item" href="#" onClick={() =>handleBackChange("green")}>Green</a></li>
                                    <li><a class="dropdown-item" href="#" onClick={() =>handleBackChange("aqua")}>Aqua</a></li>
                                    <li><a class="dropdown-item" href="#" onClick={() =>handleBackChange("purple")}>Purple</a></li>
                                </ul>
                            </div>
                            <br />
                            <input type="submit" value="Submit"/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings;