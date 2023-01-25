import { useParams } from 'react-router-dom'

function F2C() {
    const { address } = useParams();
    return (
        <div>
            <p>Welcome: {address} </p>
        </div>
    )
}

export default F2C;