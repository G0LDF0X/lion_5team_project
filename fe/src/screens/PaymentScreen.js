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
import {
  getOrderDetails,
  // payOrder,
  // deliverOrder,
} from "../actions/orderActions";
// import {
//   ORDER_PAY_RESET,
//   ORDER_DELIVER_RESET,
// } from "../constants/orderConstants";

function OrderScreen() {
  const orderId = useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sdkReady, setSdkReady] = useState(false);

  const orderDetail = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetail;
  // const orderPay = useSelector((state) => state.orderPay);
  // const { loading: loadingPay, success: successPay } = orderPay;
  // const orderDeliver = useSelector((state) => state.orderDeliver);
  // const { loading: loadingDeliver, success: successDeliver } = orderDeliver;
  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;
  // if (!loading && !error) {
  //   order.itemsPrice = order.orderItems.reduce(
  //     (acc, item) => acc + item.price * item.qty,
  //     0
  //   );
  // }

  // const addPaypalScript = () => {
  //   window.onload = () => {
  //     setSdkReady(true);
  //   };
  // };
  // useEffect(() => {
  //   if (!userInfo) {
  //     navigate("/login");
  //   } else {
  //     if (
  //       !order ||
  //       successPay ||
  //       order._id !== Number(orderId) ||
  //       successDeliver
  //     ) {
  //       dispatch({ type: ORDER_PAY_RESET });
  //       dispatch({ type: ORDER_DELIVER_RESET });

  //       dispatch(getOrderDetails(orderId));
  //     } else if (!order.isPaid) {
  //       setSdkReady(true);
  //     }
  //   }
  // }, [orderId, order, dispatch, successPay, successDeliver]);
  // const successPaymentHandler = (paymentResult) => {
  //   dispatch(payOrder(orderId, paymentResult));
  // };
  // const deleverHandler = () => {
  //   dispatch(deliverOrder(order));
  // };

//   return loading ? (
//     <Loading />
//   ) : error ? (
//     <Message variant="danger">{error}</Message>
//   ) : (
//     <div>
//       <h1>Order {order._id}</h1>
//       <Row>
//         <Col md={8}>
//           <ListGroup variant="flush">
//             <ListGroup.Item>
//               <h2>Shipping</h2>
//               <p>
//                 <strong>Name:</strong>
//                 {order.user.name}
//               </p>
//               <p>
//                 <strong>Email:</strong>
//                 <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
//               </p>
//               <p>
//                 <strong>Address:</strong>
//                 {order.shippingAddress.address},{order.shippingAddress.city},{" "}
//                 {order.shippingAddress.postalCode},{" "}
//                 {order.shippingAddress.country}
//               </p>
//               {order.isDelivered ? (
//                 <Message variant="success">
//                   Delivered on {order.deliveredAt}
//                 </Message>
//               ) : (
//                 <Message variant="danger">Not Delivered</Message>
//               )}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <h2>Payment Method</h2>
//               <p>
//                 <strong>Method:</strong>
//                 {order.paymentMethod}
//               </p>
//               {order.isPaid ? (
//                 <Message variant="success">Delivered on {order.paidAt}</Message>
//               ) : (
//                 <Message variant="danger">Not Paid</Message>
//               )}
//             </ListGroup.Item>
//             <ListGroup.Item>
//               <h2>Order Items</h2>
//               {order.orderItems.length === 0 ? (
//                 <Message>Your order is empty</Message>
//               ) : (
//                 <ListGroup variant="flush">
//                   {order.orderItems.map((item, index) => (
//                     <ListGroup.Item key={index}>
//                       <Row>
//                         <Col md={1}>
//                           <Image
//                             src={item.image}
//                             alt={item.name}
//                             fluid
//                             rounded
//                           />
//                         </Col>
//                         <Col>
//                           <Link to={`/product/${item.product}`}>
//                             {item.name}
//                           </Link>
//                         </Col>
//                         <Col md={4}>
//                           {item.qty} x ${item.price} = ${item.qty * item.price}
//                         </Col>
//                       </Row>
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>
//               )}
//             </ListGroup.Item>
//           </ListGroup>
//         </Col>
//         <Col md={4}>
//           <Card>
//             <ListGroup variant="flush">
//               <ListGroup.Item>
//                 <h2>Order Summary</h2>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Items</Col>
//                   <Col>${order.itemsPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Shipping</Col>
//                   <Col>${order.shippingPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Tax</Col>
//                   <Col>${order.taxPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Total</Col>
//                   <Col>${order.totalPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               {!order.isPaid && (
//                 <ListGroup.Item>
//                   {loadingPay && <Loading />}
//                   {!sdkReady ? (
//                     <Loading />
//                   ) : (
//                     <div
//                       id="paypal-container-U9DKC2ADCW48W"
//                       amount={order.totalPrice}
//                       // onSuccess={successPaymentHandler}
//                     ></div>
//                   )}
//                 </ListGroup.Item>
//               )}
//             </ListGroup>
//             {userInfo &&
//               userInfo.isAdmin &&
//               order.isPaid &&
//               !order.isDelivered && (
//                 <ListGroup.Item>
//                   {loadingDeliver && <Loading />}
//                   <Button
//                     type="button"
//                     className="btn btn-block"
//                     // onClick={deleverHandler}
//                   >
//                     Mark As Delivered
//                   </Button>
//                 </ListGroup.Item>
//               )}
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// }


return(
  
  <div>
    <h1>Order </h1>
    </div>
)}
export default OrderScreen;