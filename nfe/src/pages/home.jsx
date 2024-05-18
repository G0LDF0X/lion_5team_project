import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  Box,
  CircularProgress,
} from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { listProducts } from "../store/actions/productActions";
import { listBoards } from "../store/actions/boardActions";
import { listQNA } from "../store/actions/qnaActions";
import Product from "../components/Product";
import BoardForm from "../components/BoardForm";
import Message from "../components/Message";

function HomeScreen() {
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(listProducts({ query: "", page: 1, category: [] }));
    dispatch(listBoards());
    dispatch(listQNA());
  }, [dispatch]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Container className="mx-auto p-4">
      <Typography
        variant="h4"
        className="text-center my-4 font-bold text-pink-500"
      >
        Welcome to our Pet Shop
      </Typography>

      <Typography variant="h5" className="my-4 font-semibold text-gray-700">
        Products
      </Typography>
      {productLoading ? (
        <Box className="flex justify-center">
          <CircularProgress />
        </Box>
      ) : productError ? (
        <Message variant="error">{productError}</Message>
      ) : (
        <Carousel responsive={responsive} infinite>
          {products.map((product) => (
            <Box key={product.id} className="p-2">
              {/* <Card className="p-4 rounded-lg shadow-lg"> */}
              <Product product={product} id={product.id} />
              {/* </Card> */}
            </Box>
          ))}
        </Carousel>
      )}

      <Typography variant="h5" className="my-4 font-semibold text-gray-700">
        Boards
      </Typography>
      {boardLoading ? (
        <Box className="flex justify-center">
          <CircularProgress />
        </Box>
      ) : boardError ? (
        <Message variant="error">{boardError}</Message>
      ) : (
        <Carousel responsive={responsive} infinite>
          {boards.map((board) => (
            <Box key={board.id} className="p-2">
              {/* <Card className="p-4 rounded-lg shadow-lg"> */}
              <BoardForm board={board} />
              {/* </Card> */}
            </Box>
          ))}
        </Carousel>
      )}

      <Box className="flex items-center mt-8">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="text-pink-500"
        >
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-2h-2v2zm2-4h-2V7h2v6z"
          />
        </svg>
        <Typography variant="h5" className="ml-2 font-semibold text-gray-700">
          Q&A
        </Typography>
      </Box>
      {qnaLoading ? (
        <Box className="flex justify-center mt-4">
          <CircularProgress />
        </Box>
      ) : qnaError ? (
        <Message variant="error">{qnaError}</Message>
      ) : (
        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {qnas.slice(0, 4).map((qna) => (
            <Card
              key={qna.id}
              className="p-4 rounded-lg shadow-lg border border-gray-200"
            >
              <Link to={`/qna/detail/${qna.id}`} className="no-underline">
                <Typography variant="h6" className="font-bold text-gray-800">
                  {qna.title}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  <span
                    className="my-3"
                    dangerouslySetInnerHTML={{ __html: qna.content }}
                  />
                </Typography>
              </Link>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
}

export default HomeScreen;
