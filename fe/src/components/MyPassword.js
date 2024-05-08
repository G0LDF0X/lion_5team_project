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
import { updateUserPassword, updateUserLogin } from "../actions/userActions";
import { getUserDetails } from "../actions/userActions";
import { logout } from "../actions/userActions";
import { USER_UPDATE_PASSWORD_RESET } from "../constants/userConstants";

function MyPassword() {
  const [message, setMessage] = useState(null);
  const [loginPassword, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.state ? location.state.from : "/";
  const userPassword = useSelector((state) => state.userUpdatePassword);
  const { loading: passwordLoading, success, userInfo:loadingPassword } = userPassword

  console.log("USERINFO : ", userInfo);
  useEffect(() => {
    console.log("ACTIVATE USER EFFECT");
    if (!userInfo) {
      navigate("/login");
    } else {
        setPassword(userInfo.password);
    }

    // if (success) {
        
    //     console.log("SUCCESS :", userInfo);
    //     dispatch(logout());
    //     dispatch({ type: USER_UPDATE_PASSWORD_RESET });
    //     navigate("/password-change-confirm");
    // }
  }, [userInfo]);

  
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("LOGINPASSWORD : ", loginPassword);
    console.log("CURRENTPASSWORD : ", currentPassword);
    if (loginPassword !== currentPassword) {
        setMessage("현재 비밀번호가 일치하지 않습니다.");
    } else if (newPassword !== confirmNewPassword) {
        alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    } else {
        console.log("CURRENT PASSWORD : ", currentPassword);
        console.log("NEW PASSWORD : ", newPassword);
        const updateUser = {
            currentPassword: currentPassword,
            newPassword: newPassword,
        }
        dispatch(updateUserPassword(updateUser));
        setMessage("비밀번호 변경이 완료되었습니다.");
        console.log("AFTER PASSWORD CHANGE : ", userLogin);
        dispatch(logout());
        navigate("/password-change-confirm");
    }


  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
            {console.log("COL MESSAGE : ", message, " COL ERROR :", error)}
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>} 
          {loading && <Loading />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="currentPassword">
              <Form.Label>
                현재 비밀번호 <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="paassword"
                placeholder="현재 비밀번호를 입력하세요."
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="newPassword">
              <Form.Label>
                변경할 비밀번호 <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="변경할 새 비밀번호를 입력하세요."
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>
                변경할 비밀번호 확인 <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="변경할 새 비밀번호를 다시 입력하세요."
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br />
            <div className="d-grid gap-2">
              <Button type="submit" variant="primary" size="lg">
                Update
              </Button>
            </div>
          </Form>
          {message && <div>{message}</div>}
        </Col>
      </Row>
    </Container>
  );
}

export default MyPassword;