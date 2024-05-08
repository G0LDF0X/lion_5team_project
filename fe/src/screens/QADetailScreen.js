import React, {  useState, useEffect } from "react";
import { Row, Col, Image, ListGroup, Button, Card, Form} from "react-bootstrap";
import { Link, useParams, useNavigate} from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import {listQNADetails} from "../actions/qnaActions";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { QNA_ANSWER_CREATE_RESET, qna_CREATE_REVIEW_RESET } from "../constants/qnaConstants";
import { createQNAAnswer } from "../actions/qnaActions";
// import { QNA_ANSWER_CREATE_RESET } from "../constants/qnaConstants";

function QADetailSceen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const qnaDetails = useSelector((state) => state.qnaDetails);
  const { loading, error, qna, answers } = qnaDetails;
  const qnaAnswerCreate = useSelector(state => state.qnaAnswerCreate);
  const { success: successCreate, qna : createdQna } = qnaAnswerCreate;

// console.log("QNA:", qna);
// console.log("ANSWERS:",answers);


  const answerCreateHandler = () => {
    console.log("ID", qna.id)
    dispatch(createQNAAnswer(qna.id))
  }
  useEffect(() => {
    dispatch(listQNADetails(id));
    if (successCreate) {
      dispatch({type: QNA_ANSWER_CREATE_RESET})
      navigate(`/qna/answer/update/${createdQna.id}/`);
    }
  }
  , [navigate,successCreate]);
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

            {/* QNA 질문 */}
            <ListGroup variant="flush">
              <Card className='my-3 p-3 rounded'>
              <h3>{qna.title}</h3>
              <Link to={`/users/${qna.user_id}/`}>
              <strong>{qna.user}</strong></Link>
              {qna.created_at && qna.created_at.substring(0, 10)}<br /><br />
              {qna.image_url && <img src={qna.image_url} alt="QnA" />}<br /><br />
              
            <div dangerouslySetInnerHTML={{ __html: qna.content }} style={{ color: 'black', backgroundColor: 'white' }} />
              {/* {qna.content} */}
              {/* <ListGroup.Item>
                {qna.content}
                </ListGroup.Item> */}
              {/* <ListGroup.Item>
                <h3>{qna.title}</h3>
              </ListGroup.Item>
              <Card className="my-3 p-3">
              <div dangerouslySetInnerHTML={{ __html: qna.content }} style={{ color: 'black', backgroundColor: 'white' }} />
                </Card> */}
              </Card>

              {/* Q&A 답변하기 */}
              <div style={{ width: '100%', textAlign: 'right' }}>
              {/* <Link to={`/qna/answer/create/${qna.id}/`}> */}
                {/* {console.log("ID", qna.id)} */}
                <Button className="btn-primary btn-sm" onClick ={answerCreateHandler}>Create Q&A Answer</Button>
                {/* </Link> */}
              </div>

              {/* QNA 답변 */}
              <Card className='my-3 p-3 rounded'>
                <h3>Answers</h3>
                {answers && answers.map((answer) => (
                  <ListGroup.Item key={answer._id}>
                    <h4>{answer.title}</h4>
                    <Link to={`/users/${answer.user_id}/`}>
                    <strong>{answer.user}</strong></Link>
                    <p>{answer.created_at.substring(0, 10)}</p>
                    <div dangerouslySetInnerHTML={{ __html: answer.content }} style={{ color: 'black', backgroundColor: 'white' }} />
                  </ListGroup.Item>
                ))}

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