
import './css/nftbox.css'
import {useState, useEffect } from 'react';
// make myitem parameters and modify the card to dislay a delete button

function NftBox (props) {
    //see in bigger using modal
   
    const [id, setId] = useState()
    const [market, setMarket] = useState()
    const [credits, setCredits] = useState()
    const [seller, setSeller] = useState()
    const [price, setPrice] = useState()


    const deleteItems = async () => {
         //connect to market inside the function to save time 
        //const marketContract = connectContract(MarketAddress, abi.abi)
        try {
            console.log(market.address)
            await(await market.deleteItem(id)).wait()
            alert("Item: " + id + " has been sucessfully deleted!")
        }
        catch(error) {
            alert("Unable to delete Item (" + id + "). Error code - 2")
            console.log(error)
        }
    }
    const purchase = async () => {
        try {
    
            await(await credits.approve(seller, price)).wait() //give the contract the right of paying the seller
            //IF THIS STEP IS NOT COMPLETE: THROW ERROR
    
            await (await market.purchaseItem(id)).wait() //actual purchase/transfer of the nft
            alert("Sucessfully bought NFT n." + id + " . Congrats :)")
        } catch {
            alert("Unable to connect properly with the blockchain. Make sure your account is connected. Error code - 2")
        }
    
    }

    useEffect(() => {
        if (props.myitem) {
            setId(props.id)
            setMarket(props.market)
        }
        else {
            setId(props.id)
            setPrice(props.price)
            setSeller(props.seller)
            setMarket(props.market)
            setCredits(props.credits)
            console.log(props.id)
            console.log(props.name)
        }
    }, []) //setId

    if(props.myitem) {
        return(
            <div class="nftbox">
                <img src="" alt="" />
                <h4><a href="">{props.name}</a></h4>
                <h6>current bid: {props.price} $CREDITS</h6>
                <p>seller: <a href="">{props.seller}</a></p>
                <button onClick={deleteItems} type="button" class="btn btn-secondary">Delete</button>
    
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
                <button onClick={purchase} type="button" class="btn btn-secondary">Purchase</button>
    
            </div>
        )
    }
   
}

export default NftBox;