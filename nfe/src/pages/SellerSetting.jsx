import React, { useState} from 'react'
import { useSelector} from 'react-redux'
import { Tab, Tabs, Box, Typography } from '@mui/material' 
import PropTypes from 'prop-types'
import SellerMain from '../components/profilescreen/SellerMain';
import SellerItem from '../components/profilescreen/SellerItem';
import SellerProfit from '../components/profilescreen/SellerProfit';
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
function SellerSettingScreen() {
const [value, setValue] = useState(0)
const user = useSelector((state) => state.user)
const { userInfo } = user


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="전체보기" {...a11yProps(0)} />
          <Tab label="상품 관리" {...a11yProps(1)} />
          <Tab label="수익 확인" {...a11yProps(2)} />
          
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <SellerMain />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
     <SellerItem userInfo={userInfo}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <SellerProfit/>
      </CustomTabPanel>
    </Box>
  )
}

export default SellerSettingScreen

