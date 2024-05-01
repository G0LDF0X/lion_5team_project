import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Nav, Navbar, NavDropdown, Container, Col } from "react-bootstrap";
import SearchBox from "./SearchBox";
import { Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
  };

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
          {userInfo ? (
            <Col className="ms-auto me-3 ">
              <NavDropdown
                title={<Avatar alt="" src="/cat.jpg" />}
                id="username"
              >
                <LinkContainer to="/users/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/cart">
                  <NavDropdown.Item>Cart</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </Col>
          ) : (
            <Card className="ms-auto me-5 bg-info">
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i>Login
                </Nav.Link>
              </LinkContainer>
            </Card>
          )}
          {userInfo && userInfo.is_staff && (
            <NavDropdown title="Admin" id="adminmenu">
              <LinkContainer to="/admin/userlist">
                <NavDropdown.Item>Users</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin/productlist">
                <NavDropdown.Item>Products</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/admin/orderlist">
                <NavDropdown.Item>Orders</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          )}
          {/* {userInfo && userInfo.is_staff && (
            <Card className="ms-auto me-5 bg-info">
              <NavDropdown title="Seller" id="adminmenu">
                <LinkContainer to="/seller/index">
                  <NavDropdown.Item>Dashboard</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/seller/manage">
                  <NavDropdown.Item>Manage Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/seller/revenue">
                  <NavDropdown.Item>Revenue</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/seller/qna">
                  <NavDropdown.Item>Q&A</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/seller/settings">
                  <NavDropdown.Item>Settings</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </Card>
          )} */}
          <Card className="ms-auto me-5 bg-info">
            <Nav className="ms-auto me-5">
              <NavDropdown title="글쓰기" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/editor">
                  <i class="fa-regular fa-image"></i>사진/영상올리기
                </NavDropdown.Item>
                <NavDropdown.Item href="/editor">
                  집들이 글쓰기
                </NavDropdown.Item>
                <NavDropdown.Item href="/editor">
                  노하우 글쓰기
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown.Divider />
            </Nav>
          </Card>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
