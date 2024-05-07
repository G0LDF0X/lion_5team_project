import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Col, Row, ListGroup, Image, Card } from "react-bootstrap";
import { listProducts } from "../actions/productActions";
import { listCartItems } from "../actions/cartActions";
import Message from "../components/Message";
import { createOrder } from "../actions/orderActions";

// import { saveuserInfo } from "../actions/cartActions";
// import CheckoutSteps from "../components/CheckoutSteps";

function ShippingScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const shippingAdress = useSelector((state) => state.shippingAdress);

  const location = useLocation();
  const [payment, setPayment] = useState("paypal");
  const [isUserAddressSelected, setIsUserAddressSelected] = useState(true);

  // const [shippingAdresss, setShippingAdresss] = useState(userInfo.address);
  const [address, setAddress] = useState(userInfo.address);
  const [otherAddress, setOtherAddress] = useState(false);
  const [city, setCity] = useState(userInfo.city);
  const cartList = useSelector((state) => state.cartList);
  const { cartItems, shippingAdress } = cartList;

  const products = useSelector((state) => state.productList.products);

  useEffect(() => {
    // console.log(address);
    // if (shippingAdress && shippingAdress.length !== 0) {
      // setAddress(shippingAdress.address);
    // }
    if (!products.length) {
      dispatch(listProducts());
    }
    if (!cartItems.length) {
      dispatch(listCartItems());
    }
  }, [dispatch, products.length, cartItems.length, navigate, shippingAdress]);

  // Calculate cart products with prices and quantities
  const cartProducts = cartItems
    .map((item) => {
      const product = products.find((p) => p.id === item.item_id);
      return product ? { ...product, qty: item.qty } : null;
    })
    .filter((item) => item !== null); // Filter out any null values (missing products)
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createOrder({ payment_method: payment, address: address }));
    // dispatch(saveuserInfo({ address, city, postalCode, country }));
    // dispatch({ type: "SAVE_SHIPPING_ADDRESS", payload: { address, city, postalCode, country } });
    navigate("/payment");
    console.log("submit");
  };

  const subtotalQuantity = cartProducts.reduce(
    (acc, item) => acc + item.qty,
    0
  );
  const subtotalPrice = cartProducts
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);
  return (
    <div>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <Col md={6}>
              <h1>주문 /결제</h1>
            </Col>
            <ListGroup.Item>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>배송지</h2>
                {/* <Link to="/shippingAdress"><h6>변경</h6></Link> */}
              </div>
              <Row>
                <Col>Address:</Col>
                <Form onSubmit={submitHandler}>
                <Form.Group>
                  
                  <Col>
                    <Form.Check
                      type="radio"
                      label={userInfo.address}
                      id="User"
                      name="shipping adress"
                      value={userInfo.address}
                      checked={isUserAddressSelected}
                      onChange={(e) => {
                        setAddress(userInfo.address);
                        setOtherAddress(false);
                        setIsUserAddressSelected(true);

                        console.log(otherAddress)
                      }}
                    ></Form.Check>
                    <Form.Check
                      type="radio"
                      label="새로운 배송지"
                      id="other"
                      name="shipping adress"
                      // value="Toss"
                      onChange={(e) => {setOtherAddress(true);     setIsUserAddressSelected(false);
                      }}
                    ></Form.Check>
                    {otherAddress ? (
                     <Form.Control
                     type="text"
                     value={address}
                     onChange={(e) => {setAddress(e.target.value); console.log(otherAddress)}}
                   /> ): null
                  }

                  </Col>
                </Form.Group>
              </Form>
                      {/* <Form.Check type="radio">
                        
                        <Form.Check.Label>
                          <Form.Control
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </Form.Check.Label>
                      </Form.Check>
                    </Col>
                  </Form.Group>
                </Form> */}
                {/* <Col>{address}</Col> */}
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method:</strong>
              <Form onSubmit={submitHandler}>
                <Form.Group>
                  {/* <Form.Label as="legend">Select Method</Form.Label> */}
                  <Col>
                    <Form.Check
                      type="radio"
                      label="PayPal or Credit Card"
                      id="PayPal"
                      name="paymentMethod"
                      value="PayPal"
                      checked
                      // onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>
                    <Form.Check
                      type="radio"
                      label="Toss"
                      id="Toss"
                      name="paymentMethod"
                      value="Toss"
                      // onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>
                  </Col>
                </Form.Group>
              </Form>
              {/* {cart.paymentMethod} */}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>주문자</h2>

              <Row>
                <Col>이름:</Col>
                <Col>{userInfo.username}</Col>
              </Row>
              <Row>
                <Col>이메일:</Col>
                <Col>{userInfo.email}</Col>
              </Row>
              <Row>
                <Col>전화번호:</Col>
                <Col>{userInfo.phone}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>주문상품</h2>
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
                          {item.qty} x {item.price}₩ = {item.qty * item.price}₩
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
            <ListGroup variant="flush" className="justify-content-center">
              <ListGroup.Item>
                <h2>결제 금액</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>총 상품금액: ₩</Col>
                  {/* <Col>${cart.itemsPrice}</Col> */}
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>배송비: 5000₩</Col>
                  {/* <Col>${cart.shippingPrice}</Col> */}
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>쿠폰 사용: ₩</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>포인트 사용: ₩</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <h4>
                    총 결제금액:
                    {subtotalPrice} ₩
                  </h4>
                </Row>
              </ListGroup.Item>
              {/* {error && <Message variant="danger">{error}</Message>} */}

              <ListGroup.Item>
                {/* <div id="paypal-container-G79NBA9VRJHP4"
             disabled={cart.cartItems === 0}
             onclick={placeOrderHandler}></div> */}{" "}
                <Button
                  type="button"
                  className="btn-block"
                  //  disabled={cart.cartItems === 0}
                  //  onClick={placeOrderHandler}
                >
                  {subtotalPrice} 결제하기
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ShippingScreen;

