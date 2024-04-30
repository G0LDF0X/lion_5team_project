import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import {
  Form,
  Button,
  Row,
  ListGroup,
  Image,
  Card,
  Col,
} from "react-bootstrap";
import Message from "../components/Message";
import Loading from "../components/Loading";
import { getOrderDetails } from "../actions/orderActions";

function OrderDetailScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    dispatch(getOrderDetails(id));
    console.log("order", order);
  }
  , [dispatch, id, navigate, userInfo]);
  return loading ? (
    <Loading />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1>Order {order.id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong>
                {order.name}
              </p>
              <p>
                <strong>Email:</strong>
                {/* <a href={`mailto:${order.user.email}`}>{order.user.email}</a> */}
              </p>
              {/* <p>
                <strong>Address:</strong>
                {order.shippingAddress.address},{order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p> */}
              {/* {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )} */}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Delivered on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.name === 0 ? (
                <Message>Your order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {/* {{order.name.map((item, index) => ( */}
                    <ListGroup.Item key={order.id}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={order.image}
                            alt={order.name}
                            fluid
                            rounded
                          />
                        </Col> 
                        {/* <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col> */}
                      </Row>
                    </ListGroup.Item>
                  
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              {/* <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row> */}
              {/* </ListGroup.Item> */}
              {/* <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row> */}
              {/* </ListGroup.Item> */}

              {/* <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item> */}
              {/* {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loading />}
                  {!sdkReady ? (
                    <Loading />
                  ) : (
                    <div
                      id="paypal-container-U9DKC2ADCW48W"
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    ></div>
                  )}
                </ListGroup.Item>
              )} */}
            </ListGroup>
            {/* {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <ListGroup.Item>
                  {loadingDeliver && <Loading />}
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={deleverHandler}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )} */}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderDetailScreen
