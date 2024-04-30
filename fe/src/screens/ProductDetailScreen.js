import React, {  useState, useEffect } from "react";
import { Row, Col, Image, ListGroup, Button, Card, Form} from "react-bootstrap";
import { Link, useParams, useNavigate} from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails} from "../actions/productActions";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { createReview } from "../actions/reviewActions";
// import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

function Productcreen() {
  const [qty, setQty] = useState(1);  
  const [isClicked, setIsClicked] = useState(false);
  // const [rate, setRate] = useState(0) 
  
  // const [rating, setRating] = useState(0)
  // const [comment, setComment] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const reviewCreate = useSelector((state) => state.reviewCreate);
  const { success: successProductReview } = reviewCreate;  
  // let totalRate = product.reviews.reduce((acc, review) => acc + review.rate, 0);
  // let avgRate = totalRate / product.reviews.length;
  let totalRate = product && product.reviews ? product.reviews.reduce((acc, review) => acc + review.rate, 0) : 0;
let avgRate = product && product.reviews ? totalRate / product.reviews.length : 0;



  useEffect(() => {
    
    if (successProductReview) {
      navigate(`/item/review/${id}`); 
    //   dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
    //   setRating(0);
    //   setComment('');
      
    }
    dispatch(listProductDetails(id));
    console.log(product)
    // console.log(product.reviews)

  }, [dispatch, id, successProductReview]);
  const addToCartHandler = () => {
    navigate(`/cart/${id}`, {state: {qty}});
  }
  const createReviewHandler = () => {
    dispatch (createReview(id));
  }

  
  return (
    <div>
      <Link to="/" className="btn btn-light my-2">Go Back
      </Link>
        {loading ? 
          <Loading />
         : error ? 
          <Message variant={"danger"}>{error}</Message>
         : (
         <div><Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={avgRate}
                  text={`${avgRate}`}
                  color={"#f8e825"}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: {product.price}₩</ListGroup.Item>
              <ListGroup.Item>Description: {product.description}</ListGroup.Item>
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
                      <Col xs='auto' className="my-1">
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
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
                      <Button className= " ms-auto me-5 bg-info">Login to Add to Cart</Button>
                    </Link>
                  ) :
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
                <Button className="btn-block justify-content-end" onClick={() => setIsClicked(!isClicked)}>               
                <i className={isClicked ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"}></i>
                                  </Button>
                {/* </Col> */}
                      </div>
                      }
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        
        <Row className="d-flex justify-content-between align-items-center"> 
          <Col md={9}>
            <h2>Reviews</h2>
            <Col className="text-end">
            <Button className="btn-block" onClick={createReviewHandler} key="1">Create a Review</Button>
            </Col>
             {/* {product.reviews.length === 0 && <Message>No Reviews</Message>} */}
             {product.reviews?  (
            <ListGroup variant="flush">
            
              {product.reviews.map((review) => (
                <div>
                <ListGroup.Item key={review.id}>
                  <strong>{review.title}</strong>
                  <div className="my-3">
                  <Rating value={review.rate} text={review.rate} color={"#f8e825"} />
                  </div>
                  <p>{review.comment}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                <h6>  {review.content}</h6>
                </ListGroup.Item>
                </div>
              ))}
              
              </ListGroup>

             ) : <Message>No Reviews</Message>
             }
          </Col>
        </Row>
        </div>
  )}
        
          </div>
  );
}

export default Productcreen;