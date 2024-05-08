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
import { List } from "@material-ui/core";

function OrderDetailScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [sdkReady, setSdkReady] = useState(false);
  const [loadingPay, setLoadingPay] = useState(false);
  const [loadingDeliver, setLoadingDeliver] = useState(false);

  console.log("email", userInfo);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    dispatch(getOrderDetails(id));
    console.log("order", order);
  }
  , [dispatch, id, navigate, userInfo]);

  const successPaymentHandler = (paymentResult) => {
    // 여기에 결제 성공 시 실행할 코드를 작성하세요.
    console.log(paymentResult);
  }

  const deliverHandler = () => {
    // 여기에 배송 상태로 변경 시 실행할 코드를 작성하세요.
    console.log('Order has been marked as delivered.');
  }

  return loading ? (
    <Loading />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1>Order {order.id}</h1>
      {console.log("order1", order)}
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              { order ? order.map((item, index) => (
                <p>
                <strong>Address:</strong>
                {item.shippingAddress}
              </p>
              )) : null}
               {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
              </ListGroup.Item>
              <ListGroup.Item>
              <h2>User</h2>
                <strong> Name:
                { order ? order.map((item, index) => (
                <p>{item.user_name}</p>
                )) : null}
                </strong>
              <p>
                <strong>Email:</strong>
                {/* <a href={`mailto:${order.user.email}`}>{order.user.email}</a> */}
              </p>
                {/* <p> */}
                {/* <strong>Address:</strong>
                {order.shippingAddress.address},{order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p> */}
             
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {order ? order.map((item, index) => (
                  <p>{item.payment_method}</p>
                )) : null}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order ? order.map((item, index) => (
            <div>
            <img src={item.image} alt={item.name} style={{width : '200px', height: "200px"}} />
            <h5>item : {item.name}</h5> 
            <h5>수량 : {item.qty} </h5> 
            <h5>합계 : {item.price_multi_qty} </h5> 
            
            </div>
          )) : null}
              {order && order.orderItems && order.orderItems.length === 0 ? (
                <Message>Your order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order && order.orderItems && order.orderItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
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
                  {order ? order.map((item, index) => (
                  <Col>${item.price_multi_qty}</Col>
                )) : null}
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  {order ? order.map((item, index) => (
                  <Col>${item.shipping_price}</Col>
                )) : null}
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  {order ? order.map((order, index) => (
                    <Col>${order.total_price}</Col>
                  )) : null}
                  
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
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
              )}
            </ListGroup>
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <ListGroup.Item>
                  {loadingDeliver && <Loading />}
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={deliverHandler}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderDetailScreen