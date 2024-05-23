import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography, Box } from "@mui/material";
import { listProducts } from "../store/actions/productActions";
import { listBoards } from "../store/actions/boardActions";
import { listQNA } from "../store/actions/qnaActions";
import ProductCarousel from "../components/homescreen/ProductCarousel";
import BoardCarousel from "../components/homescreen/BoardCarousel";
import QnASection from "../components/homescreen/QnASection";
import PostModal from "../modals/PostModal";

function HomeScreen() {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading: productLoading, error: productError, products } = productList;

  const boardList = useSelector((state) => state.boardList);
  const { loading: boardLoading, error: boardError, boards } = boardList;

  const qnaList = useSelector((state) => state.qnaList);
  const { loading: qnaLoading, error: qnaError, qnas } = qnaList;

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  useEffect(() => {
    dispatch(listProducts({ query: "", page: 1, category: [] }));
    dispatch(listBoards());
    dispatch(listQNA());
  }, [dispatch]);

  return (
    <Container className="mx-auto p-4">
       <div>
      <button onClick={openModal} className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700">
        Create Post
      </button>
      <PostModal isOpen={modalIsOpen} onRequestClose={closeModal} />
    </div>  
      <Typography variant="h4" className="text-center my-4 font-bold text-pink-500">
        Welcome to our Pet Shop
      </Typography>

      <ProductCarousel loading={productLoading} error={productError} products={products} />
      <BoardCarousel loading={boardLoading} error={boardError} boards={boards} />
      <QnASection loading={qnaLoading} error={qnaError} qnas={qnas} />
    </Container>
  );
}

export default HomeScreen;