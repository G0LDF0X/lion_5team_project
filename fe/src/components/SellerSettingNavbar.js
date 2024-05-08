import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import UserSettingSettingNavbar from './UserSettingSettingNavbar';
import SellerSettingMain from './SellerSettingMain';
import SellerSettingProfit from './SellerSettingProfit';
import SellerSettingItemManage from './SellerSettingItemManage';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { listProducts, deleteProduct, createProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import Loading from './Loading';
import Message from './Message'
import { useNavigate } from 'react-router-dom';

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

export default function SellerSettingNavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const redirect = location.search ? location.search.split("=")[1] : "/";
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, success } = productList;
  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, error: errorDelete ,success: successDelete } = productDelete;
  const productCreate = useSelector((state) => state.productCreate);
  const { loading:loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;
  const productUpdate = useSelector((state) => state.productUpdate);
  const { success: successUpdate } = productUpdate;
  const [sellerProducts, setSellerProducts] = useState([]);
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  

    const createProductHandler = () => {
    dispatch(createProduct());
    // dispatch(createProduct(product));
}
const deleteHandler = (id) => {
  if (window.confirm('Are you sure')) {
    dispatch(deleteProduct(id));
  }
}
const updateHandler = (id) => {
  navigate(`/items/update/${id}`);
}
  const [value, setValue] = useState(0);
    const userLogin = useSelector((state) => state.userLogin);  
    const { userInfo } = userLogin;

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
        <SellerSettingMain />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <div><Row className="align-items-center">
    <Col>
      <h1>Products</h1>
    </Col>
    <Col className="text-right">
        <Button variant="light" className="btn-sm" onClick={createProductHandler}>
      {/* <Link to="/admin/product/create" className="btn btn-primary my-3"> */}
        <i className="fas fa-plus"></i> Create Product
      {/* </Link> */}
      </Button>
    </Col>
    </Row>
    {loadingDelete && <Loading /> }
    {errorDelete && <Message variant="danger">{errorDelete}</Message>}
    {loadingCreate && <Loading /> }
    {errorCreate && <Message variant="danger">{errorCreate}</Message>}
    {loading ? (
      <Loading />
    ) : error ? (
      <Message variant="danger">{error}</Message>
    ) : (<div>
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            {/* <th>BRAND</th> */}
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
                <td>산책용품</td> ) :
                product.category_id === 2 ? (
                  <td>간식</td>
                ) : null }
              {/* <td>{product.category}</td> */}
              {/* <td>{product.brand}</td> */}
              <td>
                {/* <LinkContainer to={`/items/update/${product.id}`}> */}
                  <Button variant="light" className="btn-sm" onClick={()=>updateHandler(product.id)}>
                    <i className="fas fa-edit"></i>
                    
                  </Button>
                {/* </LinkContainer> */}
                <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={(product) => deleteHandler(product.id)}
                >
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
      <CustomTabPanel value={value} index={2}>
        <SellerSettingProfit />
      </CustomTabPanel>
    </Box>
  );
}