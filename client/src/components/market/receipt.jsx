import { useEffect, useState } from "react";

import {ethers} from 'ethers'

import placeOrder from "../F2C/testapi";

import PayItems from "../F2C/items/PayItems";


function Receipt (props) {
    const [fees, setFees] = useState()
    const [loadF2C, setLoadF2C] = useState(false)

    const loadOrder = async() => {
        console.log(props.account)
        if (props.account) {
            if (props.pay) {
                setLoadF2C(true)
                
                //let mounthDate = props.pay[1].split("/")
                //let paymentList = [props.pay[0], "20" + mounthDate[0], mounthDate[1], props.pay[2]]
                //let id, key, city, state, code, country, street, phone, email, fname, lname = await props.did.getId(parseInt(window.localStorage.getItem("id")), parseInt(window.localStorage.getItem("key")), parseInt(window.localStorage.getItem("id")))
                //placeOrder(props.total, props.account, true, ip, props.pay, city, state, code, country, street, phone, email, fname, lname) //custom payment method 
            }
            else {
                let _ = ""
                const ordering = placeOrder(10, props.account, false, _, _, _, _, _, _, _, _, _, _) //no custom payment method
                console.log(ordering)
            }
        } else {
            alert("F2C converter not supported on Metamask. Login with Imperial Account to access this functionnality")
        }
        
        
    }

    const calculateGasFees = async() => {
        const gasPrice = await props.contract.provider.getGasPrice();
        
        let price = props.subtotal
        let gas = await props.contract.estimateGas.approve(props.seller, price) //()
        console.log(parseInt(price))

        if (props.dds) { //real item
            let gas2 = await props.dds.estimateGas.purchaseItem(props.id, props.id, parseInt(window.localStorage.getItem("key")), parseInt(window.localStorage.getItem("id")))
            console.log(gas2)
            return[(gas * gasPrice),  (gas2 * gasPrice)]
        }
        else {
            let gas2 = await props.market.estimateGas.purchaseItem(props.id)
            return [(gas * gasPrice),  (gas2 * gasPrice)]
        }
        
        
    }

    useEffect(() => {
        calculateGasFees().then((fee) => {
            console.log(fee[1])
            setFees((ethers.utils.formatEther(fee[0])  * 31400700) + (ethers.utils.formatEther(fee[1])  * 31400700)) //credit price
            
        })
        
    })

    return (
        <div>
            { loadF2C === false ?
            (<div className="receipt">
            
            <img id='itemimg' src={props.image} alt="" />
            <br />
            <br />
            <h4>subtotal: {props.subtotal} $CREDITs </h4>
            {props.quebec ? <div> <h6>GST: 1,500 $CREDIT (2,5$ at 5%) </h6> <h6>QST: 3,000 $CREDIT (5$ at 10%)</h6> </div> : <h6 class="tax">Tax: 3,000 $CREDITs ({props.taxprice}$ at {props.tax}%)</h6> }
            <h6>Gas Fee: {parseInt(fees)} $CREDITs (1,2$)</h6>
            <a href="" class="link link-primary">taxes policies ({props.state})</a>
            <h5> Total: {props.total} $CREDITs</h5>
            <button onClick={props.purchase} type="button" class="btn btn-secondary" id="buy">Buy</button>
            <button onClick={loadOrder} type="button" class="btn btn-primary" id="buy">F2C</button>
            <br />
            <br />
            <button onClick={props.cancel} type="button" class="btn btn-danger">Cancel</button> </div>) : (<PayItems did={props.did} pay={props.pay} total={props.total} fees={fees} account={props.account} purchase={props.purchase} cancel={props.cancel}/>)}

        </div>
        
        
    )
    
}

export default Receipt;


/*
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{color:"black"}}>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel" >billing informations</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        
                    <div class="modal-body">
                        <h6 class="subtotal">test</h6>
                        
                        

                        <a href="" class="link link-primary">taxes policies ({props.state})</a>
                        <h5 class="total"> test </h5>
                        <button type="button" class="btn btn-primary" onClick={props.purchase}>buy</button>
                    </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

*/