

import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

import Badge from 'react-bootstrap/Badge';
import React, { useEffect, useState} from "react";
import { Row, Col, Form, Card } from "react-bootstrap";
import Product from "../components/Product";

import { useDispatch, useSelector } from "react-redux";

import Loading from "../components/Loading";
import Message from "../components/Message";

import Rating from "./Rating";

const MyReview = () => {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const [MyReviews, setMyReviews] = React.useState([]);
    React.useEffect(() => {
        fetch('/users/myreview/', {
          headers: {
            'Authorization': `Bearer ${userInfo.access}`
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          const fetchItems = data.map(review => 
            fetch(`/items/detail/${review.item_id}/`).then(response => response.json())
          );
          return Promise.all(fetchItems).then(items => 
            data.map((review, index) => ({ ...review, item: items[index] }))
          );
        })
        .then(dataWithItems => setMyReviews(dataWithItems))
        .catch(error => console.error('Error:', error));
      }, []);
  return (
    <div>
      <h2>나의 리뷰</h2>
      {MyReviews.map((review) => (
      <Card className="my-3 p-3 rounded">

            <Card.Body>
                <Link to={`/items/detail/${review.item_id}`}> 
                    <Card.Title as="div">
                        <h4>{review.item.name}</h4>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <div className="my-3">
                        <Rating
                            value={review.rate}
                            text={` ${review.rate}`}
                            color={"#f8e825"}
                        />
                    </div>
                </Card.Text>
                {review.content.length > 30 
                ? `${review.content.substring(0, 30)}...` 
                : review.content}
            </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default MyReview;