import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Image,
  Container,
  Form,
  Button,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../components/Message";
import Loading from "../components/Loading";
import { getUserDetails } from "../actions/userActions";

function UserSettingSetting() {
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
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || userInfo.id !== user.id) {
        // dispatch({ type: USER_UPDATE_PROFILE_RESET });
        // dispatch(getUserDetails("profile"));
        // dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user, redirect, location]);

  const handleImageChange = (e) => {
console.log(e.target.files[0]);
    };
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
    <Container>
      <Row className="justify-content-center">
        {/* <Col xs={6} md={4} className="d-flex justify-content-center">
          <Image src="https://placehold.co/400" roundedCircle width="50%"/>
        </Col> */}
        {/* <div style={{ position: 'relative', display: 'inline-block' }}> */}
        
        <Col xs={6} md={4} >
            <label htmlFor="fileInput">
  <Image src="https://placehold.co/400" roundedCircle width="70%" />
  </label>
  <Form.Control 
    type="file" 
    id="fileInput"
    onChange={handleImageChange} 
    style={{ 
        display: 'none',
    }} 
  />
</Col>
{/* </div> */}
      </Row>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          {/* <h2>User Profile</h2> */}
          {message && <Message variant="danger">{message}</Message>}
          {/* {error && <Message variant="danger">{error}</Message>}  */}
          {loading && <Loading />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>
                닉네임 <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>
                Email Address <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <div className="d-grid gap-2">
              <Button type="submit" variant="primary" size="lg">
                Update
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default UserSettingSetting;

// const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
// const { success } = userUpdateProfile;
// const orderListMY = useSelector((state) => state.orderListMY);
// const { loading: loadingOrders, error: errorOrders, orders } = orderListMY;
