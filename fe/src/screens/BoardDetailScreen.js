import React, {  useState, useEffect } from "react";
import { Row, Col, Image, ListGroup, Button, Card, Form} from "react-bootstrap";
import { Link, useParams, useNavigate} from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listBoardDetails } from "../actions/boardActions";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { board_CREATE_REVIEW_RESET } from "../constants/boardConstants";

function BoardDetailScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const boardDetails = useSelector((state) => state.boardDetails);
  const { loading, error, board } = boardDetails;
  useEffect(() => {
    dispatch(listBoardDetails(id));

  }, [dispatch, id]);
  // const board = board.find((p) => p._id === id)s
  return (
    <div>
      <Link to="/" className="btn btn-light my-2">Go Back
      </Link>
        {loading ? 
          <Loading />
         : error ? 
          <Message variant={"danger"}>{error}</Message>
         : (
         <div><Row>
          <Link to = {board.product_url}>
          <Col md={12}>
            <ListGroup variant="flush">
              <Card className='my-3 p-3 rounded'>

              <ListGroup.Item>
                <h3>{board.title}</h3>
              </ListGroup.Item>
              <Card className="my-3 p-3">
                <h3>{board.content}</h3>
                </Card>
              </Card>
             
            </ListGroup>
          </Col>
          </Link>
        </Row>
        
        
        </div>
  )}
        
          </div>
  );
}

export default BoardDetailScreen;
