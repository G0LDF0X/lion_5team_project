import React, { useEffect, useState} from 'react'
import { useSelector} from 'react-redux'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Box from '@mui/material/Box' 
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import SellerMain from '../components/profilescreen/SellerMain';
import SellerItem from '../components/profilescreen/SellerItem';
import SellerProfit from '../components/profilescreen/SellerProfit';
import { mainAxiosInstance } from '../api/axiosInstances'
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
const [products, setProducts] = useState([])
const [isLoading, setIsLoading] = useState(false)

const user = useSelector((state) => state.user)
const { userInfo } = user
const navigate = useNavigate()  
useEffect(() => {
  if (!userInfo.is_staff && !userInfo.is_seller) {
    navigate("/");
  }
}
, [navigate]);
const fetchProducts = async () => {
  setIsLoading(true);
  try {
    const response = await mainAxiosInstance.get("/items/myitems", {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    });
    setProducts(response.data);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    setIsLoading(false);
  }
};

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
     <SellerItem  fetchProducts={fetchProducts} products={products} isLoading={isLoading}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <SellerProfit/>
      </CustomTabPanel>
    </Box>
  )
}

export default SellerSettingScreen

