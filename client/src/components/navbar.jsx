import { Navbar,Nav } from 'react-bootstrap';
import logo from './logo/imperial_logo.svg' 
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
function Navigbar() {
    return (
      <div>
          <Navbar
            bg='dark'
            variant='dark'>
            <Navbar.Brand> Imperial Credit </Navbar.Brand>
            <Nav className="ml-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/Profile">Profile</Nav.Link>
                <Nav.Link href="/About">About</Nav.Link>
                <Nav.Link href="/Token">Token</Nav.Link>
                <Nav.Link href="/Tutorials">Tutotials</Nav.Link>
              <Nav.Link href="/Blog">Q&A</Nav.Link>
              <Nav.Link href="/Upcoming">Market</Nav.Link>
              <Nav.Link href="/Upcoming">IMP - Actions</Nav.Link>            
            </Nav>
          </Navbar>
      </div>
    );
}

function NewNavBar() {
  return (
    <nav class="navbar navbar-expand-lg bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img src={logo} alt="" width="30" height="24" class="d-inline-block align-text-top" />
          Imperial Credit
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/Profile">Profile</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/Token">Tokenomics</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href='/FAQ'>Q&A</a> 
            </li>
            <li class="nav-item">
              <a class="nav-link" href='/Tutorial'>Tutorials</a> 
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Markets
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><a class="dropdown-item disabled">Empire Market's</a></li>
                <li><a class="dropdown-item disabled">Jabba's Auction</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  ) //Q&A = /Blog

}
  

export default NewNavBar;
