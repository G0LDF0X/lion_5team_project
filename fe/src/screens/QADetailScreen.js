import React, {  useState, useEffect } from "react";
import { Row, Col, Image, ListGroup, Button, Card, Form} from "react-bootstrap";
import { Link, useParams, useNavigate} from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import {listQNADetails} from "../actions/qnaActions";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { qna_CREATE_REVIEW_RESET } from "../constants/qnaConstants";

function QADetailSceen() {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const qnaDetails = useSelector((state) => state.qnaDetails);
  const { loading, error, qna, answers } = qnaDetails;



  useEffect(() => {
    dispatch(listQNADetails(id));

  }, [dispatch, id]);
  // const qna = qna.find((p) => p._id === id)s
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
          
          <Col md={12}>
            <ListGroup variant="flush">
              <Card className='my-3 p-3 rounded'>

              <ListGroup.Item>
                <h3>{qna.title}</h3>
              </ListGroup.Item>
              <Card className="my-3 p-3">
                <h3>{qna.content}</h3>
                </Card>
              </Card>
              <Card className='my-3 p-3 rounded'>
              <ListGroup.Item>
                <h3>Answers</h3>
                {/* {answers.map((answer) => (
                  <ListGroup.Item key={answer._id}>
                    <strong>{answer.name}</strong>
                    <Rating value={answer.rating} />
                    <p>{answer.createdAt.substring(0, 10)}</p>
                    <p>{answer.comment}</p>
                  </ListGroup.Item>
                ))} */}

              </ListGroup.Item>
              </Card>
             
            </ListGroup>
          </Col>
        </Row>
        
        
        </div>
  )}
        
          </div>
  );
}

export default QADetailSceen;
