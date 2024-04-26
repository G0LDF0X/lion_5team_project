import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listQNA } from '../actions/qnaActions'

function QAScreen() {
  const dispatch = useDispatch()
  const qnaList = useSelector(state => state.qnaList)
  const { loading, error, qnas } = qnaList
  console.log(qnas)
useEffect(() => {
  dispatch(listQNA())
}
, [dispatch]);

  return (
    <Row>
      <Col md={9}>
        <h1>Q&A</h1>
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h3>{error}</h3>
        ) : (
          <Row>
            {qnas.map((qna) => (
              <Col key={qna.id} sm={12} md={6} lg={4} xl={3}>
                <Card className='my-3 p-3 rounded'>
                  <Link to={`/qna/detail/${qna.id}`}>
                    <Card.Title as='div'>
                      <strong>{qna.title}</strong>
                    </Card.Title>
                  </Link>
                  <Card.Body>
                    <Card.Text as='div'>
                      <div className='my-3'>
                        {qna.content}
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Col>
    </Row>
  )
}

    {/* <div>
      <div>
        {qnas.map((qna) => (
          <div key={qna.id}>
            <h2>{qna.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: qna.content }} style={{ color: 'black', backgroundColor: 'white' }} />
          </div>
        ))}
      </div>
      
    </div> */}
  


export default QAScreen