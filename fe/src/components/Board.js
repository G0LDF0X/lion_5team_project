import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
function Board({ board }) {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    // const {userinfo} = JSON.parse(localStorage.getItem("userInfo"));

    return (
        <div>
            
                <Link to={`/board/detail/${board.id}`}> 
                    {/* <Card.Img src={board.image_url} variant="top" /> */}
                    <Card.Img src={decodeURIComponent(board.image_url)} variant="top" />
                </Link>

                <Card.Body>
                    <Link to={`/board/detail/${board.id}`}> 
                        <Card.Title as="div">
                            <strong>{board.title}</strong>
                        </Card.Title>
                    </Link>

                    <Card.Text as="div">
                        <div className="my-3">
                            {board.like} <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                            {/* <Rating
                                value={board.like}
                                text={"likes"}
                                color={"#f8e825"}
                            /> */}
                        </div>
                    </Card.Text>
                </Card.Body>
            {/* </Card> */}
        </div>
    );
}

export default Board;
