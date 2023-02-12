import './css/seller.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { API , Storage} from 'aws-amplify';
import SellerItem from './sellerItem';
import { useWeb3React } from "@web3-react/core"

import injected from '../account/connector';

function Seller() {

    //const [address, setAddress] = useState("")
    const { active, account, activate } = useWeb3React()
    const [address, setAddress] = useState()
    const { account2 } = useParams();
    const [img, setImg] = useState('white')
    const [back, setBack] = useState('white')
    const [image, setImage] = useState("")
    const [name, setName] = useState("")
    const [custimg, setCustimg] = useState(false)
    const [friendlist, setFriendlist] = useState([])
    const [friends, setFriends] = useState(false)

    const [item, setItem] = useState([])
    const [requested, setRequested] = useState(false)

    const getAccount = async () => {
        if (window.localStorage.getItem("usignMetamask") === "true") {
            await activate(injected)
        }
        else {
            setAddress(window.localStorage.getItem("walletAddress"))
        }
        
    };

    function setS3Config(bucket, level) {
        Storage.configure({
            bucket: bucket,
            level: level,
            region: "ca-central-1",
            identityPoolId: 'ca-central-1:85ca7a33-46b1-4827-ae75-694463376952'
        })
    }

    const getImage = async () => {
        setS3Config("clientbc6cabec04d84d318144798d9000b9b3205313-dev", "public")
        const file = await Storage.get(`${account2.toLowerCase()}.png`) //add ".png"    `${address}.png` {download: true}
        setImage(file)
    }

    const requestFriend = () => {
        //console.log("requested")
        console.log(account.toLowerCase())
        if (address !== undefined) {
            var data = {
                body: {
                    requested: account2.toLowerCase(),
                    sender: address?.toLowerCase()
                }
                
            }
        } else {
            var data = {
                body: {
                    requested: account2.toLowerCase(),
                    sender: account.toLowerCase()
                }
                
            }
        }

        var url = "/requestFriend"

        API.post('server', url, data).then((response) => {
            console.log(response)
            setRequested(true)
        })
        
    }

    const loadItemByUser = async() => {
        let itemList = []
        var data = {
            body: {
                address: account2.toLowerCase(),
            }
        }

        var url = "/getItems"

        //console.log(typeof(item))
        //console.log(item)

        /*  newItem.itemId = item.itemId
            newItem.price = item.price
            newItem.seller = item.seller
         */

        await API.post('server', url, data).then((response) => {
            for(let i=0; i<response.ids.length; i++) { //loop trought every listed item of an owner
                let newItem = {}
                newItem.itemId = response.ids[i]
                newItem.name = response.names[i] //get the corresponding name
                newItem.score = response.scores[i] //get the corresponding score
                newItem.tag = response.tags[i] //get the corresponding tag
                newItem.image = response.image[i]
                newItem.description = response.descriptions[i]
                itemList.push(newItem)
            }
        })

        return itemList
    }

    const connect = () => {
        //setAddress(account.toLowerCase())
        getAccount()
        var data = {
            body: {
                address: account2.toLowerCase()
            }
            
        }

        var url = "/connection"

        API.post('server', url, data).then((response) => {
            console.log(response)
            setBack(response.bg);
            setImg(response.img);
            setCustimg(response.cust_img);
            setName(response.name)
            setFriendlist(response.friend)
            for (let i = 0; i<response.friend.length; i++) {
                if(address !== undefined) {
                    if (response.friend[i] === address?.toLowerCase()) {
                        setFriends(true)
                    }
                } else {
                    if (response.friend[i] === account.toLowerCase()) {
                        setFriends(true)
                    }
                }
                
            }
        })

        
    }

    useEffect(() => {
        connect()
        let itemlist = loadItemByUser()
        //console.log(itemlist)
        itemlist.then(result => {
            console.log(result)
            setItem(result)
        })
    }, [setItem])
    if (custimg === true) {
        getImage()
        return ( 
        <div class='seller-profile'>

            <div class='seller-banner' style={{backgroundColor: back}}>
                <img alt="" src={image} id="seller_img" />
            </div>

            <div class="seller-info">
                        <h4 id="profile-info-tag">Seller information:</h4>
                        <h5>Seller name: {name}</h5>
                        <h5>Seller address: {account2.slice(0,7)}...</h5>
                        <h5>Friend count: {friendlist.length}</h5>
                        <h5>Seller description: Selling Game items from Steam</h5>
                        { friends===false ? requested===false ? (<button onClick={requestFriend} class="btn btn-primary">Friend Request</button>) : (<button class="btn btn-success">Request Send!</button>) : (<button class="btn btn-success">Already Friend!</button>) }
            </div>

            <div class="seller-items-list">
                <br />
                <h4>Seller item collection: </h4>
                <div class="row">
                    <div class="col">
                        {item.map((item) => (<SellerItem name={item.name} image={item.image} description={item.description} tag={item.tag} score={item.score} itemId={item.itemId}/>) )}
                    </div>
                </div>
                
            </div>
        </div> 
        )
    }
    else {
        return ( <p>Seller page: {name}</p> )
    }
}

export default Seller;