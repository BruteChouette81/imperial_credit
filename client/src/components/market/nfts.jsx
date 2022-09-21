
import './css/nftbox.css'
import {useState, useEffect } from 'react';

// make myitem parameters and modify the card to dislay a delete button

function NftBox (props) {
    //see in bigger using modal
   
    const [id, setId] = useState()
    const [market, setMarket] = useState()

    const deleteItems = async () => {
         //connect to market inside the function to save time 
        //const marketContract = connectContract(MarketAddress, abi.abi)
        try {
            console.log(market)
            await(await market.deleteItem(id)).wait()
            alert("Item: " + id + " has been sucessfully deleted!")
        }
        catch(error) {
            alert("Unable to delete Item (" + id + "). Error code - 2")
            console.log(error)
        }
    }

    useEffect(() => {
        if (props.myitem) {
            setId(props.name)
            setMarket(props.market)
        }
    }, []) //setId

    if(props.myitem) {
        return(
            <div class="nftbox">
                <img src="" alt="" />
                <h4><a href="">{props.name}</a></h4>
                <h6>current bid: {props.price} $CREDITS</h6>
                <p>seller: <a href="">{props.seller}</a></p>
                <button onClick={deleteItems} type="button" class="btn btn-secondary">delete</button>
    
            </div>
        )

    }
    else {
        return(
            <div class="nftbox">
                <img src="" alt="" />
                <h4><a href="">{props.name}</a></h4>
                <h6>current bid: {props.price} $CREDITS</h6>
                <p>seller: <a href="">{props.seller}</a></p>
    
            </div>
        )
    }
   
}

export default NftBox;