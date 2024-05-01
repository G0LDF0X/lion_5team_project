import React, { useEffect, useState } from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import { Typography } from '@material-ui/core';
import Product from "../components/Product";
import Review from "../components/Review";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {listReviews} from "../actions/reviewActions";
import { listProducts } from "../actions/productActions";
import { listBoards } from "../actions/boardActions";
import { listQNA } from "../actions/qnaActions";

import Loading from "../components/Loading";
import Message from "../components/Message";
import Filter from "../components/Filter";
import HomeHeader from "../components/HomeHeader";
import ProductCarousel from "../components/ProductCarousel";
import ProductReviews from "../components/ProductReviews";
import QA from "../components/QA";
import Creators from "../components/Creators";
import Board from "../components/Board";

function HomeScreen() {
  const location = useLocation();
  const dispatch = useDispatch();
  
  const productList = useSelector(state => state.productList);
  const { loading: productLoading, error: productError, products, pages } = productList;

  const boardList = useSelector(state => state.boardList);
  const { loading: boardLoading, error: boardError, boards } = boardList;

  const qnaList = useSelector(state => state.qnaList);
  const { loading: qnaLoading, error: qnaError, qnas } = qnaList;

  useEffect(() => {
    dispatch(listProducts());
    dispatch(listReviews());
    dispatch(listBoards());
    dispatch(listQNA());
  }, [dispatch, location]);

  return (
    <Container>
      <Row className="my-4">
        <Col md={9}>
          <Typography variant="h4" component={Link} to="/items" className="text-decoration-none">
            Products
          </Typography>
          {productLoading ? (
            <Loading />
          ) : productError ? (
            <Message variant={'danger'}>{productError}</Message>
          ) : (
            <Row>
              {products.slice(0,3).map((product) => (
                <Col key={product.id} sm={12} md={6} lg={4} xl={3} className="mb-4">
                  <Card className="h-100 shadow-sm bg-white rounded">
                    <Product product={product} />
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
      <Row className="my-4">
        <Col md={9}>
          <Typography variant="h4" component={Link} to="/board" className="text-decoration-none">
            Boards
          </Typography>
          {boardLoading ? (
            <Loading />
          ) : boardError ? (
            <Message variant={"danger"}>{boardError}</Message>
          ) : (
            <Row>
              {boards.map((board) => (
                <Col key={board.id} sm={12} md={6} lg={4} xl={3} className="mb-4">
                  <Card className="h-100 shadow-sm bg-white rounded">
                    <Board board={board} />
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
      <Row className="my-4">
        <Col md={9}> 
          <Typography variant="h4" component={Link} to="/qna" className="text-decoration-none">
            Q&A
          </Typography>
          {qnaLoading ? (
            <Loading />
          ) : qnaError ? (
            <Message variant={"danger"}>{qnaError}</Message>
          ) : (
            <Row>
              {qnas.map((qna) => (
                <Col key={qna.id} sm={12} md={6} lg={4} xl={3} className="mb-4">
                  <Card className="h-100 shadow-sm bg-white rounded">
                    <QA qna={qna} />
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row> 
      <div className="pagination-container">
      </div>
    </Container>
  );
}

export default HomeScreen;