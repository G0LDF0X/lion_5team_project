import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar, Container, Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function SearchBox() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const location = useLocation();
  

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/items/?query=${keyword}&?page=1`);
    } else {
      navigate(location.pathname);
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

export default SearchBox;

// </Form>
// <div>

//       <Container>
//         <LinkContainer to="/">
//           <Navbar.Brand>shop</Navbar.Brand>
//         </LinkContainer>
//         <Form className="d-flex">
//         <Form.Control
//           type="search"
//           placeholder="Search"
//           className="mr-2 search-input"
//           aria-label="Search"
//         />
//         <Button variant="outline-success">Search</Button>
//       </Form>
//         </Container>
// </div>
//   )
// }

// export default SearchBox
