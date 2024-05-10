import React, {useEffect, useState} from 'react'
// import UserSettingNavBar from '../components/UserSetitngNavbar'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { getUserDetails, listSellers, listUsers, logout } from '../actions/userActions'
import { listBookMark } from '../actions/bookmarkActions'
import { listMyProducts, listProducts } from '../actions/productActions'
import { getMyOrders } from '../actions/orderActions'
import { listMyReviews } from '../actions/reviewActions'
import { Tab, Tabs, Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import UserSettingSettingNavbar from '../components/UserSettingSettingNavbar'
import SellerSettingNavBar from '../components/SellerSettingNavbar';
import UserSettingProfileNavbar from '../components/UserSettingProfileNavBar';
// import UserSettingMyshoppingNavbar from '../components/UserSettingMyshoppingNavbar';
import UserSettingMyreviewNavbar from '../components/UserSettingMyreviewNavbar';
import AdminNavBar from '../components/AdminNavBar';
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function SellerSettingScreen() {
const [value, setValue] = useState(4)
const dispatch = useDispatch()
const navigate = useNavigate()
const userLogin = useSelector((state) => state.userLogin)
const {userInfo} = userLogin

useEffect(() => {
if (!userInfo || !userInfo.username) {
navigate('/login')
}else{
dispatch(listBookMark())
dispatch(getUserDetails(userInfo.id))
dispatch(listProducts())
dispatch(getMyOrders())
dispatch(listMyReviews())
if(userInfo.is_seller){
  dispatch(listMyProducts())
  dispatch(listSellers())
  dispatch(listUsers()) 
}

}
}
, [navigate])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%' }}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
        <Link to="/users/profile"><Tab label="프로필" {...a11yProps(0)} /></Link>
       <Link to="/users/myshopping"> <Tab label="나의 쇼핑" {...a11yProps(1)} /></Link>
        <Link to="/users/myreview"><Tab label="나의 리뷰" {...a11yProps(2)} /></Link>
          <Link to="/users/setting"><Tab label="설정" {...a11yProps(3)} /></Link>
        {userInfo&&userInfo.is_seller|| userInfo&&userInfo.is_staff ? (<Link to="/seller/manage"><Tab label="판매자 관리" {...a11yProps(4)} /></Link>) : null}
        {userInfo&&userInfo.is_staff ? (<Link to="/admin/manage"><Tab label="관리자" {...a11yProps(5)} /></Link>) : null}
      </Tabs>
    </Box>
    <CustomTabPanel value={value} index={0}>
      <UserSettingProfileNavbar />
    </CustomTabPanel>
    <CustomTabPanel value={value} index={1}>
      {/* <UserSettingMyshoppingNavbar /> */}
    </CustomTabPanel>
    <CustomTabPanel value={value} index={2}>
      <UserSettingMyreviewNavbar />
    </CustomTabPanel>
    <CustomTabPanel value={value} index={3}>
      <UserSettingSettingNavbar />
    </CustomTabPanel>
    <CustomTabPanel value={value} index={4}>
      <SellerSettingNavBar />
    </CustomTabPanel>
    <CustomTabPanel value={value} index={5}>
      <AdminNavBar />
    </CustomTabPanel>
  </Box>
  )
}

export default SellerSettingScreen

