import { useEffect, useState } from "react";

import {ethers} from 'ethers'

import placeOrder from "../F2C/testapi";

function Receipt (props) {
    const [fees, setFees] = useState()

    const loadOrder = () => {
        console.log(props.account)
        placeOrder(10, props.account)
    }

    const calculateGasFees = async() => {
        const gasPrice = await props.contract.provider.getGasPrice();
        
        let price = props.subtotal * 100000
        let gas = await props.contract.estimateGas.approve(props.seller, price) //()

        console.log(gas)
        
        return gas * gasPrice
    }

    useEffect(() => {
        calculateGasFees().then((fee) => {
            console.log(fee)
            setFees((ethers.utils.formatEther(fee) * 31400700))
        })
        
    })

    return (
        <div className="receipt">
            <img src="" alt="" />
            <h4>subtotal: {props.subtotal} $CREDITs </h4>
            {props.quebec ? <div> <h6>GST: 1,500 $CREDIT (2,5$ at 5%) </h6> <h6>QST: 3,000 $CREDIT (5$ at 10%)</h6> </div> : <h6 class="tax">Tax: 3,000 $CREDITs ({props.taxprice}$ at {props.tax}%)</h6> }
            <h6>Gas Fee: {parseInt(fees)} $CREDITs (1,2$)</h6>
            <a href="" class="link link-primary">taxes policies ({props.state})</a>
            <h5> Total: {props.total} $CREDITs</h5>
            <button onClick={props.purchase} type="button" class="btn btn-secondary" id="buy">Buy</button>
            <button onClick={loadOrder} type="button" class="btn btn-primary" id="buy">F2C</button>
            <br />
            <br />
            <button onClick={props.cancel} type="button" class="btn btn-danger">Cancel</button>
            
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