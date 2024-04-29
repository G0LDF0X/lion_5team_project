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
// import Star from "../components/Star";
// import Paginate from "../components/Paginate";
// import ProductCarousel from "../components/ProductCarousel";


function ProductsScreen() {

  const location = useLocation();
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { loading, error, products, pages } = productList;
  const params = new URLSearchParams(location.search);
  console.log(products)
  const query = params.get('q');
  const page = params.get('page') || 1;
  const category = params.get('category');
  const tag = params.get('tag');
  useEffect(() => {
    dispatch(listProducts());
  }
  , [dispatch, query, category, tag, page]);
  return (
    <div>
        {/* <ProductHeader /> */}
       <Row>
          <Col md={3}>

            {/* <ProductFilter /> */}
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
