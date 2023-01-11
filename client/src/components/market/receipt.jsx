

function Receipt (props) {

    return (
        <div className="receipt">
            <img src="" alt="" />
            <h4>subtotal: {props.subtotal} $CREDITs </h4>
            {props.quebec ? <div> <h6>GST: 1,500 $CREDIT (2,5$ at 5%) </h6> <h6>QST: 3,000 $CREDIT (5$ at 10%)</h6> </div> : <h6 class="tax">Tax: 3,000 $CREDITs ({props.taxprice}$ at {props.tax}%)</h6> }
            <a href="" class="link link-primary">taxes policies ({props.state})</a>
            <h5> Total: {props.total} $CREDITs</h5>
            <button onClick={props.purchase} type="button" class="btn btn-secondary" id="buy">Buy</button>
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