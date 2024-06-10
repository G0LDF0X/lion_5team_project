import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
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
  InputBase
} from "@mui/material";
import {
  ShoppingCart,
  Home,
  Pets,
  QuestionAnswer,
  AccountCircle,
} from "@mui/icons-material";
import PhotoIcon from '@mui/icons-material/Photo';
import SearchBox from "./SearchBox";

function Header({ openModal, openPostModal, openSideBar }) {
  const [postMenuAnchorEl, setPostMenuAnchorEl] = useState(null);
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const handlePostMenu = (event) => {
    setPostMenuAnchorEl(event.currentTarget);
  };

  const handleClosePostMenu = () => {
    setPostMenuAnchorEl(null);
  };

  return (
    <AppBar position="static" className="bg-pink-500 shadow-none">
      <Toolbar className="flex justify-between bg-pink-200">
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
            className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
          >
            Home
          </Button>
          <Button
            startIcon={<Pets />}
            component={Link}
            to="/items"
            className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
          >
            Products
          </Button>
          <Button
            startIcon={<PhotoIcon />}
            component={Link}
            to="/board"
            className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
          >
            Board
          </Button>
          <Button
            startIcon={<QuestionAnswer />}
            component={Link}
            to="/qna"
            className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
          >
            Q&A
          </Button>
        </Box>

        <Box className="flex items-center space-x-2">
          
           <SearchBox />
          

          {userInfo && (
            <IconButton color="inherit" component={Link} to="/cart">
              <ShoppingCart className="text-gray-700 hover:text-gray-900 transition-colors duration-300" />
            </IconButton>
          )}
          {userInfo ? (
            <div className="flex items-center">
              <IconButton onClick={openSideBar} color="inherit">
                {userInfo.image_url ? (
                  <Avatar src={VITE_API_BASE_URL + userInfo.image_url} />
                ) : (
                  <Avatar>{userInfo.username[0]}</Avatar>
                )}
              </IconButton>
            </div>
          ) : (
            <Button
              onClick={openModal}
              className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
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
                className="bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
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