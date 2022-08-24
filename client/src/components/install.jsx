// component for installing metamask
import metaimage from './css/thjpg.jpg';

const Install = () => {
    const go = () => {
      window.history.back()
    }
    return (
      <div>
        <h1>To access this page, you need to install a wallet!</h1>
        <h3>To connect with the blockhain, we recommend to install <a href="https://metamask.io/download.html">Meta Mask</a> </h3>
        <h3>You can also check our Tutorial Page on <a href="/Tutorial">how to setup Metamask with the credits</a></h3>

        <img src={metaimage} alt="" />
        
        <br />
        <button onClick={go} class="btn btn-primary btn-lg">Go back!</button>
      </div>
    );
  };
  
export default Install;