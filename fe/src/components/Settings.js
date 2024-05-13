import React from 'react'
import { Tab, Tabs, Box } from '@mui/material'
import {Link} from 'react-router-dom'

function Settings({num, children, userInfo}) {

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  return (
    <Box sx={{ width: "100%" }}>
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs value={num} aria-label="basic tabs example" centered>
        <Link to="/users/profile">
          <Tab label="프로필" {...a11yProps(0)} />
        </Link>
        <Link to="/users/myshopping">
          <Tab label="나의 쇼핑" {...a11yProps(1)} />
        </Link>
        <Link to="/users/myreview">
          <Tab label="나의 리뷰" {...a11yProps(2)} />
        </Link>
        <Link to="/users/setting">
          <Tab label="설정" {...a11yProps(3)} />
        </Link>
        {(userInfo && userInfo.is_seller) ||
        (userInfo && userInfo.is_staff) ? (
          <Link to="/seller/manage">
            <Tab label="판매자 관리" {...a11yProps(4)} />
          </Link>
        ) : null}
        {userInfo && userInfo.is_staff ? (
          <Link to="/admin/manage">
            <Tab label="관리자" {...a11yProps(5)} />
          </Link>
        ) : null}
      </Tabs>
    </Box>
    
     {children}
    
  </Box>
  )
}

export default Settings
