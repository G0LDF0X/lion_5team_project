import React, { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Button } from "@mui/material";
import { listProducts } from "../store/actions/productActions";
import { getBoardRecommendations, getTopBoards, listBoards } from "../store/actions/boardActions";
import { listQNA } from "../store/actions/qnaActions";
import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import "../animations.css";
import { getRecommendations, getTopProducts } from "../store/actions/productActions";

const ProductCarousel = lazy(() => import("../components/homescreen/ProductCarousel"));
const BoardCarousel = lazy(() => import("../components/homescreen/BoardCarousel"));
const QnASection = lazy(() => import("../components/homescreen/QnASection"));

function HomeScreen() {
  const dispatch = useDispatch();
  const { openModal } = useOutletContext();
  const topBoad = useSelector((state) => state.topBoard);
  const { loading: topBoardLoading, error: topBoardError, topBoards } = topBoad;
  const qnaList = useSelector((state) => state.qnaList);
  const { loading: qnaLoading, error: qnaError, qnas } = qnaList;
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const topProducts = useSelector((state) => state.topProducts);
  const { loading: topProductsLoading, error: topProductsError, products: topProductsList } = topProducts;
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    dispatch(listProducts({ query: "", page: 1, category: [] }));
    dispatch(listBoards({page:1}));
    dispatch(listQNA());
    if (userInfo) {
      dispatch(getBoardRecommendations());
      dispatch(getRecommendations());
    }
    else {
      dispatch(getTopProducts());
      dispatch(getTopBoards());
    }

  }, [dispatch]);


  return (
    <Container maxWidth="lg" className="mx-auto py-8">
     <section
        className="relative bg-cover bg-center py-20"
        style={{
          backgroundImage: 
             `url(${VITE_API_BASE_URL}/images/puppies2.webp)`
           ,
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
            loading={topProductsLoading}
            error={topProductsError}
            products={topProductsList}
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
            loading={topBoardLoading}
            error={topBoardError}
            boards={topBoards}
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
      
    </Container>
  );
}

export default HomeScreen;
