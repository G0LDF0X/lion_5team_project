import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography, Box } from "@mui/material";
import { listProducts } from "../store/actions/productActions";
import { listBoards } from "../store/actions/boardActions";
import { listQNA } from "../store/actions/qnaActions";
import ProductCarousel from "../components/homescreen/ProductCarousel";
import BoardCarousel from "../components/homescreen/BoardCarousel";
import QnASection from "../components/homescreen/QnASection";
import { motion } from 'framer-motion';

function HomeScreen() {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading: productLoading, error: productError, products } = productList;

  const board = useSelector((state) => state.board);
  const { loading: boardLoading, error: boardError, boards } = board;

  const qnaList = useSelector((state) => state.qnaList);
  const { loading: qnaLoading, error: qnaError, qnas } = qnaList;

  useEffect(() => {
    dispatch(listProducts({ query: "", page: 1, category: [] }));
    dispatch(listBoards());
    dispatch(listQNA());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" className="mx-auto py-8">
      
      {/* <section className="my-16">
       */}
       <motion.section 
        className="my-16" 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <ProductCarousel loading={productLoading} error={productError} products={products} />
      {/* </section> */}
      </motion.section>

      {/* <section className="my-16"> */}
      <motion.section 
        className="my-16" 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <BoardCarousel loading={boardLoading} error={boardError} boards={boards} />
      {/* </section> */}
      </motion.section>

      {/* <section className="my-16"> */}
      <motion.section 
        className="my-16" 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <QnASection loading={qnaLoading} error={qnaError} qnas={qnas} />
      {/* </section> */}
      </motion.section>
    </Container>
  );
}

export default HomeScreen;