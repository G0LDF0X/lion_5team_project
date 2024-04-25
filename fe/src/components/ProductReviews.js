import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
function ProductReviews({ reviews }) {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/reviews/${reviews.id}`}> 
                <Card.Img src={reviews.image_url} variant="top" />
            </Link>

            <Card.Body>
                <Link to={`/reviews/${reviews.id}`}> 
                    <Card.Title as="div">
                        <strong>{reviews.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <div className="my-3">
                        {reviews.rating} 
                        <Rating
                            value={reviews.ratie}
                            text={`reviews`}
                            color={"#f8e825"}
                        />
                    </div>
                </Card.Text>
                {/* <Card.Text as="h3">${reviews.price}</Card.Text> */}
            </Card.Body>
        </Card>
    );
}

export default ProductReviews;
