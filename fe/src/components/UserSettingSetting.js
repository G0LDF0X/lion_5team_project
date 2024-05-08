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
import Message from "../components/Message";
import Loading from "../components/Loading";
import { updateUserProfile } from "../actions/userActions";
import { getUserDetails } from "../actions/userActions";

function UserSettingSetting() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.state ? location.state.from : "/";

  console.log("SETTING SETTING :", loading, error, user);

  
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
        setNickname(userInfo.nickname);
        setEmail(userInfo.email);
    }
  }, [dispatch, navigate, userInfo, user]);

  const handleImageChange = async(e) => {
    console.log("handleImageChange activated")

    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image_url", image);

    try {
      const response = await fetch("/users/updateImage/", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${userInfo.access}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Image uploaded successfully");
        dispatch(getUserDetails(userInfo.id));
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage(error.message);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        nickname: nickname,
        email: email,
      })
    );
  };
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={6} md={4}>
          <label htmlFor="fileInput">
            {/* {userInfo && userInfo.image ? ( */}
            {user.user&& user.user.image_url ? 
              <Image src={user.user.image_url} roundedCircle width="40%" />
              : <Image src="https://placehold.co/400" roundedCircle width="40%" />}
            {/* ) : ( */}
              {/* <Image src="https://placehold.co/400" roundedCircle width="70%" /> */}
            {/* )} */}
            {/* <Image src="https://placehold.co/400" roundedCircle width="70%" /> */}
          </label>
          <Form.Control
            type="file"
            id="fileInput"
            onChange={handleImageChange}
            style={{
              display: "none",
            }}
          />
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>} 
          {loading && <Loading />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>
                닉네임 <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
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