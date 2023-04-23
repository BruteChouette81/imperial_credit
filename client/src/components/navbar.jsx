
import logo from './logo/RedLogo.png' 
import menu from './css/menu.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './css/navbar.css'

function NewNavBar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="" width="20" height="25" className="d-inline-block align-text-top" />
          Imperial Market
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <img src={menu} alt="" width="30" height="24" />
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/Token">About the project</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href='/FAQ'>Q&A</a> 
            </li>
            <li class="nav-item">
              <a class="nav-link" href='/Tutorial'>Tutorials</a> 
            </li>
            <li class="nav-item">
              <a class="nav-link" href='/Bug'>Report a bug</a> 
            </li>
            <li class="nav-item">
              <a class="nav-link" href='/Community'>Community</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href='/Liquidity'>Liquidity Providers</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Markets
              </a>
              <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdownMenuLink">
                <li><a class="dropdown-item" href='/Market'>Imperial Market</a></li>
                <li><a class="dropdown-item disabled">Auction</a></li>
              </ul>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="btn btn-outline-success me-2" type="button" href='/Account'>Connect Imperial Account</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  ) //Q&A = /Blog

}
  

export default NewNavBar;
