import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const MyReview = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const myReviewList = useSelector((state) => state.myReviewList);
  const { userInfo } = userLogin;
  const { loading, error, reviews } = myReviewList;

  return (
    <div>
      {reviews && reviews.length !== 0 ? (
        reviews.map((review) => (
          <Card className="my-3 p-3 rounded" key={review.item_id}>
            <Card.Body>
              <Link to={`/items/detail/${review.item_id}`}>
                <Card.Title as="div">
                  <h4>{review.item}</h4>
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
                  
                  ? <div dangerouslySetInnerHTML={{ __html: `${review.content.substring(0, 30)}...` }} style={{color:'black', background:'white'}} />
                  : <div dangerouslySetInnerHTML={{ __html: review.content }} style={{ color: 'black', backgroundColor: 'white' }} />}
            </Card.Body>
          </Card>
        ))
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "10vh",
          }}
        >
          <h3>리뷰가 없습니다.</h3>
        </div>
      )}
    </div>
  );
};

export default MyReview;
