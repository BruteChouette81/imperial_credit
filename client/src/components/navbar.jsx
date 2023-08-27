
import logo from './logo/cpl_logo.png' 
import menu from './css/menu.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './css/navbar.css'

function NewNavBar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light" style={{"background-color": "white"}}>
      <div class="container-fluid">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="" width="50" height="25" className="d-inline-block align-text-top" />
           - Technologies
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
              <a class="nav-link" href='/whitepaper'>Whitepaper</a> 
            </li>
          </ul>
        </div>
      </div>
    </nav>
  ) //Q&A = /Blog

}
  

export default NewNavBar;
