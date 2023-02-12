import './css/subscription.css'

import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";
import { API } from 'aws-amplify';

function PaymentCard(props) {
    return (
        <div class="paymentcard2" style={{color: "white"}}>
            <h6>Card Number: <strong>{props.card}</strong></h6>
            <p>expiration date: {props.date}</p>
            <br />
            <div class="separator2">

            </div>
            <br />
            <button id={props.pay} onClick={props.loadCard} class="btn btn-primary">Select</button>
        </div>
    )
}

function Premium (props) {

    return (
        <div class="premium-sub">
            <div class="card" >
                <div class="card-body">
                    <h5 class="card-title">Premium <span class="badge bg-primary">Users Choice</span></h5>
                    <h6 class="card-subtitle mb-2 text-muted">Better experience</h6>
                    <p class="card-text">Included: <br /> -5 more items per month <br /> -5 prepaid gas transactions per month <br /> -2 more debit card payment method <br /> <br /> <strong> 4$/month </strong></p>
                    <button class="btn btn-primary" onClick={props.getPay} data-bs-toggle="modal" data-bs-target="#staticBackdrop">Buy</button>
                </div>
            </div>
        </div>
    )
}

function Expert (props) {

    return (
        <div class="premium-sub">
            <div class="card" >
                <div class="card-body">
                    <h5 class="card-title">Expert</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Best for Pros</h6>
                    <p class="card-text">Included: <br /> -unlimited items per month <br /> -10 prepaid gas transactions per month <br /> -unlimited debit card payment method <br /> -Graphic statistic from Imperial AI <br /> -1 free Boost per month <br /> <br /> <strong> 12$/month </strong></p>
                    <button class="btn btn-primary" onClick={props.getPay} data-bs-toggle="modal" data-bs-target="#staticBackdrop2">Buy</button>
                </div>
            </div>
        </div>
    )
}

function Verified (props) {

    return (
        <div class="premium-sub">
            <div class="card" >
                <div class="card-body">
                    <h5 class="card-title">Verified</h5>
                    <h6 class="card-subtitle mb-2 text-muted">For Business</h6>
                    <p class="card-text">Included: <br /> -unlimited items per month <br /> -20 prepaid gas transactions per month <br /> -Advance statistic for sale from Imperial AI <br /> -5 free Boost per month <br /> -Access to all of the Verified Feature and Sections <br /> <br /> <strong> starting at 20$/month </strong></p>
                    <button class="btn btn-primary">Contact our team</button>
                </div>
            </div>
        </div>
    )
}

function Subscription () {
    const { account } = useParams();
    const [pay, setPay] = useState()
    let payNolag = []
    const [paymentMethod, setPaymentMethod] = useState(["none"])
    //https://docs.spreedly.com/basics/purchase/

    const loadCard = (i) => {
        setPaymentMethod(i.target.id.split(","))
    }

    const getPayment = async() => {
        var data = {
            body: {
                address: account?.toLowerCase()
            }
            
        }

        var url = "/connection"
        API.post('server', url, data).then((response) => {
            setPay(response.pay)
            //payNolag = response.pay
            console.log(response.pay)
        })
    }
    const buyPremium = async() => {
        //manage the payement.then()

        var data = {
            body: {
                account: account?.toLowerCase(),
                level: 1
            }
            
        }

        var url = "/uploadFile"
        API.put('server', url, data).then((response) => {
            console.log(response)
            alert("You subscribed to Premium mode")
        })
    }

    const buyExpert = async() => {
        var data = {
            body: {
                account: account?.toLowerCase(),
                level: 2
            }
            
        }

        var url = "/uploadFile"
        API.put('server', url, data).then((response) => {
            console.log(response)
            alert("You subscribed to Expert mode")
        })
    }


    return (
        <div class="subscription">
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style={{color:"black"}}>
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Premium subscription</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="payList">
                                {pay?.map(i => 
                                    (<div >
                                        <PaymentCard card={i[0]} date={i[1]} pay={i} loadCard={loadCard}/>
                                        <br />
                                    </div>)
                                )}
                            </div>
                            <h6>Currently selecting: {paymentMethod[0]}</h6>
                           <button class="btn btn-primary" onClick={buyPremium}>Accept</button>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
            </div>
            <div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdrop2Label" aria-hidden="true" style={{color:"black"}}>
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdrop2Label">Expert subscription</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="payList">
                                {pay?.map(i => 
                                    (<div >
                                        <PaymentCard card={i[0]} date={i[1]} pay={i} loadCard={loadCard}/>
                                        <br />
                                    </div>)
                                )}
                            </div>
                            <h6>Currently selecting: {paymentMethod[0]}</h6>
                           <button class="btn btn-primary" onClick={buyExpert}>Accept</button>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col">
                       <Premium getPay={getPayment} />
                    </div>
                    <div class="col">
                        <Expert getPay={getPayment}/>
                    </div>
                    <div class="col">
                       <Verified getPay={getPayment}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subscription;