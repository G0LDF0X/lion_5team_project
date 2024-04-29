
import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import Product from "../components/Product";
import Review from "../components/Review";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import {listReviews} from "../actions/reviewActions";
import { listProducts } from "../actions/productActions";
import { listBoards } from "../actions/boardActions";
import { listQNA } from "../actions/qnaActions";
// import { listCreators } from "../actions/creatorActions";

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
  const location = useLocation();
  const dispatch = useDispatch();
  const reviewList = useSelector((state) => state.reviewList);
  const { loading:reviewLoading, error:reviewError, reviews } = reviewList;
  
  const productList = useSelector(state => state.productList);
  const { loading: productLoading, error: productError, products, pages } = productList;

  const boardList = useSelector(state => state.boardList);
  const { loading: boardLoading, error: boardError, boards } = boardList;

  const qnaList = useSelector(state => state.qnaList);
  const { loading: qnaLoading, error: qnaError, qnas } = qnaList;

  // const creatorList = useSelector(state => state.creatorList);
  // const { loading: creatorLoading, error: creatorError, creators } = creatorList;
  // const params = new URLSearchParams(location.search);
  // const query = params.get('query') || '';
  // const page = params.get('page') || 1;
  useEffect(() => {
  //   console.log("query:",query);
  //   console.log("page:",page);
  //   dispatch(listProducts(query, page));
  // }
  dispatch(listProducts());
  dispatch(listReviews());
  dispatch(listBoards());
  dispatch(listQNA());
  // dispatch(listCreators());
  }
  , [dispatch, location]);
  console.log(qnas)
  return (
    <div>
      {/* {!query && <ProductCarousel />} */}
      <HomeHeader />
      {/* <Row>
        <Link to="/items">
         <Col md={20}>
          <Card style={{height:'300px', borderRadius:'0'}}>
            <h1>Products</h1>
            
          </Card>
          
          </Col>
        </Link>
        <Link to="/reviews">
        <Col md={20}>
          <Card style={{height:'300px', borderRadius:'0'}}>
            <h1>Reviews</h1>
          </Card>
        </Col>
        </Link>
        <Link to="/creators">
        <Col md={20}>
          <Card style={{height:'300px', borderRadius:'0'}}>
            <h1>Creators</h1>
          </Card>
        </Col>
        </Link>
        <Link to="/board">
        <Col md={20}>
          <Card style={{height:'300px', borderRadius:'0'}}>
            <h1>Boards</h1>
          </Card>
        </Col>
        </Link>
        <Link to="/qna">
        <Col md={20}>
          <Card style={{height:'300px', borderRadius:'0'}}>
            <h1>Q&A</h1>
          </Card>
        </Col> 
        </Link>
      </Row> */}
      { <Row>
     
        <Col md={9}>
          <Link to="/items">
          <h1>Products</h1>
          </Link>
          {productLoading ? (
              <Loading />
            ) : productError ? (
              <Message variant={'danger'}>{productError}</Message>
            ) : (
              <Row>
                {products.slice(0,3).map((product) => (
                  <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            )}
        </Col>
        {/* <Col md={9}>
          <h1>Reviews</h1>
          {reviewLoading ? (
            <Loading />
          ) : reviewError ? (
            <Message variant={"danger"}>{reviewError}</Message>
          ) : (
            <Row>
              {reviews.map((review) => (
                <Col key={review._id} sm={12} md={6} lg={4} xl={3}>
                  <ProductReviews reviews={review} />
                </Col>
              ))}
            </Row>
          )}
        
        </Col>   */}
        {/* <Col md={9}>
          <h1>Creators</h1>
          {creatorLoading ? (
            <Loading />
          ) : creatorError ? (
            <Message variant={"danger"}>{creatorError}</Message>
          ) : (
            <Row>
              {creators.map((creator) => (
                <Col key={creator._id} sm={12} md={6} lg={4} xl={3}>
                  <Creators creator={creator} />
                </Col>
              ))}
            </Row>
          )}
        </Col> */}
        <Col md={9}>
          <Link to="/board">
          <h1>Boards</h1>
          </Link>
          {boardLoading ? (
            <Loading />
          ) : boardError ? (
            <Message variant={"danger"}>{boardError}</Message>
          ) : (
            <Row>
              {boards.map((board) => (
                <Col key={board.id} sm={12} md={6} lg={4} xl={3}>
                  <Board board={board} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
        <Col md={9}> 
          <Link to="/qna"> 
          <h1>Q&A</h1>
          </Link>
          {qnaLoading ? (
            <Loading />
          ) : qnaError ? (
            <Message variant={"danger"}>{qnaError}</Message>
          ) : (
            <Row>
              {qnas.map((qna) => (
                <Col key={qna.id} sm={12} md={6} lg={4} xl={3}>
                  <QA qna={qna} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row> }
      <div className="pagination-container">
      </div>
    </div>
  );
}

export default HomeScreen;
