import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { listProducts } from "../actions/productActions";
import Loading from "../components/Loading";
import Message from "../components/Message";

// import Filter from "../components/Filter";
// import Star from "../components/Star";
// import Paginate from "../components/Paginate";
// import ProductCarousel from "../components/ProductCarousel";


function ProductsScreen() {
  const {query} = useParams().query;
  const productList = useSelector(state => state.productList);
  const { loading, error, products, pages } = productList;
  return (
    <div>
       <Row>
          <Col md={3}>
            {/* <Filter /> */}
          </Col>
          <Col md={9}>
            <h1>Latest Products</h1>
            {query?
            <h6>{query}에 관한 검색결과</h6>
            : null}
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
        {/* <div className="pagination-container"> */}
        {/* <Paginate pages={pages} page={page} keyword={query} /> */}
      {/* </div> */}
    </div>
  )
}

export default ProductsScreen
