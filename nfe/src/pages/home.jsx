import React, { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography, Box, Button } from "@mui/material";
import { listProducts } from "../store/actions/productActions";
import { listBoards } from "../store/actions/boardActions";
import { listQNA } from "../store/actions/qnaActions";
import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import "../animations.css";

// Lazy load components
const ProductCarousel = lazy(() => import("../components/homescreen/ProductCarousel"));
const BoardCarousel = lazy(() => import("../components/homescreen/BoardCarousel"));
const QnASection = lazy(() => import("../components/homescreen/QnASection"));

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
          backgroundImage: `url(${VITE_API_BASE_URL}/images/puppies2.png)`,
          height: '400px',
        }}
      >
        {userInfo ? null : (
          <div className="container mx-auto px-4 flex flex-col items-end text-right">
            <Button
              variant="contained"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
              onClick={openModal}
            >
              Sign In
            </Button>
            {/* Additional buttons can be removed for simplicity */}
          </div>
        )}
      </section>
      <motion.section
        className="my-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <ProductCarousel
            loading={productLoading}
            error={productError}
            products={products}
          />
        </Suspense>
      </motion.section>
      <motion.section
        className="my-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <BoardCarousel
            loading={boardLoading}
            error={boardError}
            boards={boards}
          />
        </Suspense>
      </motion.section>
      <motion.section
        className="my-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <QnASection
            loading={qnaLoading}
            error={qnaError}
            qnas={qnas}
          />
        </Suspense>
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
