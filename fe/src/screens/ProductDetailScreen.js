import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  // Card,
  Form,
} from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { createReview } from "../actions/reviewActions";
import { addToBookMark, listBookMark, removeFromBookMark } from "../actions/bookmarkActions";
import { addToCart, listCartItems } from "../actions/cartActions";
import { Snackbar } from "@mui/material";
import { Card, CardContent, Typography,  Box, Grid } from '@material-ui/core';
import { deleteReview } from "../actions/reviewActions";
import { REVIEW_CREATE_RESET } from "../constants/reviewConstants";
import QA from "../components/QA";
import { makeStyles } from '@material-ui/core/styles';
import { createQNA } from "../actions/qnaActions";
import Accordion from 'react-bootstrap/Accordion';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


function Productcreen() {
  const [qty, setQty] = useState(1);
  const [marked, setMarked] = useState(false);
  const [state, setState] = useState({open: false});
  const handleClose = () => {
    setState({  open: false });
  };

  const { open } = state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const reviewCreate = useSelector((state) => state.reviewCreate);
  const { success: successProductReview, createdReview } = reviewCreate;;
  const bookMarkList = useSelector((state) => state.bookMarkList);
  const { bookMarkItems, success } = bookMarkList;
  const cartAdd = useSelector((state) => state.cartAdd);
  const { success: successCartAdd , fail : failCartAdd} = cartAdd;
  const bookMarkAdd = useSelector((state) => state.bookMarkAdd);
  const { success: successBookmarkAdd } = bookMarkAdd;
  const bookMarkRemove = useSelector((state) => state.bookMarkRemove);
  const { success: successBookmarkRemove } = bookMarkRemove;
  const reviewDelete = useSelector((state) => state.reviewDelete);
  const { success: successReviewDelete } = reviewDelete;
  const [showEditor, setShowEditor] = useState(false);
  const [editorData, setEditorData] = useState('');



  
  let totalRate =
    product && product.reviews
      ? product.reviews.reduce((acc, review) => acc + review.rate, 0)
      : 0;
  let avgRate =
    product && product.reviews ? totalRate / product.reviews.length : 0;


    useEffect(() => {

    
      if (successProductReview) {
        navigate(`/items/review/${createdReview.id}`);
        dispatch({type:REVIEW_CREATE_RESET});
    }
    if(successCartAdd){
      setState({open: true});
    }
    if(successBookmarkAdd){
      dispatch(listBookMark());
      setMarked(true);
    }
    if(successBookmarkRemove){
      dispatch(listBookMark());
      setMarked(false);
    }
    if( success  &&bookMarkItems.length !==0 && bookMarkItems.find((x) => x.item_id === product.id)){
      setMarked(true);
    }
    else{
      setMarked(false);
    }
  
    dispatch(listCartItems()); 
    dispatch(listProductDetails(id));
    if(!bookMarkItems){
    dispatch(listBookMark());}
  }, [dispatch, id, successProductReview, successCartAdd, navigate,successBookmarkAdd, successBookmarkRemove, successReviewDelete ]);
  
  const addToCartHandler = () => {
    dispatch(addToCart(id, qty));

  };
  const createReviewHandler = () => {
    dispatch(createReview(id));

  };
  const BookmarkHandler = () => {
    if (bookMarkList && bookMarkItems.find((x) => x.item_id === product.id)) {
      dispatch(removeFromBookMark(id));

    }
    else {
      dispatch(addToBookMark(id));
    }
  }
  const editReviewHandler = (review) => {
    if(userInfo&&userInfo.id===review.user_id){
      navigate(`/items/review/${review.id}`);
    } else {
      alert("You can only edit your own reviews.");
;  }
  }
  const deleteReviewHandler = (review) => {
    if(userInfo&&userInfo.id===review.user_id){
      window.confirm("Are you sure you want to delete this review?");
      if(window.confirm){
       dispatch(deleteReview(review.id));
      }
    } else {
      alert("You can only delete your own reviews.");
  }
  }
  const useStyles = makeStyles({
    root: {
      fontSize: '5rem',  // increase font size
    },
  });
  const createQnAHandler = () => {
    navigate(`/items/qna/create/${id}`);
    setShowEditor(true);
    dispatch(createQNA(id));
    console.log(`Q&A 생성 버튼이 클릭되었습니다: ${id}`);
  };


 
  return (
    <div>
      <Snackbar
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
  autoHideDuration={3000}
  className={useStyles.root}
  open={open}
  onClose={handleClose}
  message="장바구니에 추가되었습니다."
  key={'top-center'}
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
          <Row>
            <Col md={6}>
              <Image src={product.image_url} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={avgRate}
                    text={`${avgRate.toFixed(2)}`}
                    color={"#f8e825"}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: {product.price}₩</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>{product.price}₩</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col xs="auto" className="my-1">
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(30).keys()].map((x) => (
                            <option value={x + 1} key={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    {!userInfo ? (
                      <Link to="/login">
                        <Button className=" ms-auto me-5 bg-info">
                          Login to Add to Cart
                        </Button>
                      </Link>
                    ) : (
                      <div>
                        <Button
                          onClick={addToCartHandler}
                          className="btn-block"
                          type="button"
                          disabled={product.countInStock === 0}
                        >
                          <i class="fa-solid fa-cart-shopping"></i>
                          Add to Cart
                        </Button>
                        {/* <Col className="d-flex jstify-content-end"> */}
                        <Button
                          className="btn-block justify-content-between "
                          onClick={BookmarkHandler}
                            
                          
                        >
                          <i
                            className={
                              marked
                                ? "fa-regular fa-bookmark"
                                : "fa-solid fa-bookmark"
                            }
                          ></i>
                        </Button>
                        {/* </Col> */}
                      </div>
                    )}
                  </ListGroup.Item>
                </ListGroup>
  
              </Card>
            </Col>
          </Row>

          <Grid container spacing={3}>
  <Grid item xs={9}>
    <Typography variant="h4">Reviews</Typography>
    <Box display="flex" justifyContent="flex-end">
      <Button variant="contained" color="primary" onClick={createReviewHandler}>
        Create a Review
      </Button>
    </Box>
    {product.reviews ? (
      product.reviews.map((review) => (
        <Card key={review.id}>
          <CardContent>
            <Typography variant="h5">{review.title}</Typography>
            <Typography variant="subtitle1">Written by: {review.writer}</Typography>
            <Box my={2}>
              <Rating value={review.rate} text={review.rate} color={"#f8e825"} />
            </Box>
            <Typography variant="body1">{review.comment}</Typography>
            {review.image && <img src={review.image} alt={review.title} />}
            <div dangerouslySetInnerHTML={{ __html: review.content }} style={{ color: 'black', backgroundColor: 'white' }} />
            <Box mt={2}>
          <Button variant="contained" color="primary" onClick={() => editReviewHandler(review)}>
            Edit
          </Button>
          <Button variant="contained" color="secondary" onClick={() => deleteReviewHandler(review)}>
            Delete
          </Button>
        </Box>
          </CardContent>
        </Card>
      ))
    ) : (
      <Typography variant="body1">No Reviews</Typography>
    )}
  </Grid>
</Grid>
        </div>
      )}
<Box>
<Grid container spacing={3}>
    <Grid item xs={9}>
    <Typography variant="h4">Q&A</Typography>
    <Box display="flex" justifyContent="flex-end">
    <div>
      <Button variant="contained" color="primary" onClick={createQnAHandler}>
        Create a Q&A
      </Button>

        
    </div>
    </Box>
    <Accordion>
    {product.reviews ? product.item_qna_set.map((item_qna, index) => (
      <Accordion.Item eventKey={index.toString()}>
        <Accordion.Header>
          <Box><h5>Q. {item_qna.title}</h5>
          ID : {item_qna.username}<br/>
          <span style={{ color: 'gray', fontSize: 'small' }}>
          {item_qna.created_at.split('T')[0]}
        </span>
        <br/><br/>
        <div dangerouslySetInnerHTML={{ __html: item_qna.content }} style={{ color: 'black', backgroundColor: 'white' }} />
        </Box>
        </Accordion.Header>
        <Accordion.Body>

          {item_qna.item_answer_set ? item_qna.item_answer_set.map((answer, index) => (
            <Box>
            <h5>A. {answer.title}</h5> 
            <span style={{ color: 'gray', fontSize: 'small' }}>
          {answer.created_at.split('T')[0]}
        </span><br/><br/>
        <div dangerouslySetInnerHTML={{ __html: answer.content }} style={{ color: 'black', backgroundColor: 'white' }} />
            {/* <p>{answer.content}</p> */}
            </Box>
          )) : null}
        </Accordion.Body>
      </Accordion.Item>
    )) : null}
  </Accordion>

  </Grid>
  </Grid>
  </Box>
      </div>

  );
}

export default Productcreen;