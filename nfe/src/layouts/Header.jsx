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
import PhotoIcon from '@mui/icons-material/Photo';
import { logout } from "../store/actions/userActions";
import SearchBox from "./SearchBox";

function Header({ openModal, openPostModal, openSideBar }) {
  const navigate = useNavigate();
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);
  const [postMenuAnchorEl, setPostMenuAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleProfileMenu = (event) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  const handlePostMenu = (event) => {
    setPostMenuAnchorEl(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setProfileMenuAnchorEl(null);
  };

  const handleClosePostMenu = () => {
    setPostMenuAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#f8bbd0", boxShadow: "none" }}>      
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
            className="text-gray-700 hover:text-gray-900"
          >
            Home
          </Button>
          <Button
            startIcon={<Pets />}
            component={Link}
            to="/items"
            className="text-gray-700 hover:text-gray-900"
          >
            Products
          </Button>
          <Button
            startIcon={<PhotoIcon />}
            component={Link}
            to="/board"
            className="text-gray-700 hover:text-gray-900"
          >
            Board
          </Button>
          <Button
            startIcon={<QuestionAnswer />}
            component={Link}
            to="/qna"
            className="text-gray-700 hover:text-gray-900"
          >
            Q&A
          </Button>
        </Box>
        <SearchBox />
        <Box className="flex items-center space-x-2">
          {userInfo && (
            <IconButton color="inherit" component={Link} to="/cart">
              <ShoppingCart className="text-gray-700 hover:text-gray-900" />
            </IconButton>
          )}
          {userInfo ? (
            <div>
              <IconButton onClick={openSideBar} color="inherit">
                {userInfo.image_url ? (
                  <Avatar src={userInfo.image_url} />
                ) : (
                  <Avatar>{userInfo.username[0]}</Avatar>
                )}
              </IconButton >
              
            </div>
          ) : (
            <Button
              onClick={openModal}
              className="py-2 px-4 bg-blue-200 text-gray-700 rounded-md hover:bg-blue-300"
            >
              <AccountCircle className="mr-1" />
              Login
            </Button>
          )}
          {userInfo && (
            <div className="ml-4">
              <Button
                aria-controls="post-menu"
                aria-haspopup="true"
                onClick={handlePostMenu}
                className="bg-blue-200 text-gray-700 rounded-md hover:bg-blue-300"
              >
                글쓰기
              </Button>
              <Menu
                id="post-menu"
                anchorEl={postMenuAnchorEl}
                keepMounted
                open={Boolean(postMenuAnchorEl)}
                onClose={handleClosePostMenu}
                className="mt-2"
              >
                <MenuItem onClick={openPostModal} className="flex items-center space-x-2">
                  <i className="fa-regular fa-image"></i>
                  <Typography>PET 사진/영상올리기</Typography>
                </MenuItem>
                <MenuItem component={Link} to="/qna/create/" className="flex items-center space-x-2">
                  <i className="fa-regular fa-question-circle"></i>
                  <Typography>Q&A 글쓰기</Typography>
                </MenuItem>
              </Menu>
            </div>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;