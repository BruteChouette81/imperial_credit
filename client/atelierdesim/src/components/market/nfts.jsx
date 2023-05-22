
import './css/nftbox.css'
import {useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import Receipt from './receipt';
// make myitem parameters and modify the card to dislay a delete button

const TicketAddress = '0x6CFADe18df81Cd9C41950FBDAcc53047EdB2e565'

function NftBox (props) {
    //see in bigger using modal
   
    const [id, setId] = useState()
    const [market, setMarket] = useState()
    const [credits, setCredits] = useState()
    const [dds, setDds] = useState()
    const [seller, setSeller] = useState()
    const [price, setPrice] = useState(0)
    const [total, setTotal] = useState(0)
    const [state, setState] = useState("ontario")
    const [quebec, setQuebec] = useState(false)
    const [tax, setTax] = useState(0)
    const [taxprice, setTaxprice] = useState(0.0)
    const [account, setAccount] = useState()
    const [pay, setPay] = useState()
    const [did, setDid] =useState()
    const [image, setImage] = useState()
    const [signer, setSigner] = useState()
    const [currency, setCurrency] = useState()
    const [pk, setPk] = useState()

    const [purchasing, setPurchasing] = useState(false)

    const cancelPurchase = () => {
        setPurchasing(false)
    }

    const deleteItems = async () => {
         //connect to market inside the function to save time 
        //const marketContract = connectContract(MarketAddress, abi.abi)
        try {
            console.log(market.address)
            await(await market.deleteItem(id)).wait()
            alert("Item: " + id + " has been sucessfully deleted!")
        }
        catch(error) {
            alert("Unable to delete Item (" + id + "). Error code - 3")
            console.log(error)
        }
    }

    const updateScore = () => {
        var data = {
            body: {
                address: seller.toLowerCase(),
                itemid: id, //market item id
            }
            
        }

        var url = "/updateScore"

        API.post('server', url, data).then((response) => {
            console.log(response)
        })
    }

    const calculateTax = () => {
        updateScore() //update score on click once you visit an item
        const quebectax = 0.15;
        const ontariotax = 0.13;
        const usatax = 0.1;
        let totalPrice;
        switch (state) {
            case "quebec":
                totalPrice = price + (price * quebectax)
                setTotal(totalPrice)
                setQuebec(true)
                break;
            case "ontario":
                let totalPrice = price + (price * ontariotax)
                setTax(ontariotax * 100)
                setTaxprice(50 * ontariotax)
                setTotal(totalPrice)
                setPurchasing(true)

                break;
            case "usa":
                totalPrice = price + (price * usatax)
                setTax(usatax * 100)
                setTaxprice(50 * usatax)
                setTotal(totalPrice)
                break;
            default:
                console.log("Bad request: 400 . Error code - 4")
                break;
        }


        return totalPrice;
    }

    const purchase = async () => {
        try {
            await(await credits.approve(seller, (price))).wait() //give the contract the right of paying the seller
            //IF THIS STEP IS NOT COMPLETE: THROW ERROR *10 000

            // TRANSFER DIRECTLY INTO A SPECIAL WALLET FOR TAXES
    
            await (await market.purchaseItem(id)).wait() //actual purchase/transfer of the nft
            alert("Sucessfully bought NFT n." + id + " . Congrats :)")
        } catch (error){
            alert("Unable to connect properly with the blockchain. Make sure your account is connected. Error code - 2")
            console.log(error)
            console.log(seller)
        }
    
    }

    const realPurchase = async () => {
        try {
            const url = '/uploadFile';
            var config = {
                body: {
                    account: account.toLowerCase(),
                    realPurchase: [parseInt(props.tokenId), id]
                }
            };
            await(await credits.approve(seller, price)).wait() //give the contract the right of paying the seller
            //IF THIS STEP IS NOT COMPLETE: THROW ERROR

            // TRANSFER DIRECTLY INTO A SPECIAL WALLET FOR TAXES
    
            await (await dds.purchaseItem(id, id, parseInt(window.localStorage.getItem("key")), parseInt(window.localStorage.getItem("id")))).wait() //actual purchase/transfer of the nft

            API.put('server', url, config).then((response) => {
                console.log(response)
            })

            alert("Sucessfully bought NFT n." + id + " . Congrats :)")
        } catch (error){
            alert("Unable to connect properly with the blockchain. Make sure your account is connected. Error code - 2")
            console.log(error)
            console.log(seller)
        }
    }

    useEffect(() => {
        if (props.myitem) {
            setId(props.id)
            setMarket(props.market)
            props.setHaveItem(true)
        }
        else {
            if (props.real) {
                setId(props.id)
                setPrice(props.price)
                setSeller(props.seller)
                setMarket(props.market)
                setCredits(props.credits)
                setDds(props.dds)
                setPurchasing(false)
                setAccount(props.account)
                setPay(props.pay)
                setDid(props.did)
                setImage(props.image)
                setSigner(props.signer)
                setCurrency(window.localStorage.getItem("currency"))
                setPk(props.pk)
            } else {
                setId(props.id)
                setPrice(props.price)
                setSeller(props.seller)
                setMarket(props.market)
                setCredits(props.credits)
                setPurchasing(false)
                setAccount(props.account)
                setPay(props.pay)
                setDid(props.did)
                setImage(props.image)
                setSigner(props.signer)
                setCurrency(window.localStorage.getItem("currency"))
                setPk(props.pk)

            }
            
            

        }
    }, []) //setId

    if(props.myitem) {
        return(
            <div class="nftbox">
                <img src="" alt="" />
                <h4><a href="">{props.name}</a></h4>
                <h6>current bid: {props.price/10000} $CREDITS</h6>
                <p>seller: <a href="#">{props.seller.slice(0,7) + "..."}</a></p>
                <p>description: {props.description}</p>
                <button onClick={deleteItems} type="button" class="btn btn-secondary">Delete</button>
    
            </div>
        )

    }
    else {
        return(
            <div>
                { purchasing ? props.real ? (
                    <Receipt quebec={quebec} state={state} subtotal={price} total={total} taxprice={taxprice} tax={tax} seller={seller} image={image} account={account} contract={credits} dds={dds} signer={signer} id={id} pay={pay} did={did} pk={pk} purchase={realPurchase} cancel={cancelPurchase} />
                ) : ( <Receipt quebec={quebec} state={state} subtotal={price} total={total} taxprice={taxprice} tax={tax} seller={seller} image={image} account={account} contract={credits} market={market} signer={signer} id={id} pay={pay} did={did} pk={pk} purchase={purchase} cancel={cancelPurchase} /> ) : (
                    <div class="col">
                        <div class="nftbox">
                            <img id='itemimg' src={image} alt="" />
                            <br />
                            <br />
                            <h4><a href="">{props.name}</a></h4>
                            <h6>current Price: {currency == "CAD" ? props.price/10000 * 1.36 : props.price/10000 } {currency}</h6>
                            <p>seller: <a href={`/Seller/${seller}`} >{props.seller.slice(0,7) + "..."}</a></p>
                            <p>description: {props.description}</p>
                            <button onClick={calculateTax} type="button" class="btn btn-secondary">Purchase</button>
        
                        </div>
                    </div>
                    
                )
                }
            </div>
           
        ) //onClick={purchase} onClick={calculateTax("quebec", price)} onClick={calculateTax}
    }
   
}

export default NftBox;


/*
  

                                const subtotal = exampleModal.querySelector('.subtotal')
                                subtotal.textContent = `Subtotal: ${price} $CREDITs (50$)`

                                const tax = exampleModal.querySelector('.tax')
                                tax.textContent = `Tax: 3,000 $CREDIT (${50 * ontariotax} $ at ${ontariotax * 100} %)`

                                const total = exampleModal.querySelector('.total')
                                total.textContent = `Total: ${totalPrice} (${50 + 50 * ontariotax}$)`
                })
*/