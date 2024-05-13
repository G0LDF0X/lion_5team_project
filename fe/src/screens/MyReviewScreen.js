import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate} from 'react-router-dom'
import { listMyReviews } from '../actions/reviewActions'
import { Tab, Tabs, Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import UserSettingCreateReview from '../components/UserSettingCreateReview'
import MyReview from '../components/MyReview'
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
   <Settings num={2} userInfo={userInfo}>
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
    
  </Settings>
  )
}

export default MyReviewScreen

