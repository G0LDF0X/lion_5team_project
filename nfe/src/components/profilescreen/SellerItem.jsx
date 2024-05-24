import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate,redirect } from "react-router-dom";
import {  Button, Row, Col, Table } from "react-bootstrap";
import Message from "../Message";
import { LinkContainer } from "react-router-bootstrap";
import Loading from "../Loading";
import {  deleteProduct, createProduct, listProductDetails} from "../../store/actions/productActions";
import ItemListSkeleton from "../ItemListSkeleton";
import { mainAxiosInstance } from "../../api/axiosInstances";

function SellerItem({userInfo}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const productDelete = useSelector((state) => state.productDelete);
    const { loading: loadingDelete, error: errorDelete ,success: successDelete } = productDelete;
    const productCreate = useSelector((state) => state.productCreate);
    const { loading:loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;
    const productUpdate = useSelector((state) => state.productUpdate);
    const { success: successUpdate } = productUpdate;
    
  
    const createProductHandler = () => {
      dispatch(createProduct());
  }
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = mainAxiosInstance.get('/items/myitems', {
            headers: {
                'Authorization': `Bearer ${userInfo.access}`
            }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setProducts(response.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchProducts();
  }, [navigate, successCreate, successDelete, successUpdate]);

    

      const deleteHandler = (id) => {   
        if(window.confirm("Are you sure?")){
          dispatch(deleteProduct(id));
          // dispatch(deleteProduct(id));
        }else{
          redirect("/admin/productlist"); 
        }
      }
      const updateHandler = (id) => {
        navigate(`/items/update/${id}`);
        dispatch(listProductDetails(id));
        console.log("updateHandler");
      }
  return (
    <div><Row className="align-items-center">
    <Col>
      <h1>Products</h1>
    </Col>
    <Col className="text-right">
        <Button variant="light" className="btn-md" onClick={createProductHandler}>
        <i className="fas fa-plus"></i> Create Product
      {/* </Link> */}
      </Button>
    </Col>
    </Row>
    {loadingDelete && <Loading /> }
    {errorDelete && <Message variant="danger">{errorDelete}</Message>}
    {loadingCreate && <Loading /> }
    {errorCreate && <Message variant="danger">{errorCreate}</Message>}
   {isLoading ? <ItemListSkeleton /> : (
     <div>
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
              <td><Link to = {`/items/detail/${product.id}`}>{product.name}</Link></td>
              <td>{product.price}₩</td>
              
                <td>{product.category}</td> 
              
                
              <td>
                <LinkContainer to={`/items/update/${product.id}`}>
                  <Button variant="light" className="btn-sm" onClick = {()=>updateHandler(product.id)}>
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
      </div>)}
    
    </div>
  )
}

export default SellerItem
