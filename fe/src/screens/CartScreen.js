import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";
// import { removeFromCart } from '../actions/cartActions'
// import { cartConstants } from '../constants/cartConstants'
// import { cartReducer } from '../reducers/cartReducers'
// import { cartActions } from '../actions/cartActions'
// import Loading from '../components/Loading'

function CartScreen() {
  const { id } = useParams();
  const productId = id;
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const qty = location.state.qty ? Number(location.state.qty) : 1
  const qty =
    location.state && location.state.qty ? Number(location.state.qty) : 1;
  // console.log(qty)
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  // console.log('cartItem',cartItems)
  // const cart = useSelector(state => state.cart)
  // const { cartItems } = cart
  useEffect(() => {
    if (productId && qty) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOutHandler = () => {
    navigate("/shipping");
  };
  return (
    <Row>
      <Form.Check // prettier-ignore
        type={"checkbox"}
        id={"default-checkbox"}
        label={"모두선택"}
      />
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Form.Check // prettier-ignore
                  type={"checkbox"}
                  id={item.id}
                  label={""}
                />
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>

                  <Col md={2}>${item.price}</Col>

                  <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
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
                      onClick={() => removeFromCartHandler(item.product)}
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
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
          </ListGroup>

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
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreen;
