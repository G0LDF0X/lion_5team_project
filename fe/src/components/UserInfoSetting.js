import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import Message from "../components/Message";
import Loading from "../components/Loading";
import { getUserDetails} from "../actions/userActions";
// import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstasnts";
// import { listMyOrders } from "../actions/orderActions";

function UserProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.state ? location.state.from : "/";
  // const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  // const { success } = userUpdateProfile;
  // const orderListMY = useSelector((state) => state.orderListMY);
  // const { loading: loadingOrders, error: errorOrders, orders } = orderListMY;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name ||  userInfo.id !== user.id) {
        // dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        // dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user, redirect, location]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        setMessage("Passwords do not match");
    // } else {
    //     // dispatch(
    //     //     updateUserProfile({
    //     //         'id': user._id,
    //     //         'name': name,
    //     //         'email': email,
    //     //         'password': password,
    //         })
    //     );
    //     setMessage("update successful");
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {/* {message && <Message variant="danger">{message}</Message>} */}
        {/* {error && <Message variant="danger">{error}</Message>} */}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      {/* <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loading />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="light" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        
      </Col> */}
    </Row>
  );
}

export default UserProfileScreen;
