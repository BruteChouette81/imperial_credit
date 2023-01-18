import './css/sellerItem.css'

function SellerItem(props) {
    return ( 
            <div class="seller-item">
                <img src="" alt="" />
                <h4>Name: {props.name}</h4>
                <h6>Id: {props.itemId}</h6>
                <h6>Tag: {props.tag}</h6>
                <h6>Score: {props.score} 🔥</h6>
                <br />
                <h6>Description: epic first item</h6>
            </div>
            
        )
}

export default SellerItem;