import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
function Board({ board }) {
    // const {userinfo} = JSON.parse(localStorage.getItem("userInfo"));

    return (
        <div>
            <Card className="my-3 p-3 rounded">
                <Link to={`/items/detail/${board.id}`}> 
                    <Card.Img src={board.image_url} variant="top" />
                </Link>

                <Card.Body>
                    <Link to={`/board/${board.id}`}> 
                        <Card.Title as="div">
                            <strong>{board.title}</strong>
                        </Card.Title>
                    </Link>

                    <Card.Text as="div">
                        <div className="my-3">
                            {board.like} <i class="fa-solid fa-heart"></i>
                            {/* <Rating
                                value={board.like}
                                text={"likes"}
                                color={"#f8e825"}
                            /> */}
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Board;
