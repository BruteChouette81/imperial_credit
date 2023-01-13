import './css/seller.css'
import { useParams } from 'react-router-dom'

function Seller() {
    let { account } = useParams();
    return ( <p>Seller page: {account.toLowerCase()}</p> )
}

export default Seller;