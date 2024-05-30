import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";

import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import Message from "../components/Message";


function UserProfileBookmark() {

  const bookMarkList = useSelector(state => state.bookMarkList);
    const { loading, error, bookMarkItems } = bookMarkList;
  
  
    <div>
  
        <Row className="ml-3">
  <Col md={9}>
    {loading ? (
      <Loading />
    ) : error ? (
      <Message variant={'danger'}>{error}</Message>
    ) : (
      <Row>
        {bookMarkItems&&bookMarkItems.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
            {console.log(product)}
            <Product product={product} id={product.item_id} />
          </Col>
        ))}
      </Row>
    )}
  </Col>
</Row>
    </div>
  
}

export default UserProfileBookmark
