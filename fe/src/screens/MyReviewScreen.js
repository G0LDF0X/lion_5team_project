import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate} from 'react-router-dom'
import { listMyReviews } from '../actions/reviewActions'
import { Tab, Tabs, Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import UserSettingCreateReview from '../components/UserSettingCreateReview'
import MyReview from '../components/MyReview'
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
function MyReviewScreen() {
const [value, setValue] = useState(0)
const dispatch = useDispatch()
const navigate = useNavigate()
const userLogin = useSelector((state) => state.userLogin)
const {userInfo} = userLogin
const myReviewList = useSelector((state) => state.myReviewList)
const { reviews } = myReviewList

useEffect(() => {
dispatch(listMyReviews())
}
, [navigate])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%' }}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={2}  aria-label="basic tabs example" centered>
        <Tab label="프로필" {...a11yProps(0)} />
       <Link to="/users/myshopping"> <Tab label="나의 쇼핑" {...a11yProps(1)} /></Link>
        <Link to="/users/myreview"><Tab label="나의 리뷰" {...a11yProps(2)} /></Link>
          <Link to="/users/setting"><Tab label="설정" {...a11yProps(3)} /></Link>
        {userInfo&&userInfo.is_seller|| userInfo&&userInfo.is_staff ? (<Link to="/seller/manage"><Tab label="판매자 관리" {...a11yProps(4)} /></Link>) : null}
        {userInfo&&userInfo.is_staff ? (<Link to="/admin/manage"><Tab label="관리자" {...a11yProps(5)} /></Link>) : null}
      </Tabs>
    </Box>
    
    <CustomTabPanel value={2} index={2}>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="리뷰 쓰기" {...a11yProps(0)} />
          <Tab label="내가 작성한 리뷰" {...a11yProps(1)} />
         
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} >
        <UserSettingCreateReview />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MyReview reviews={reviews}/>
      </CustomTabPanel>
    
    </Box>
    </CustomTabPanel>
    
  </Box>
  )
}

export default MyReviewScreen

