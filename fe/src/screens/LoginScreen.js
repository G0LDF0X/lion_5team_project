import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { login } from "../actions/userActions";
import Message from "../components/Message";
import Loading from "../components/Loading";
import FormContainer from "../components/FormContainer";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.state ? location.state.from : "/";
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);
  // useEffect(() => {
  //   if (window.grecaptcha) {
  //     window.grecaptcha.enterprise.ready(async () => {
  //       try {
  //         const token = await window.grecaptcha.enterprise.execute(
  //           "6LdxUbwpAAAAAN5oiXMW23GXAXcF4KXG_kZ6l62-",
  //           { action: "LOGIN" }
  //         );
  //         const response = await fetch("/api/login/", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ token }),
  //         });

  //         if (!response.ok) {
  //           throw new Error("Server response was not ok");
  //         }

  //         const data = await response.json();
  //         // use the data...
  //       } catch (error) {
  //         console.error("Failed to execute reCAPTCHA or fetch:", error);
  //       }
  //     });
  //   }
  // }, [submitHandler]);
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("LOGIN");
    dispatch(login(email, password));
    // DISPATCH LOGIN
  };
  //   useEffect(() => {
  //     if (userInfo) {
  //       navigate(redirect);
  //     }
  //   }
  //     , [navigate, userInfo, redirect]);
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loading />}
      <Form onSubmit={submitHandler}>
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
        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register/` : `/register`}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;

