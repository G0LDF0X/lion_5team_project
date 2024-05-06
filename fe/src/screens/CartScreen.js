import React, { useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart, listCartItems, updateQty } from "../actions/cartActions";

function CartScreen() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cartList.cartItems);
  const cartRemove = useSelector((state) => state.cartRemove);
  const { success: successCartRemove } = cartRemove;
  // const removeFromCart

  useEffect(() => {
   if(!cartItems || cartItems.length === 0){
   dispatch(listCartItems());}
   if (successCartRemove) {
    dispatch(listCartItems());    
  }

  }, [dispatch, successCartRemove, navigate]);

  // Calculate cart products with prices and quantities
 
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    
  };

  const checkOutHandler = () => {
    navigate("/shipping");
  };

    const subtotalQuantity = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const subtotalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image || '/placeholder.jpg'}  fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/items/detail/${item.id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>{item.price}₩</Col>
                  <Col md={3}>
                  <Form.Control
  as="select"
  value={item.qty}
  onChange={(e) =>
    dispatch(updateQty(item.item_id, Number(e.target.value) )

    )
  }
>
  {[...Array(40).keys()].map(x => (
    <option key={x + 1} value={x + 1}>
      {x + 1}
    </option>
  ))}
</Form.Control>
                  </Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.item_id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
                    {cartItems? (<ListGroup.Item>
      <h2>Subtotal ({subtotalQuantity}) items</h2>
             <h6> shipping: 5000 ₩</h6>
              <h4>{subtotalPrice} ₩</h4>
            </ListGroup.Item>) :null}
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkOutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
          </Card>
        </Col>
      </Row>
    );
}

export default CartScreen;
