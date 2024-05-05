import React, { useEffect, useState} from "react";
import { Row, Col, Form, Card } from "react-bootstrap";
import Product from "../components/Product";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loading from "../components/Loading";
import Message from "../components/Message";
// import Star from "../components/Star";
// import Paginate from "../components/Paginate";
// import ProductCarousel from "../components/ProductCarousel";


function UserProfileBookmark() {

  const location = useLocation();
//   const dispatch = useDispatch();
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState([]);
  const bookMarkList = useSelector(state => state.bookMarkList);
    const { loading, error, bookmarkItems } = bookMarkList;
  

  const params = new URLSearchParams(location.search);
  const query = params.get('query') || '';
  console.log(query);
//   const page = params.get('page') || 1;
//   const category = params.get('category');
//   const tag = params.get('tag');
  
  useEffect(() => {

  }
  , []);
  return (
    <div>
        {/* <ProductHeader /> */}
        <Row className="ml-3">
  <Col md={3}>
    <h3>Category</h3>
    <Form className='filter-form'>
      {/* {categories.map((category) => (
        <Form.Check 
          type={'checkbox'}
          id={category.id}
          label={category.name}
          key = {category.id}
          value={category.id}
          onChange={(e) => { 
            if (e.target.checked) {
              setSelectedCategory(prev => [...prev, e.target.value]);
            } else {
              setSelectedCategory(prev => prev.filter(cat => cat !== e.target.value));
            }
          }}
        />
      ))} */}
    </Form>
  </Col>
  <Col md={9}>
    {loading ? (
      <Loading />
    ) : error ? (
      <Message variant={'danger'}>{error}</Message>
    ) : (
      <Row>
        {bookmarkItems&&bookmarkItems.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
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

export default UserProfileBookmark
