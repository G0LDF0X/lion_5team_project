import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listQNA, createQNA } from '../store/actions/qnaActions';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function QAScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const qnaList = useSelector((state) => state.qnaList);
  const { qnas } = qnaList;
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  

  useEffect(() => {
    dispatch(listQNA());
   
  }, [ navigate]);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Q&A</h1>
        
      </div>
      <Row>
        {qnas.map((qna) => (
          <Col key={qna.id} sm={12} md={6} lg={4} xl={12}>
            <Card className="my-3 p-3 rounded shadow-lg">
              <Card.Body>
                <Row>
                  <Col xs={2}>
                    {qna.image_url && (
                      <Link to={`/qna/detail/${qna.id}`}>
                        <Card.Img
                          src={VITE_API_BASE_URL+qna.image_url}
                          className="w-24 h-24 object-cover rounded"
                        />
                      </Link>
                    )}
                  </Col>
                  <Col xs={10}>
                    <Card.Title as="div" className="mb-2">
                      <Link to={`/qna/detail/${qna.id}`}>
                        <strong className="text-xl">{qna.title}</strong>
                      </Link>
                    </Card.Title>
                    <Card.Text>
                      <span
                        dangerouslySetInnerHTML={{ __html: qna.content }}
                        className="text-gray-700"
                      />
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default QAScreen;