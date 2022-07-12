// component for installing metamask

const Install = () => {
    const go = () => {
      window.history.back()
    }
    return (
      <div>
        <h1>To access this page, you need to install a wallet!</h1>
        <h3>To connect with the blochain, we recommend to install MetaMask </h3>
        <a href="https://metamask.io/download.html">Meta Mask</a>
        <button onClick={go} class="btn btn-primary btn-lg">Go back!</button>
      </div>
    );
  };
  
export default Install;