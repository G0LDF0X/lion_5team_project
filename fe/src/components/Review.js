import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
function Review({ review }) {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/items/detail/${review._id}`}> 
                <Card.Img src={review.image} variant="top" />
            </Link>

            <Card.Body>
                <Link to={`/review/${review._id}`}> 
                    <Card.Title as="div">
                        <strong>{review.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <div className="my-3">
                        {review.rating} 
                        <Rating
                            value={review.rating}
                            text={`${review.numReviews} reviews`}
                            color={"#f8e825"}
                        />
                    </div>
                </Card.Text>
                <Card.Text as="h3">${review.price}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Review;
