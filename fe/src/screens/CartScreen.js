import React, { useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart, listCartItems } from "../actions/cartActions";
import { listProducts } from "../actions/productActions";

function CartScreen() {
  const { id: productId } = useParams();
  const location = useLocation();
  const qty = location.state?.qty ? Number(location.state.qty) : 1;
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOutHandler = () => {
    navigate("/shipping");
  };

  const subtotalQuantity = cartProducts.reduce((acc, item) => acc + item.qty, 0);
  const subtotalPrice = cartProducts.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

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
            {cartProducts.map((item) => (
              <ListGroup.Item key={item.id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image_url || '/placeholder.jpg'} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/items/detail/${item.id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.id, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(10).keys()].map(x => (
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
                      onClick={() => removeFromCartHandler(item.id)}
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
            <ListGroup.Item>
              <h2>Subtotal ({subtotalQuantity}) items</h2>
              shipping: 5000
              {subtotalPrice}
            </ListGroup.Item>
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
