import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';

const OtherUserQnA = ({ userId }) => {
  const [userQnAs, setuserQnAs] =  useState([]);
  const [userAnswers, setUserAnswers] =  useState([]);
  useEffect(() => {
    fetch(`myqna/`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const promises = data.map(qna => 
        fetch(`/qna/detail/${qna.id}`).then(response => response.json())
      );
  
      Promise.all(promises).then(userAnswerData => {
        const userQnAsWithAnswerData = data.map((qna, index) => ({
          ...qna,
          answers: userAnswerData[index]
        }));
        setuserQnAs(userQnAsWithAnswerData);
      });
    })
    .catch(error => console.error('Error:', error));
  }, []);
   useEffect(() => {
    fetch(`myanswer/`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      setUserAnswers(data);
    })
    .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>나의 질문</h2>
          {console.log("USERQNAS :", userQnAs)}
          {userQnAs.map((userQnA, index) => (
            <ListGroup as="ol" key={index} className='mb-3'>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <Link to={`/qna/detail/${userQnA.id}`}>
                    <div className="fw-bold">{userQnA.title}</div>
                  </Link>
                  {userQnA.content.length > 100 
                  
                ? <span dangerouslySetInnerHTML={{ __html: `${userQnA.content.substring(0, 100)}...` }} style={{color:'black', background:'white'}} />
                : <span dangerouslySetInnerHTML={{ __html: userQnA.content }} style={{ color: 'black', backgroundColor: 'white' }} />}<br/>
                  <small style={{ color: 'gray' }}>{userQnA.created_at.split('T')[0]}</small>
                </div>
                <Badge bg="primary" pill>
                  {userQnA.answers.answers.length}
                </Badge>
              </ListGroup.Item>
            </ListGroup>
          ))}
        </div>
        <div className="col">
          <h2>나의 답변</h2>
          {userAnswers.map((userAnswer, index) => (
            <ListGroup as="ol" key={index} className='mb-3'>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <Link to={`/qna/detail/${userAnswer.user_qna_id}`}>
                    <div className="fw-bold">{userAnswer.title}</div>
                  </Link>
                  {userAnswer.content.length > 100 
                  
                ? <span dangerouslySetInnerHTML={{ __html: `${userAnswer.content.substring(0, 100)}...` }} style={{color:'black', background:'white'}} />
                : <span dangerouslySetInnerHTML={{ __html: userAnswer.content }} style={{ color: 'black', backgroundColor: 'white' }} />}<br/>
                  <small style={{ color: 'gray' }}>{userAnswer.created_at.split('T')[0]}</small>
                </div>
              </ListGroup.Item>
            </ListGroup>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OtherUserQnA;