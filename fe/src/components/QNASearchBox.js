import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

function QNASearchBox() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      // navigate(`/items/?query=${keyword}&?page=1`);
    } else {
      // navigate(location.pathname);
    }
  };
  return (
    <div>
      <Form className="d-flex" onSubmit={submitHandler}>
        <Row className="align-items-center">
          <Col>
            <Form.Control
              type="text"
              name="query"
              placeholder="Search"
              className="ml-5"
              style={{ width: "500px" }}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </Col>
          <Col xs="auto">
            <Button type="submit" className="p-2" variant="outline-success">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
 
export default QNASearchBox;
