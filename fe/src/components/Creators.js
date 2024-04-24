import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
function Creator({ creator }) {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/items/detail/${creator._id}`}> 
                <Card.Img src={creator.image} variant="top" />
            </Link>

            <Card.Body>
                <Link to={`/creator/${creator._id}`}> 
                    <Card.Title as="div">
                        <strong>{creator.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <div className="my-3">
                        {creator.rating} 
                        <Rating
                            value={creator.rating}
                            text={`${creator.numReviews} reviews`}
                            color={"#f8e825"}
                        />
                    </div>
                </Card.Text>
                <Card.Text as="h3">${creator.price}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Creator;
