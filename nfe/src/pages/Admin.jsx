import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'
import { listProducts } from '../store/actions/productActions'
import { deleteProduct } from '../store/actions/productActions'
import { mainAxiosInstance } from '../api/axiosInstances'
import ManageUsers from '../components/profilescreen/ManageUsers'
import ManageSellers from '../components/profilescreen/ManageSellers'
import ManageProducts from '../components/profilescreen/ManageProducts'
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
function AdminManageScreen() {
const [value, setValue] = useState(0)
const [sellers, setSellers] = useState([])
const [users, setUsers] = useState([])
const dispatch = useDispatch()
const navigate = useNavigate()
const productList = useSelector((state) => state.productList)
const { loading, error, products } = productList
const productDelete = useSelector((state) => state.productDelete)
const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete
const user = useSelector((state) => state.user)
const { userInfo } = user
const deleteHandler = (id) => {
  if (window.confirm("Are you sure?")) {
    dispatch(deleteProduct(id));
  } else {
    navigate("/admin/productlist");
  }
};

const updateHandler = (id) => {
  navigate(`/items/update/${id}`);
};

const userDeleteHandler = (id) => {
  if (window.confirm("Are you sure?")) {
  }
};
const getSellerList = async () => {
    mainAxiosInstance.get('/users/sellers',
    {headers: {
        Authorization: `Bearer ${userInfo.access}`
    }}
    )
    .then((res) => {
        setSellers(res.data)
    })}
        
const getUserList = async () => {
    mainAxiosInstance.get('/users/users',
    {headers: {
        Authorization: `Bearer ${userInfo.access}`
    }}
    )
    .then((res) => {
        setUsers(res.data)
    })}


useEffect(() => {
  if(userInfo && userInfo.is_staff === false){
    navigate('/')
  }
    getSellerList()
    getUserList()
    dispatch(listProducts({ query: "", page: 1, category: [] }));
}
, [navigate])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="사용자 관리" {...a11yProps(0)} />
          <Tab label="판매자 관리" {...a11yProps(1)} />
          <Tab label="상품 관리" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <ManageUsers deleteUserHandler={userDeleteHandler} users={users}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ManageSellers  sellers={sellers}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
           <ManageProducts deleteHandler={deleteHandler} updateHandler={updateHandler} products={products} error={error} loading={loading} />
      </CustomTabPanel>
        </Box>

  )
}

export default AdminManageScreen

