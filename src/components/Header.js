import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const navbar = () => {
    function logout(){
        localStorage.clear();
        window.location.replace("/");
    }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">CodeGen</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1" className='me-2'>Home</Nav.Link>
            <Nav.Link href="#action2" className='me-3'>Dashboard</Nav.Link>
          </Nav>
        <Button variant="outline-primary" onClick={logout}>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default navbar;