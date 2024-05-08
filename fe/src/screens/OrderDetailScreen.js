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
import { getOrderDetails, getShippingAddress, get_Order } from "../actions/orderActions";
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
  const shippingAddress = useSelector((state) => state.shippingAddress);
  const { address, loading: loadingAddress, error: errorAddress } = shippingAddress;
  const orderState = useSelector((state) => state.getOrder);
  const { orderInfo } = orderState;


  console.log("USERINFO", userInfo);
  console.log("ORDER", order);
  console.log("ORDERSTATE", orderInfo);
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    dispatch(getOrderDetails(id));
    dispatch(getShippingAddress(id));
    dispatch(get_Order(id));
    console.log("order", order);
  }
  , [id]);

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
                <p>
                <strong>Address:</strong>
                {address && address.address}
              </p>
               {orderInfo.is_delivered ? (
                <Message variant="success">
                  Delivered on {orderInfo.delivered_at.split("T")[0]}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
              </ListGroup.Item>
              <ListGroup.Item>
              <h2>User</h2>
                <strong> ID: </strong>
                {userInfo.username}
              <p>
                <strong>Email:</strong>
                {userInfo.email}
                {}
             </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
                <strong>Method:</strong>
                {order[0].payment_method}<br/>
              <span style={{ color: 'gray', fontSize: 'small' }}>
          {orderInfo.paid_at.split('T')[0]}
        </span>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start'}} >
                {order ? order.map((item, index) => (
                  <Link to={`/items/detail/${item.item_id}`} style={{ width: '30%', margin: '1%', display: 'inline-block'}}>
                    <Card>
                      <Card.Img variant="top" src={item.image} alt={item.name} style={{width : '200px', height: "200px", margin: '0 auto'}} />
                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>
                          수량 : {item.qty}
                          <br />
                          합계 : {item.price_multi_qty}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                )) : null}
              </div>
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
                  {orderInfo.total_price}₩
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  {orderInfo.shipping_price}₩
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  {orderInfo.total_price + orderInfo.shipping_price}₩
                  
                </Row>
              </ListGroup.Item>
              
              
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