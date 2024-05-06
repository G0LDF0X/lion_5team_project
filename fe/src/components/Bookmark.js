

import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import React, { useEffect, useState} from "react";
import { Row, Col, Form, Card } from "react-bootstrap";
import Product from "../components/Product";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loading from "../components/Loading";
import Message from "../components/Message";

const Bookmark = () => {

  const bookMarkList = useSelector(state => state.bookMarkList);
    const { loading, error, bookMarkItems } = bookMarkList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // const [bookmarks, setBookmarks] =useState([]);
  

  return (
    <div>
      <h1>나의 북마크</h1>
      {/* {console.log(bookmarks)} */}
      <div className='d-flex flex-row flex-wrap'>
      {bookMarkItems&&bookMarkItems.map((bookmark, index) => (
        <Card style={{ width: '18rem' , margin: '10px' }} key={index}>
        <Card.Body>
          <Card.Title>{bookmark.name}</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>{bookmark.price}원</Card.Subtitle>
          <Card.Text>{bookmark.category}</Card.Text>
          <Link to={`/items/detail/${bookmark.item_id}`}>
          <Button variant="primary">바로가기</Button>
          </Link>
        </Card.Body>   
      </Card>
      ))}
      </div>
    </div>
    
  );
};

export default Bookmark;