import './css/upcoming.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function Upcoming() {
    const go = () => {
        window.history.back()
    }
    return ( 
    <div class="coming">
        <h3>Working on it! </h3>
        <button onClick={go} class="btn btn-primary btn-lg">Go back!</button>
        <br />
        <br />
        <br />
        <img src="http://gifimage.net/wp-content/uploads/2018/06/work-in-progress-gif-7.gif" alt="Working on it!" />
    </div>
    )

}

export default Upcoming;