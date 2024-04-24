import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import SearchBox from "./SearchBox";
import { Card } from "react-bootstrap";

function Header() {
  return (
    <Navbar>
      <Container fluid>
        <Navbar.Brand href="/">PetPals</Navbar.Brand>
          <Nav>
            <Nav.Link href="/">
            <i class="fa-solid fa-paw"></i>Home
            </Nav.Link>
            <Nav.Link href="/items">
              <i class="fa-solid fa-dog"></i>Products
            </Nav.Link>
            <Nav.Link href="/creators">
              <i class="fa-solid fa-dog"></i>Creators
            </Nav.Link>
          </Nav>

        <div className="d-flex justify-content-center flex-grow-1 ml-5"></div>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <SearchBox />
          {/* <Nav.Link href="#action2"><i class="fa-solid fa-dog"></i></Nav.Link>
            <Nav.Link href="#action2"><i class="fa-solid fa-cat"></i></Nav.Link>
            <Nav.Link href="#action2"><i class="fa-solid fa-cat"></i></Nav.Link>
            <Nav.Link href="#action2"><i class="fa-solid fa-cat"></i></Nav.Link> */}
            <Card className="ms-auto me-5 bg-primary">
          <Nav className="ms-auto me-5">
            <NavDropdown title="글쓰기" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">
                <i class="fa-regular fa-image"></i>사진/영상올리기
              </NavDropdown.Item>
              <NavDropdown.Item href="#action4">집들이 글쓰기</NavDropdown.Item>
              <NavDropdown.Item href="#action5">노하우 글쓰기</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown.Divider />
          </Nav>
          </Card>
          {/* <Nav.Link href="#" disabled>
              Link
            </Nav.Link> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
