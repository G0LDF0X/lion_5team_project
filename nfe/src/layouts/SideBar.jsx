import React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Divider, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import '../index.css';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/userActions';

export default function SideBar({ toggleDrawer, open }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  const DrawerList = (
    <Box
      className="w-64 h-full bg-cover bg-center text-white flex flex-col justify-between"
      style={{ backgroundImage: 'url(/path/to/your/image.jpg)' }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <div>
        <List>
          <Link to="/users/profile">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon className="text-gray-700" />
                </ListItemIcon>
                <ListItemText className="text-gray-700" primary="프로필" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/users/myshopping">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <MailIcon className="text-gray-700" />
                </ListItemIcon>
                <ListItemText className="text-gray-700" primary="나의 쇼핑" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/users/myreview">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon className="text-gray-700" />
                </ListItemIcon>
                <ListItemText className="text-gray-700" primary="나의 리뷰" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/users/setting">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <MailIcon className="text-gray-700" />
                </ListItemIcon>
                <ListItemText className="text-gray-700" primary="설정" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Divider />
          {(userInfo && userInfo.is_seller) || (userInfo && userInfo.is_staff) ? (
            <Link to="/seller/manage">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon className="text-gray-700" />
                  </ListItemIcon>
                  <ListItemText className="text-gray-700" primary="판매자 관리" />
                </ListItemButton>
              </ListItem>
            </Link>
          ) : null}
          {userInfo && userInfo.is_staff ? (
            <Link to="/admin/manage">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <MailIcon className="text-gray-700" />
                  </ListItemIcon>
                  <ListItemText className="text-gray-700" primary="관리자" />
                </ListItemButton>
              </ListItem>
            </Link>
          ) : null}
        </List>
        <Divider />
      </div>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon className="text-gray-700" />
            </ListItemIcon>
            <ListItemText className="text-gray-700" primary="로그아웃" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}