// import React from 'react'

// function HomeScreen() {
//   return (
//     <div>
//       Hello World
//     </div>
//   )
// }

// export default HomeScreen
import React, { useEffect, useState} from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
// import { listProducts } from "../actions/productActions";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Filter from "../components/Filter";
import HomeHeader from "../components/HomeHeader";
import ProductCarousel from "../components/ProductCarousel";
import ProductReviews from "../components/ProductReviews";
import QA from "../components/QA";
import Creators from "../components/Creators";
import Board from "../components/Board";
// import Star from "../components/Star";
// import Paginate from "../components/Paginate";
// import ProductCarousel from "../components/ProductCarousel";
function HomeScreen() {
  // const location = useLocation();
  // const dispatch = useDispatch();
  // const productList = useSelector(state => state.productList);
  // const { loading, error, products, pages } = productList;
  // const params = new URLSearchParams(location.search);
  // const query = params.get('query') || '';
  // const page = params.get('page') || 1;
  // useEffect(() => {
  //   console.log("query:",query);
  //   console.log("page:",page);
  //   dispatch(listProducts(query, page));
  // }
  // , [dispatch, query, page]);
    return (
      <div>
        {/* {!query && <ProductCarousel />} */}
        <HomeHeader />
        <ProductCarousel />
        <Row>
          {/* <Col md={3}>
            <Filter />
          </Col> */}
          <Col md={9}>
            <h1>Products</h1>
          {/* <Button style={{ width: '1px', height: '33px', borderRadius: '100%' }}></Button> */}
            {/* {loading ? (
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
            )} */}
          </Col>
          <ProductReviews />
          <Creators />
          <Board />
          <QA />
        </Row>
        <div className="pagination-container">
        {/* <Paginate pages={pages} page={page} keyword={query} /> */}
      </div>
      </div>
    );
  
}

export default HomeScreen;

