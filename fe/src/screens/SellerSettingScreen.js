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
import SellerSettingMain from '../components/SellerSettingMain'
import SellerSettingItemManage from '../components/SellerSettingItemManage'
import SellerSettingProfit from '../components/SellerSettingProfit'
import Settings from '../components/Settings'
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
const [value, setValue] = useState(0)
const userLogin = useSelector((state) => state.userLogin)
const {userInfo} = userLogin


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Settings num={4} userInfo={userInfo}>
    <CustomTabPanel value={4} index={4}>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="전체보기" {...a11yProps(0)} />
          <Tab label="상품 관리" {...a11yProps(1)} />
          <Tab label="수익 확인" {...a11yProps(2)} />
          
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <SellerSettingMain />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
     <SellerSettingItemManage userInfo={userInfo}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <SellerSettingProfit />
      </CustomTabPanel>
    </Box>
    </CustomTabPanel>
  </Settings>
  )
}

export default SellerSettingScreen

