import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
function Board({ board }) {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/items/detail/${board.id}`}> 
                <Card.Img src={board.image_url} variant="top" />
            </Link>

            <Card.Body>
                <Link to={`/board/${board.id}`}> 
                    <Card.Title as="div">
                        <strong>{board.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <div className="my-3">
                        {board.like} 
                        <Rating
                            value={board.like}
                            text={"likes"}
                            color={"#f8e825"}
                        />
                    </div>
                </Card.Text>
                {/* <Card.Text as="h3">${board.price}</Card.Text> */}
            </Card.Body>
        </Card>
    );
}

export default Board;
