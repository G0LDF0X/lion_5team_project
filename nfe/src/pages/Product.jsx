import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../store/actions/reviewActions";
import { listProductDetails } from "../store/actions/productActions";
import {
  addToBookMark,
  listBookMark,
  removeFromBookMark,
} from "../store/actions/bookMarkActions";
import { addToCart, listCartItems } from "../store/actions/cartActions";
<<<<<<< HEAD
import { createQNA } from "../store/actions/qnaActions";
=======

>>>>>>> main
import {
  Snackbar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import Loading from "../components/Loading";
import Message from "../components/Message";
import Rating from "../components/Rating";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { mainAxiosInstance } from "../api/axiosInstances";

function ProductDetail() {
  const [qty, setQty] = useState(1);
  const [marked, setMarked] = useState(false);
  const [state, setState] = useState({ open: false });
  const [replyCreated, setReplyCreated] = useState(false);
  const [answer, setAnswer] = useState("");
  const [showTextField, setShowTextField] = useState(false);
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const { open } = state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const reviewCreate = useSelector((state) => state.reviewCreate);
  const { success: successProductReview, createdReview } = reviewCreate;
  const bookMarkList = useSelector((state) => state.bookMarkList);
  const { bookMarkItems } = bookMarkList;
  const reviewDelete = useSelector((state) => state.reviewDelete);
  const { success: successReviewDelete } = reviewDelete;
<<<<<<< HEAD

=======
  const cart = useSelector((state) => state.cart);
  const { successAdd } = cart;
>>>>>>> main
  useEffect(() => {
    dispatch(listCartItems());
    dispatch(listProductDetails(id));
    dispatch(listBookMark());
  }, [navigate, dispatch]);

  useEffect(() => {
    if (successProductReview) {
      navigate(`/items/review/${createdReview.id}`);
    }
  }, [successProductReview, successReviewDelete, dispatch]);
  useEffect(() => {
    if (bookMarkList && bookMarkItems.find((x) => x.item_id === product.id)) {
      setMarked(true);
    }
  }, [bookMarkItems, product.id]);

  const BookmarkHandler = () => {
    if (marked) {
      dispatch(removeFromBookMark(id));
      setMarked(false);
    } else {
      dispatch(addToBookMark(id));
      setMarked(true);
    }
  };
  const addToCartHandler = () => {
    dispatch(addToCart({ id, qty }));
    if (successAdd) {
    setState({ open: true });
    }
  };

  const editReviewHandler = (review) => {
    if (userInfo && userInfo.id === review.user_id) {
      navigate(`/items/review/${review.id}`);
    } else {
      alert("You can only edit your own reviews.");
    }
  };

  const deleteReviewHandler = (review) => {
    if (userInfo && userInfo.id === review.user_id) {
      if (window.confirm("Are you sure you want to delete this review?")) {
        dispatch(deleteReview(review.id));
      }
    } else {
      alert("You can only delete your own reviews.");
    }
  };

  const createQnAHandler = () => {
    navigate(`/items/qna/create/${id}`);
    // dispatch(createQNA(id));
  };

  const handleButtonClick = () => {
    setShowTextField(true);
  };

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleAnswerSubmit = async () => {
    const formData = new FormData();
    formData.append("answer", answer);

    try {
      mainAxiosInstance.post("/items/qna/", formData, {
        headers: {
          Authorization: `Bearer ${userInfo.access}`,
        },
      });
      if (userInfo && userInfo.is_seller) {
        setAnswer(answer);
        setShowTextField(false);
        navigate(`/items/detail/${id}`);
      } else {
        alert("판매자만 답변을 작성할 수 있습니다.");
      }
    } catch (error) {
      console.error("답변 등록 중 오류가 발생하였습니다:", error);
    }
  };
  const createReviewHandler = () => {
    if (userInfo) {
      navigate(`/items/review/create/${id}`);
    } else {
      window.alert("로그인 후 이용해주세요.");
    }
  };

  const handleClose = () => {
    setState({ open: false });
  };
  const avgRate =
    product.reviews &&
    (product.reviews.reduce((acc, item) => item.rate + acc, 0) /
      product.reviews.length).toFixed(2);

  return (
    <div className="container mx-auto py-8">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        className="mb-4"
        open={open}
        onClose={handleClose}
        message="장바구니에 추가되었습니다."
        key={"top-center"}
      />
      <Link to="/" className="btn btn-light my-2">
        Go Back
      </Link>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1">
              <img
                src={`${VITE_API_BASE_URL}${product.image_url}`}
                alt={product.name}
                className="w-full rounded-lg"
              />
            </div>
            <div className="col-span-1">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-4">{product.name}</h3>
                <Rating value={avgRate} text={avgRate} color={"#f8e825"} />
                <p className="text-xl font-semibold my-4">{product.price}₩</p>
                <p>{product.description}</p>
              </div>
            </div>
            <div className="col-span-1">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">가격:</span>
                  <span className="text-lg font-bold">{product.price}₩</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">재고:</span>
                  <span className="text-lg font-bold">
                    {product.countInStock > 0 ? "In Stock" : "매진"}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">수량</span>
                  <select
                    className="border rounded-lg p-2"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  >
                    {[...Array(30).keys()].map((x) => (
                      <option value={x + 1} key={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                {!userInfo ? (
                  <Link to="/login">
                    <button className="w-full bg-gradient-to-r from-pink-300 to-pink-500 text-white py-2 rounded-lg shadow-md hover:from-pink-400 hover:to-pink-600 transition duration-300">
                      Login to Add to Cart
                    </button>
                  </Link>
                ) : (
                  <div className="flex space-x-4">
                    <button
                      onClick={addToCartHandler}
                      className="flex-1 bg-gradient-to-r from-yellow-300 to-yellow-500 text-white py-2 rounded-lg shadow-md hover:from-yellow-400 hover:to-yellow-600 transition duration-300 flex items-center justify-center"
                      disabled={product.countInStock === 0}
                    >
                      <ShoppingCartIcon className="mr-2" /> 장바구니에 담기
                    </button>
                    <button
                      className={`w-16 h-16 bg-gradient-to-r from-purple-300 to-purple-500 text-white py-2 rounded-full shadow-md hover:from-purple-400 hover:to-purple-600 transition duration-300 flex items-center justify-center ${
                        marked ? "bg-purple-400" : ""
                      }`}
                      onClick={BookmarkHandler}
                    >
                      {marked ? (
                        <BookmarkIcon className="w-6 h-6" />
                      ) : (
                        <BookmarkBorderIcon className="w-6 h-6" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-3xl font-bold mb-4">Reviews</h2>
            <div className="flex justify-end mb-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={createReviewHandler}
              >
                Create a Review
              </button>
            </div>
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white shadow-lg rounded-lg p-6 mb-4"
                >
                  <h3 className="text-2xl font-bold">{review.title}</h3>
                  <p className="text-lg font-semibold">
                    Written by: {review.writer}
                  </p>
                  <Rating
                    value={review.rate}
                    text={review.rate}
                    color={"#f8e825"}
                  />
                  <p className="my-4">{review.comment}</p>
                  {review.image && (
                    <img
                      src={review.image}
                      alt={review.title}
                      className="w-full rounded-lg mb-4"
                    />
                  )}
                  <div className="flex justify-end space-x-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                      onClick={() => editReviewHandler(review)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                      onClick={() => deleteReviewHandler(review)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No Reviews</p>
            )}
          </div>
          <div className="mt-8">
            <h2 className="text-3xl font-bold mb-4">Q&A</h2>
            <div className="flex justify-end mb-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={createQnAHandler}
              >
                Create a Q&A
              </button>
            </div>
            <Accordion>
              {product.item_qna_set && product.item_qna_set.length > 0 ? (
                product.item_qna_set.map((item_qna, index) => (
                  <Accordion key={index}>
                    <AccordionSummary
                      expandIcon={<i className="fa-solid fa-chevron-down"></i>}
                    >
                      <div>
                        <h5 className="text-lg font-bold">
                          Q. {item_qna.title}
                        </h5>
                        <p className="text-sm text-gray-500">
                          ID: {item_qna.username}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item_qna.created_at.split("T")[0]}
                        </p>
                        <div
                          dangerouslySetInnerHTML={{ __html: item_qna.content }}
                          className="mt-2"
                        ></div>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      {item_qna.item_answer_set &&
                      item_qna.item_answer_set.length > 0 ? (
                        item_qna.item_answer_set.map((answer, index) => (
                          <div key={index} className="my-2">
                            <h5 className="text-lg font-bold">
                              A. {answer.title}
                            </h5>
                            <p className="text-sm text-gray-500">
                              {answer.created_at.split("T")[0]}
                            </p>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: answer.content,
                              }}
                              className="mt-2"
                            ></div>
                          </div>
                        ))
                      ) : (
                        <>
                          {!showTextField && (
                            <button
                              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                              onClick={handleButtonClick}
                            >
                              답변 작성하기
                            </button>
                          )}
                          <br />
                          {showTextField && (
                            <>
                              <textarea
                                className="w-full p-2 border rounded-lg mb-2"
                                rows="3"
                                value={answer}
                                onChange={handleAnswerChange}
                                placeholder="답변을 작성해주세요."
                              ></textarea>
                              <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                onClick={() => handleAnswerSubmit(answer)}
                              >
                                제출하기
                              </button>
                            </>
                          )}
                        </>
                      )}
                    </AccordionDetails>
                  </Accordion>
                ))
              ) : (
                <p>No Q&A</p>
              )}
            </Accordion>
          </div>
        </div>
      )}
    </div>
  );
}
export default ProductDetail;
