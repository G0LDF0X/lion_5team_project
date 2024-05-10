import React, { useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import {  Card } from "react-bootstrap";

const MyBoard = ({userInfo}) => {
    const [MyBoards, setMyBoards] = useState([]);
    useEffect(() => {
        fetch('/users/profile/myboard/', {
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
        .then(data => setMyBoards(data))
        .catch(error => console.error('Error:', error));
      }, []);
  return (
    <div className='container'>
      {/* <h2>나의 게시글</h2> */}
      <div className='row'>
        {MyBoards.map((board) => (
            <div className='col-lg-3 col-md-6 mb-4'>
            <Card className="h-100">
                <Card.Img variant="top" src={board.image_url} />
                    <Card.Body>
                        <Link to={`/board/detail/${board.id}`}> 
                            <Card.Title as="div">
                                <h5>{board.title.length > 20 
                        ? `${board.title.substring(0, 20)}...` 
                        : board.title}</h5>
                            </Card.Title>
                        </Link>

                        {board.content.length > 30 
                        ? `${board.content.substring(0, 30)}...` 
                        : board.content}
                    </Card.Body>
                </Card>
            </div>
        ))}
        </div>
    </div>
  );
};

export default MyBoard;