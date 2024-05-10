import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {listSellers, listUsers, logout } from '../actions/userActions'
import { Tab, Tabs, Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { deleteUser } from '../actions/userActions'
import Message from '../components/Message'
import Loading from '../components/Loading'

import AdminNavBar from '../components/AdminNavBar';
import { listProducts } from '../actions/productActions'
import { deleteProduct } from '../actions/productActions'
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
function AdminManageScreen() {
const [value, setValue] = useState(0)
const dispatch = useDispatch()
const navigate = useNavigate()
const userLogin = useSelector((state) => state.userLogin)
const {userInfo} = userLogin
const userList = useSelector((state) => state.userList)
const { users } = userList
const sellerList = useSelector((state) => state.sellerList)
const { sellers } = sellerList
const productList = useSelector((state) => state.productList)
const { loading, error, products } = productList
const productDelete = useSelector((state) => state.productDelete)
const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete
const productCreate = useSelector((state) => state.productCreate)
const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

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
    // DELETE SELLER
  }
};

useEffect(() => {
  dispatch(listSellers())
  dispatch(listUsers()) 
  dispatch (listProducts())
}
, [navigate])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%' }}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={5} aria-label="basic tabs example" centered>
        <Link to="/users/profile"><Tab label="프로필" {...a11yProps(0)} /></Link>
       <Link to="/users/myshopping"> <Tab label="나의 쇼핑" {...a11yProps(1)} /></Link>
        <Link to="/users/myreview"><Tab label="나의 리뷰" {...a11yProps(2)} /></Link>
          <Link to="/users/setting"><Tab label="설정" {...a11yProps(3)} /></Link>
        {userInfo&&userInfo.is_seller|| userInfo&&userInfo.is_staff ? (<Link to="/seller/manage"><Tab label="판매자 관리" {...a11yProps(4)} /></Link>) : null}
        {userInfo&&userInfo.is_staff ? (<Link to="/admin/manage"><Tab label="관리자" {...a11yProps(5)} /></Link>) : null}
      </Tabs>
    </Box>
    
    <CustomTabPanel value={5} index={5}>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="사용자 관리" {...a11yProps(0)} />
          <Tab label="판매자 관리" {...a11yProps(1)} />
          <Tab label="상품 관리" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <div>
      <h1>Users</h1>
    
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
             
              <th>USER ID</th>
              
              <th>NAME</th>
              <th>EMAIL</th>
              <th>SELLER</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users&&users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>

                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  {user.is_seller ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {user.is_staff ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                
               
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                    <Button variant="danger" className="btn-sm" onClick={()=>userDeleteHandler(user.id)}>
                        <i className="fas fa-trash"></i>
                    </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      
    </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <div>
      <h1>Sellers</h1>
    
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>SELLER ID</th>
              <th>USER ID</th>
              <th>BS NUMBER</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sellers&&sellers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.user_id}</td>
                <td>{user.bs_number}</td>
                <td>{user.user}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                    <Button variant="danger" className="btn-sm" onClick={()=>userDeleteHandler(user.user_id)}>
                        <i className="fas fa-trash"></i>
                    </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      
    </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
            <div>
              <Row className="align-items-center">
                <Col>
                  <h1>Products</h1>
                </Col>
               
              </Row>
              {loadingDelete && <Loading />}
              {errorDelete && <Message variant="danger">{errorDelete}</Message>}
              
              {errorCreate && <Message variant="danger">{errorCreate}</Message>}
              {loading ? (
                <Loading />
              ) : error ? (
                <Message variant="danger">{error}</Message>
              ) : (
                <div>
                  <Table striped bordered hover responsive className="table-sm">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td>{product.id}</td>
                          <td>{product.name}</td>
                          <td>{product.price}₩</td>
                          {product.category_id === 1 ? (
                            <td>산책용품</td>
                          ) : product.category_id === 2 ? (
                            <td>간식</td>
                          ) : null}
                          <td>
                            <Button variant="light" className="btn-sm" onClick={() => updateHandler(product.id)}>
                              <i className="fas fa-edit"></i>
                            </Button>
                            <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(product.id)}>
                              <i className="fas fa-trash"></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </div>
      </CustomTabPanel>
        </Box>
    </CustomTabPanel>
  </Box>
  )
}

export default AdminManageScreen

