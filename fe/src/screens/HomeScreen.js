import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Card,
  Box,
  CardHeader,
  CardContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { listProducts } from "../actions/productActions";
import { listBoards } from "../actions/boardActions";
import { listQNA } from "../actions/qnaActions";
import { Carousel } from "react-bootstrap";
import Product from "../components/Product";
import BoardForm from "../components/BoardForm";
import Loading from "../components/Loading";
import Message from "../components/Message";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2, 0),
  },
}));

function HomeScreen() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const {
    loading: productLoading,
    error: productError,
    products,
  } = productList;

  const boardList = useSelector((state) => state.boardList);
  const { loading: boardLoading, error: boardError, boards } = boardList;

  const qnaList = useSelector((state) => state.qnaList);
  const { loading: qnaLoading, error: qnaError, qnas } = qnaList;
  function createCarouselItemsForBoards(boards) {
    const itemsPerSlide = 4;
    let carouselItems = [];

    for (let i = 0; i < boards.length; i += itemsPerSlide) {
      let boardsInThisItem = boards.slice(i, i + itemsPerSlide);
      carouselItems.push(
        <Carousel.Item key={i}>
          <Grid
            container
            spacing={3}
            style={{ margin: "0 auto", maxWidth: "100%" }}
          >
            {boardsInThisItem.map((board) => (
              <Grid item key={board.id} xs={12} sm={6} md={4} lg={3}>
                <Box display="flex" justifyContent="center">
                  <Card variant="outlined">
                    <Box height={500} width={300}>
                      <BoardForm board={board} />
                    </Box>
                  </Card>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Carousel.Item>
      );
    }

    return carouselItems;
  }
  useEffect(() => {
    dispatch(listProducts());
    // dispatch(listReviews());
    dispatch(listBoards());
    dispatch(listQNA());
  }, [navigate]);

  function createProductCarouselItems(products) {
    const itemsPerSlide = 4;
    let productCarouselItems = [];

    for (let i = 0; i < products.length; i += itemsPerSlide) {
      let productsInThisItem = products.slice(i, i + itemsPerSlide);
      productCarouselItems.push(
        <Carousel.Item key={i}>
          <Grid
            container
            spacing={3}
            style={{ margin: "0 auto", maxWidth: "90%" }}
          >
            {productsInThisItem.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <Card variant="outlined" style={{ width: "250px" }}>
                  <Box height={400} style={{ width: "250px" }}>
                    <Product product={product} id={product.id} />
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Carousel.Item>
      );
    }

    return productCarouselItems;
  }

  return (
    <Container className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Welcome to our Shop
      </Typography>
      <Typography variant="h5" className={classes.title}>
        Products
      </Typography>
      {productLoading ? (
        <Loading />
      ) : productError ? (
        <Message variant={"danger"}>{productError}</Message>
      ) : (
        <Carousel>{createProductCarouselItems(products)}</Carousel>
      )}
      <Typography variant="h5" className={classes.title}>
        Boards
      </Typography>
      {boardLoading ? (
        <Loading />
      ) : boardError ? (
        <Message variant={"danger"}>{boardError}</Message>
      ) : (
        <Carousel>
          <Carousel>{createCarouselItemsForBoards(boards)}</Carousel>
        </Carousel>
      )}
      {/* <Typography variant="h5" className={classes.title} style={{ color: '#3f51b5'}}>Q&A</Typography> */}
      <Box display="flex" alignItems="center">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-2h-2v2zm2-4h-2V7h2v6z"
          />
        </svg>
        <Typography
          variant="h5"
          className={classes.title}
          style={{ color: "#000000", marginLeft: "10px" }}
        >
          {" "}
          Q&A
        </Typography>
      </Box>
      {qnaLoading ? (
        <Loading />
      ) : qnaError ? (
        <Message variant={"danger"}>{qnaError}</Message>
      ) : (
        <Grid container spacing={3}>
          {qnas.slice(0, 4).map((qna) => (
            <Grid item key={qna.id} xs={12} sm={6} md={4} lg={3}>
            <Card variant="outlined" style={{width: '250px', height: '200px' ,border : '2px solid', borderColor: '#898989', borderRadius: '10px'}}>
              <Box display="flex" justifyContent="center" alignItems="center" style={{ height: '100%' }}>
                <CardContent>
                  <Link to={`/qna/detail/${qna.id}`}> 
                    <CardHeader title={<strong>{qna.title}</strong>} />
                    <Typography>
                      <div className="my-3">
                        <p dangerouslySetInnerHTML={{ __html: qna.content }} style={{ color: 'black', backgroundColor: 'white' }} />
                      </div>
                    </Typography>
                  </Link>
                </CardContent>
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
