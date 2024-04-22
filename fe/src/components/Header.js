import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {
  return (
    <Navbar  bg="primary" >
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2"><i class="fa-solid fa-dog"></i></Nav.Link>
            <Nav.Link href="#action2"><i class="fa-solid fa-dog"></i></Nav.Link>
            <Nav.Link href="#action2"><i class="fa-solid fa-dog"></i></Nav.Link>
            <Nav.Link href="#action2"><i class="fa-solid fa-cat"></i></Nav.Link>
            <Nav.Link href="#action2"><i class="fa-solid fa-cat"></i></Nav.Link>
            <Nav.Link href="#action2"><i class="fa-solid fa-cat"></i></Nav.Link>
            
            {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider /> */}
              {/* <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown> */}
            {/* <Nav.Link href="#" disabled>
              Link
            </Nav.Link> */}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;