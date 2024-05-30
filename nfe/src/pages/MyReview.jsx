import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate} from 'react-router-dom'
import { listMyReviews } from '../store/actions/reviewActions'
import { Tab, Tabs, Box, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import MyReview from '../components/profilescreen/MyReview'
import CreateReview from '../components/profilescreen/CreateReview'
function CustomTabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div className="p-4">
          <div>{children}</div>
        </div>
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
const myReviewList = useSelector((state) => state.myReviewList)
const { reviews } = myReviewList

useEffect(() => {
  if (!localStorage.getItem("userInfo")) {
    navigate("/login")
  }
  
dispatch(listMyReviews())
}
, [navigate])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
   
   
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="리뷰 쓰기" {...a11yProps(0)} />
          <Tab label="내가 작성한 리뷰" {...a11yProps(1)} />
         
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} >
        <CreateReview/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MyReview reviews={reviews}/>
      </CustomTabPanel>
    
    </Box>
   
  )
}

export default MyReviewScreen

