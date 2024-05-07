import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Nav, Navbar, NavDropdown, Container, Col } from "react-bootstrap";
import SearchBox from "./SearchBox";
import { Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import Avatar from "@mui/material/Avatar";

function Header() {
  const navigate = useNavigate();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
    dispatch({ type: "BOOKMARK_LIST_RESET" });
    dispatch({ type: "CART_LIST_RESET" });

  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Navbar>
      <Container fluid>
        <div style={{ display: 'flex', alignItems: 'center'}}>
        {/* <Navbar.Brand href="/">PetPals</Navbar.Brand> */}
        <Navbar.Brand href="/" style={{ fontWeight: 'bold' }}>PetPals</Navbar.Brand>
        <Nav>
          <Nav.Link href="/">
            <div style={{ display: 'flex', alignItems:'center' }}>
            <i class="fa-solid fa-paw" style={{ marginRight: '3px' }}></i>
            <span>Home</span>
            </div>
          </Nav.Link>
          <Nav.Link href="/items">
          <div style={{ display: 'flex', alignItems:'center' }}>
            <i class="fa-solid fa-dog" style={{ marginRight: '3px' }}></i>
            <span>Products</span>
            </div>
          </Nav.Link>
          <Nav.Link href="/board">
          <div style={{ display: 'flex', alignItems:'center' }}>
          <i class="fa-regular fa-clipboard" style={{ marginRight: '3px' }}></i>
            <span>Board</span>
            </div>
          </Nav.Link>
          <Nav.Link href="/qna">
          <div style={{ display: 'flex', alignItems:'center' }}>
          <i class="fa-solid fa-comments" style={{ marginRight: '3px' }}></i>
            <span>Q&A</span>
            </div>
          </Nav.Link>
        </Nav>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <SearchBox />

        </div>
        <IconButton
          size="large"
          aria-label="show cart items"
          color="inherit"
        >
          <Link to="/cart">
            <i class="fa-solid fa-cart-shopping fa-xs"></i>
          </Link>
        </IconButton>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
             {userInfo ? (
           <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link to="/users/profile">Profile</Link>
                  </MenuItem>
                <MenuItem onClick={logoutHandler}>
                    Logout
                  </MenuItem>
              </Menu>
            </div>
            ) : (
            <Card className="ms-auto me-3 bg-info">
              <LinkContainer to="/login">
                <Nav.Link>
                  <div style={{ display: 'flex', alignItems: 'center', padding: '8px 15px' }}>
                  <i className="fas fa-user"></i>
                  <span>Login</span>
                  </div>
                </Nav.Link>
              </LinkContainer>
            </Card>
            // <Col className="ms-auto me-5 ">
            //   <NavDropdown
            //     title={<Avatar alt="" src="/cat.jpg" />}
            //     id="username"
            //   >
            //     <LinkContainer to="/users/profile">
            //       <NavDropdown.Item>Profile</NavDropdown.Item>
            //     </LinkContainer>
            //     <LinkContainer to="/cart">
            //       <NavDropdown.Item>Cart</NavDropdown.Item>
            //     </LinkContainer>
            //     <NavDropdown.Item onClick={logoutHandler}>
            //       Logout
            //     </NavDropdown.Item>
            //   </NavDropdown>
            // </Col>
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
          <Card className="ms-auto me-2 bg-info">
          <Nav className="ms-auto me-2">
            <NavDropdown title="글쓰기" id="navbarScrollingDropdown" drop='left'>
              <NavDropdown.Item href="/board/create/">
                <i class="fa-regular fa-image"></i>PET 사진/영상올리기
              </NavDropdown.Item>
              <NavDropdown.Item href="/qna/create/">
                Q&A 글쓰기
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
