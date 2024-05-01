import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation, redirect } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { login } from "../actions/userActions";
import Message from "../components/Message";
// import Paginate from "../components/Paginate";
import { LinkContainer } from "react-router-bootstrap";
import Loading from "../components/Loading";
import { listProducts, deleteProduct, createProduct} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants"; 

function ProductListScreen() {
    const dispatch = useDispatch();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const navigate = useNavigate();
    const redirect = location.search ? location.search.split("=")[1] : "/";
    const productList = useSelector((state) => state.productList);
    const { loading, error, products, pages, success } = productList;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const productDelete = useSelector((state) => state.productDelete);
    const { loading: loadingDelete, error: errorDelete ,success: successDelete } = productDelete;
    const productCreate = useSelector((state) => state.productCreate);
    const { loading:loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;
    const productUpdate = useSelector((state) => state.productUpdate);
    const { success: successUpdate } = productUpdate;
    const [sellerProducts, setSellerProducts] = useState([]);


    // const page = params.get('page') || 1;
    // let keyword = params.get('query') || '';
    const createProductHandler = () => {
      dispatch(createProduct());
      // dispatch(createProduct(product));
  }
  
    useEffect(() => {
      // if(!userInfo.isAdmin) {
        //     navigate("/login");
        // }
        dispatch({ type: PRODUCT_CREATE_RESET });
        if(successCreate){
          navigate(`/items/update/${createdProduct.id}`);
        }else{
          dispatch(listProducts());
          if(products){
            if(success){
              if(products.seller_id === userInfo.id){
              setSellerProducts(products);
            }
          }
        }}
        
      }
      , [dispatch, navigate, userInfo, successDelete, successCreate, successUpdate]);
      const deleteHandler = (id) => {   
        if(window.confirm("Are you sure?")){
          dispatch(deleteProduct(id));
          // dispatch(deleteProduct(id));
        }else{
          redirect("/admin/productlist"); 
        }
      }
  return (
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
                <LinkContainer to={`/items/update/${product.id}`}>
                  <Button variant="light" className="btn-sm">
                    <i className="fas fa-edit"></i>
                  </Button>
                </LinkContainer>
                <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={() => deleteHandler(product.id)}
                >
                  <i className="fas fa-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* <Paginate pages={pages} page={page} keyword="" isAdmin={true} /> */}
      </div>
    )}
    </div>
  )
}

export default ProductListScreen
