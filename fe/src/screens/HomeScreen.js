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
  
  function createCarouselItem(products) {
    return (
      <Carousel.Item>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card variant="outlined" style={{width:"250px"}}>
                <Box height={400} style={{width:"250px"}}>
                  <Product product={product} id={product.id} />
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Carousel.Item>
    );
  }

  return (
    <Container className={classes.root}>
      <Typography variant="h4" className={classes.title}>Welcome to our Shop</Typography>
      <Typography variant="h5" className={classes.title}>Products</Typography>
      {productLoading ? (
        <Loading />
      ) : productError ? (
        <Message variant={"danger"}>{productError}</Message>
      ) : (
        <Carousel>
        {createCarouselItem(products.slice(0, 4))}
        {createCarouselItem(products.slice(5, 9))}
        {createCarouselItem(products.slice(10, 15))}
        </Carousel>
      )}
      <Typography variant="h5" className={classes.title}>Boards</Typography>
      {boardLoading ? (
        <Loading />
      ) : boardError ? (
        <Message variant={"danger"}>{boardError}</Message>
      ) : (
        <Carousel>
          {boards.slice(0,4).map((board) => (
            <Carousel.Item key={board.id}>
              <Box display="flex" justifyContent="center">
              <Card variant="outlined">
              <Box height={500} width={300}>

              <BoardForm board={board} />
              </Box>
              </Card>
              </Box>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
      {/* <Typography variant="h5" className={classes.title} style={{ color: '#3f51b5'}}>Q&A</Typography> */}
      <Box display="flex" alignItems="center">
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-2h-2v2zm2-4h-2V7h2v6z"/>
      </svg>
      <Typography variant="h5" className={classes.title} style={{ color: '#000000', marginLeft: '10px' }}> Q&A</Typography>
    </Box>
      {qnaLoading ? (
        <Loading />
      ) : qnaError ? (
        <Message variant={"danger"}>{qnaError}</Message>
      ) : (
        <Grid container spacing={3}>
          {qnas.slice(0,4).map((qna) => (
            <Grid item key={qna.id} xs={12} sm={6} md={4} lg={3}>
              <Card variant="outlined" style={{width: '250px', height: '200px' ,border : '2px solid', borderColor: '#898989', borderRadius: '10px'}}>
              <Box display="flex" justifyContent="center" alignItems="center" style={{ height: '100%' }}>
              <QA qna={qna} />

              </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default HomeScreen;