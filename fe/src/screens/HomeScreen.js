import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Container, Grid, Typography, Card, CardContent, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { listProducts } from '../actions/productActions';
import { listBoards } from '../actions/boardActions';
import { listQNA } from '../actions/qnaActions';
import {Carousel} from 'react-bootstrap';

import Product from '../components/Product';
import BoardForm from '../components/BoardForm';
import QA from '../components/QA';
import Loading from '../components/Loading';
import Message from '../components/Message';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2, 0),
  },
}));

function HomeScreen({ location }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading: productLoading, error: productError, products } = productList;

  const boardList = useSelector((state) => state.boardList);
  const { loading: boardLoading, error: boardError, boards } = boardList;

  const qnaList = useSelector((state) => state.qnaList);
  const { loading: qnaLoading, error: qnaError, qnas } = qnaList;

  useEffect(() => {
    dispatch(listProducts());
    // dispatch(listReviews());
    dispatch(listBoards());
    dispatch(listQNA());
  }, [dispatch, location]);

  return (
    <Container className={classes.root}>
      <Typography variant="h4" className={classes.title}>Welcome to our Shop</Typography>
      <Typography variant="h5" className={classes.title}>Products</Typography>
      {productLoading ? (
        <Loading />
      ) : productError ? (
        <Message variant={"danger"}>{productError}</Message>
      ) : (
        <Grid container spacing={3}>
          {products.slice(0, 4).map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card variant="outlined">
              <Box height={300}>

              <Product product={product} />
              </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Typography variant="h5" className={classes.title}>Boards</Typography>
      {boardLoading ? (
        <Loading />
      ) : boardError ? (
        <Message variant={"danger"}>{boardError}</Message>
      ) : (
        // <Grid container spacing={3}>
        <Carousel>
          {boards.map((board) => (
            // <Grid item key={board.id} xs={12} sm={6} md={4} lg={3}>
            <Carousel.Item key={board.id}>
              <Box display="flex" justifyContent="center">
              <Card variant="outlined">
              <Box height={500} width={300}>

              <BoardForm board={board} />
              </Box>
              </Card>
              </Box>
            </Carousel.Item>
            // </Grid>
          ))}
        </Carousel>
        // </Grid>
      )}
      <Typography variant="h5" className={classes.title}>Q&A</Typography>
      {qnaLoading ? (
        <Loading />
      ) : qnaError ? (
        <Message variant={"danger"}>{qnaError}</Message>
      ) : (
        <Grid container spacing={3}>
          {qnas.slice(0,4).map((qna) => (
            <Grid item key={qna.id} xs={12} sm={6} md={4} lg={3}>
              <Card variant="outlined">
              <QA qna={qna} />
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default HomeScreen;