import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
function Board({ board }) {
    const {userinfo} = JSON.parse(localStorage.getItem("userInfo"));

    return (
        <div>
            {userinfo ? ( 
                <>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant="light" className="btn-sm">
                            <i className="fas fa-edit"></i>
                        </Button>
                    </LinkContainer>
                
                    <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(product._id)}
                    >
                        <i className="fas fa-trash"></i>
                    </Button>
                </>
            ) : null
            }

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
                </Card.Body>
            </Card>
        </div>
    );
}

export default Board;
