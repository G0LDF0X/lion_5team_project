

import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

import Badge from 'react-bootstrap/Badge';
import React, { useEffect, useState} from "react";
import { Row, Col, Form, Card } from "react-bootstrap";
import Product from "../components/Product";

import { useDispatch, useSelector } from "react-redux";

import Loading from "../components/Loading";
import Message from "../components/Message";

const Bookmark = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // const [bookmarks, setBookmarks] = React.useState([]);
  const bookMarkList = useSelector(state => state.bookMarkList);
  const { loading, error, bookMarkItems } = bookMarkList;

  return (
    <div>
      <h2>나의 북마크</h2>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {bookMarkItems.map((bookmark) => (
            <Card style={{ width: '18rem' , margin: '10px' }} key={bookmark.id}>
              <Card.Body>
                <Card.Title>{bookmark.name}</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>{bookmark.price}원</Card.Subtitle>
                <Badge bg="info">{bookmark.category}</Badge>
                <Card.Text>
                  <br />
                  {bookmark.description&&bookmark.description.length > 30 
                      ? `${bookmark.description.substring(0, 30)}...` 
                      : bookmark.description}
                </Card.Text>
                <Link to={`/items/detail/${bookmark.item_id}`}>
                  <Button variant="primary">바로가기</Button>
                </Link>
              </Card.Body>   
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmark;