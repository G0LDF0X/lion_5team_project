import React, { useEffect, useState} from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loading from "../components/Loading";
import Message from "../components/Message";
import ProductFilter from "../components/ProductFilter";
import ProductHeader from "../components/ProductHeader";
import Form from 'react-bootstrap/Form';
// import Star from "../components/Star";
// import Paginate from "../components/Paginate";
// import ProductCarousel from "../components/ProductCarousel";


function ProductsScreen() {

  const location = useLocation();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const productList = useSelector(state => state.productList);
  const { loading, error, products, pages } = productList;
  const params = new URLSearchParams(location.search);
  // console.log(products)
  const query = params.get('q');
  const page = params.get('page') || 1;
  const category = params.get('category');
  const tag = params.get('tag');
  const getCategories = async () => {
    const response = await fetch('/items/category');
    const data = await response.json();
    return data;
    
  }
  useEffect(() => {

    getCategories().then((data) => {
      setCategories(data);
      
    });
    dispatch(listProducts(query, page, selectedCategory));
  }
  , [dispatch, query, category, tag, page, selectedCategory]);
  return (
    <div>
        {/* <ProductHeader /> */}
       <Row>
          <Col md={3}>
          <Row>
    <Col xs={12} md={16}>

            <h3>Category</h3>
    <Form className='filter-form'>
        <div key={`default-checkbox`} className="mb-3">
         {categories.map((category) => (
            <Form.Check // prettier-ignore
            type={'checkbox'}
            id={category.id}
            label={category.name}
            value={category.id}
            onChange={(e) => { 
              if (e.target.checked) {
              setSelectedCategory(prev => [...prev, e.target.value]);
            } else {
              setSelectedCategory(prev => prev.filter(cat => cat !== e.target.value));
            }
            }}
            />
        ))}

        </div>
    </Form>
      </Col> 
 
  </Row>
          </Col>
          <Col md={9}>
            {/* <h1>Latest Products</h1> */}
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant={'danger'}>{error}</Message>
            ) : (
              <Row>
                {products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
        <div className="pagination-container">
        {/* <Paginate pages={pages} page={page} keyword={query} /> */}
      </div>
    </div>
  )
}

export default ProductsScreen
