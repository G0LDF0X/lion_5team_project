import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography, Box, Button } from "@mui/material";
import { listProducts } from "../store/actions/productActions";
import { listBoards } from "../store/actions/boardActions";
import { listQNA } from "../store/actions/qnaActions";
import ProductCarousel from "../components/homescreen/ProductCarousel";
import BoardCarousel from "../components/homescreen/BoardCarousel";
import QnASection from "../components/homescreen/QnASection";
import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import "../animations.css";

function HomeScreen() {
  const dispatch = useDispatch();
  const { openModal } = useOutletContext();
  const productList = useSelector((state) => state.productList);
  const { loading: productLoading, error: productError, products } = productList;
  const board = useSelector((state) => state.board);
  const { loading: boardLoading, error: boardError, boards } = board;
  const qnaList = useSelector((state) => state.qnaList);
  const { loading: qnaLoading, error: qnaError, qnas } = qnaList;
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    dispatch(listProducts({ query: "", page: 1, category: [] }));
    dispatch(listBoards());
    dispatch(listQNA());
  }, [dispatch]);
  return (
    <Container maxWidth="lg" className="mx-auto py-8">
      <section
        className="relative bg-cover bg-center py-20"
        style={{
          backgroundImage:
            `url(${VITE_API_BASE_URL}/images/puppies2.png)`,
          height: '400px',
        }}
      >
        {userInfo? null : (
        <div className="container mx-auto px-4 flex flex-col items-end text-right">
          
          <Button
            variant="contained"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            onClick={openModal}
          >
            Sign In
          </Button>
          <Button class="bg-purple-700 text-white py-2 px-4 rounded">SIGN IN</Button>
          <Button class="bg-white text-black py-2 px-4 rounded">SIGN IN</Button>
          <Button class="bg-gray-100 text-black py-2 px-4 rounded">SIGN IN</Button>
          <Button class="bg-pink-700 text-white py-2 px-4 rounded">SIGN IN</Button>
          <Button class="bg-blue-200 text-black py-2 px-4 rounded">SIGN IN</Button>
          <Button class="bg-teal-500 text-white py-2 px-4 rounded">SIGN IN</Button>
          <Button class="bg-orange-500 text-white py-2 px-4 rounded">SIGN IN</Button>
          <Button class="bg-green-500 text-white py-2 px-4 rounded">SIGN IN</Button>



        </div>
        )}
      </section>
      <motion.section
        className="my-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ProductCarousel
          loading={productLoading}
          error={productError}
          products={products}
        />
      </motion.section>
      <motion.section
        className="my-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <BoardCarousel
          loading={boardLoading}
          error={boardError}
          boards={boards}
        />
      </motion.section>
      <motion.section
        className="my-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <QnASection loading={qnaLoading} error={qnaError} qnas={qnas} />
      </motion.section>
      <motion.section
        className="my-16 fade-in"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Typography
          variant="h4"
          className="mb-8 text-left font-semibold text-gray-800"
        >
          Join Our Newsletter
        </Typography>
        <Box display="flex" justifyContent="center">
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 rounded-l-lg py-2 px-4 w-64 focus:outline-none focus:border-pink-500"
          />
          <Button
            variant="contained"
            color="primary"
            className="rounded-r-lg bg-pink-500 hover:bg-pink-700"
          >
            Subscribe
          </Button>
        </Box>
      </motion.section>
    </Container>
  );
}

export default HomeScreen;