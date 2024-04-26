import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
function Qa({ qa }) {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/items/detail/${qa.id}`}> 
                {/* <Card.Img src={qa.image_url} variant="top" /> */}
            </Link>

            <Card.Body>
                <Link to={`/qa/${qa.id}`}> 
                    <Card.Title as="div">
                        <strong>{qa.title}</strong>
                    </Card.Title>
                </Link>
{/* 
                <Card.Text as="div">
                    <div className="my-3">
                        {qa.rating} 
                        <Rating
                            value={qa.rating}
                            text={`${qa.numReviews} reviews`}
                            color={"#f8e825"}
                        />
                    </div>
                </Card.Text> */}
                {/* <Card.Text as="h3">${qa.price}</Card.Text> */}
            </Card.Body>
        </Card>
    );
}

export default Qa;
