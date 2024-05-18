import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Button, Avatar, Typography, Box } from "@mui/material";
import { ShoppingCart, Home, Pets, Forum, QuestionAnswer, AccountCircle } from '@mui/icons-material';
// import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";

function Header() {
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
    <AppBar position="static" className="bg-white shadow-md">
      <Toolbar className="flex justify-between">
        <Typography variant="h6" component={Link} to="/" className="text-pink-500 no-underline font-bold">
          PetPals
        </Typography>
        <Box className="flex space-x-4">
          <Button startIcon={<Home />} component={Link} to="/" className="text-gray-700">Home</Button>
          <Button startIcon={<Pets />} component={Link} to="/items" className="text-gray-700">Products</Button>
          <Button startIcon={<Forum />} component={Link} to="/board" className="text-gray-700">Board</Button>
          <Button startIcon={<QuestionAnswer />} component={Link} to="/qna" className="text-gray-700">Q&A</Button>
        </Box>
        <SearchBox />
        <Box className="flex items-center space-x-2">
          {userInfo && (
            <IconButton color="inherit" component={Link} to="/cart">
              <ShoppingCart className="text-gray-700" />
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
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleClose} component={Link} to="/profile">Profile</MenuItem>
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button component={Link} to="/login" variant="outlined" className="text-gray-700 border-gray-700">
              <AccountCircle className="mr-1" />
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;