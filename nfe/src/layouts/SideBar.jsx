import React, { useEffect } from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Divider, ListItemIcon, Avatar } from '@mui/material';
import { Inbox, Mail, Logout } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/userActions';

export default function SideBar({ toggleDrawer, open }) {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
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
                  {userInfo && userInfo.image_url ? (
                    <Avatar src={VITE_API_BASE_URL + userInfo.image_url} /> // 이미지가 있는 경우 아바타 표시
                  ) : (
                    <Avatar /> // 이미지가 없는 경우 기본 아바타 표시
                  )}
                </ListItemIcon>
                <ListItemText className="text-gray-700" primary={userInfo && userInfo.nickname ? userInfo.nickname : '닉네임 없음'} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/users/myshopping">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Mail className="text-gray-700" />
                </ListItemIcon>
                <ListItemText className="text-gray-700" primary="나의 쇼핑" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/users/myreview">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Inbox className="text-gray-700" />
                </ListItemIcon>
                <ListItemText className="text-gray-700" primary="나의 리뷰" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/users/setting">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Mail className="text-gray-700" />
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
                    <Inbox className="text-gray-700" />
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
                    <Mail className="text-gray-700" />
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
              <Logout className="text-gray-700" />
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