import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import {Col, Row, ListGroup, Image, Card} from "react-bootstrap";
import { listProducts } from "../actions/productActions";
import { listCartItems } from "../actions/cartActions";
import Message from "../components/Message";

// import { saveuserInfo } from "../actions/cartActions";
// import CheckoutSteps from "../components/CheckoutSteps";


function ShippingScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
const userLogin = useSelector((state) => state.userLogin);
const { userInfo } = userLogin;
const [address, setAddress] = useState(userInfo.address);
const [city, setCity] = useState(userInfo.city);
const [postalCode, setPostalCode] = useState(userInfo.postalCode);
const [country, setCountry] = useState(userInfo.country);
const cartItems = useSelector((state) => state.cartList.cartItems);
  
const products = useSelector((state) => state.productList.products);

useEffect(() => {
  if (!products.length) {
    dispatch(listProducts());
  }
  if (!cartItems.length) {
    dispatch(listCartItems());
  }
}, [dispatch, products.length, cartItems.length]);

// Calculate cart products with prices and quantities
const cartProducts = cartItems.map(item => {
  const product = products.find(p => p.id === item.item_id);
  return product ? { ...product, qty: item.qty } : null;
}).filter(item => item !== null); // Filter out any null values (missing products)
const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(saveuserInfo({ address, city, postalCode, country }));
    // dispatch({ type: "SAVE_SHIPPING_ADDRESS", payload: { address, city, postalCode, country } });
    navigate("/payment");
    console.log("submit");
}

  return (
     <div>
     <Row>
       <Col md={8}>
         <ListGroup variant="flush">
    <FormContainer>
        {/* <CheckoutSteps step1 step2/> */}
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
            </Form.Group>
            <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
            </Form.Group>
            <Form.Group controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter postal code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
            </Form.Group>
            <Form.Group controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
            </Form.Group>
            <Button  variant="primary">
            Continue
            </Button>
        </Form>
    </FormContainer>
           <ListGroup.Item>
             <h2>Shipping</h2>
            <Row>
                <Col>Address:</Col>
                <Col>{userInfo.address}</Col>
            </Row>

           </ListGroup.Item>
           <ListGroup.Item>
             <h2>Payment Method</h2>
             <strong>Method:</strong>
             {/* {cart.paymentMethod} */}
           </ListGroup.Item>
           <ListGroup.Item>
             <h2>Order Items</h2>
             {cartProducts.length === 0 ? (
                <Message>Your cart is empty</Message> 
              ) : ( 
               <ListGroup variant="flush">
                  {cartProducts.map((item, index) => (
                   <ListGroup.Item key={index}>
                     <Row>
                       <Col md={1}>
                         <Image
                           src={item.image_url}
                        //    alt={item.name}
                           fluid
                           rounded
                         />
                       </Col>
                       <Col>
                         <Link to={`/product/${item.product}`}>
                           {item.name}
                         </Link>
                       </Col>
                       <Col md={4}>
                         {item.qty} x ${item.price} = ${item.qty * item.price}
                       </Col>
                     </Row>
                   </ListGroup.Item>
                 ))} 
               </ListGroup>
              )} 
           </ListGroup.Item>
         </ListGroup>
       </Col>
       <Col md={4}>
         <Card>
           <ListGroup variant="flush">
             <ListGroup.Item>
               <h2>Order Summary</h2>
             </ListGroup.Item>
             <ListGroup.Item>
               <Row>
                 <Col>Items</Col>
                 {/* <Col>${cart.itemsPrice}</Col> */}
               </Row>
             </ListGroup.Item>
             <ListGroup.Item>
               <Row>
                 <Col>Shipping</Col>
                 {/* <Col>${cart.shippingPrice}</Col> */}
               </Row>
             </ListGroup.Item>
             <ListGroup.Item>
               <Row>
                 <Col>Tax</Col>
                 {/* <Col>${cart.taxPrice}</Col> */}
               </Row>
             </ListGroup.Item>
             <ListGroup.Item>
               <Row>
                 <Col>Total</Col>
                 {/* <Col>${cart.totalPrice}</Col> */}
               </Row>
             </ListGroup.Item>
             {/* {error && <Message variant="danger">{error}</Message>} */}

              <ListGroup.Item>
              {/* <div id="paypal-container-G79NBA9VRJHP4"
             disabled={cart.cartItems === 0}
             onclick={placeOrderHandler}></div> */} <Button
                 type="button"
                 className="btn-block"
                //  disabled={cart.cartItems === 0}
                //  onClick={placeOrderHandler}
               >
                 Place Order
               </Button>
             </ListGroup.Item>
           </ListGroup>
         </Card>
       </Col>
     </Row>
   </div>
  )
}

export default ShippingScreen
