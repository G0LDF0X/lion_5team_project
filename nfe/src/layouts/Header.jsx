import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Typography,
  Box,
} from "@mui/material";
import {
  ShoppingCart,
  Home,
  Pets,
  Forum,
  QuestionAnswer,
  AccountCircle,
} from "@mui/icons-material";
import { logout } from "../store/actions/userActions";
import SearchBox from "./SearchBox";

function Header({ openModal, openPostModal }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#f8bbd0", boxShadow: "none" }}
    >
      <Toolbar className="flex justify-between">
        <Typography
          variant="h6"
          component={Link}
          to="/"
          className="text-pink-700 no-underline font-bold"
        >
          PetPals
        </Typography>
        <Box className="flex space-x-4">
          <Button
            startIcon={<Home />}
            component={Link}
            to="/"
            className="text-white"
          >
            Home
          </Button>
          <Button
            startIcon={<Pets />}
            component={Link}
            to="/items"
            className="text-white"
          >
            Products
          </Button>
          <Button
            startIcon={<Forum />}
            component={Link}
            to="/board"
            className="text-white"
          >
            Board
          </Button>
          <Button
            startIcon={<QuestionAnswer />}
            component={Link}
            to="/qna"
            className="text-white"
          >
            Q&A
          </Button>
        </Box>
        <SearchBox />
        <Box className="flex items-center space-x-2">
          {userInfo && (
            <IconButton color="inherit" component={Link} to="/cart">
              <ShoppingCart className="text-white" />
            </IconButton>
          )}
          {userInfo ? (
            <div>
              <IconButton onClick={handleMenu} color="inherit">
                {userInfo.image_url ? (
                  <Avatar src={userInfo.image_url} />
                ) : (
                  <Avatar>{userInfo.name[0]}</Avatar>
                )}
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={handleClose} component={Link} to="/profile">
                  Profile
                </MenuItem>
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button
              onClick={openModal}
              className="py-2 px-4 bg-blue-500 rounded-md hover:bg-blue-700"
            >
              {" "}
              <AccountCircle className="mr-1" />
              Login
            </Button>
          )}
          {userInfo && (
            <div className="ml-4">
              <NavDropdown title="글쓰기" id="navbarScrollingDropdown" drop="left" className="bg-blue-500 text-white rounded-md">
                <NavDropdown.Item >
                  <Button className="text-white" onClick={openPostModal}>
                  <i className="fa-regular fa-image mr-2"></i>PET 사진/영상올리기
                  </Button>
                </NavDropdown.Item>
                <NavDropdown.Item href="/qna/create/">
                  <i className="fa-regular fa-question-circle mr-2"></i>Q&A 글쓰기
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
