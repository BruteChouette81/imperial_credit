import {
    Navbar,
    Nav
  } from 'react-bootstrap';
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
            </Nav>
          </Navbar>
      </div>
    );
}
  

export default Navigbar;