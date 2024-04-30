import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { listBookMark } from "../actions/bookmarkActions";


function BookmarkScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bookMarkList = useSelector((state) => state.bookMarkList);
  const { loading, error, bookMarks } = bookMarkList;

  useEffect(() => {
    dispatch(listBookMark());
  }
  , [dispatch]);
  return (
    <div>
      <h1>BookMarks</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Row>
          {/* {bookMarks.map((bookMark) => (
            <Col key={bookMark.id} sm={12} md={6} lg={4} xl={3}>
              <Card className="my-3 p-3 rounded">
                <Link to={`/items/detail/${bookMark.id}`}>
                  <Card.Img src={bookMark.image} variant="top" />
                </Link>
                <Card.Body>
                  <Link to={`/items/detail/${bookMark.id}`}>
                    <Card.Title as="div">
                      <strong>{bookMark.name}</strong>
                    </Card.Title>
                  </Link>
                  <Card.Text as="h3">${bookMark.price}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))} */}
        </Row>
      )}
    </div>
  
  )
}

export default BookmarkScreen
