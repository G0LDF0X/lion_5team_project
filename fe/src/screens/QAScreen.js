import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listQNA } from '../actions/qnaActions'
import { createQNA } from '../actions/qnaActions'
import { QNA_CREATE_RESET } from '../constants/qnaConstants'
import { Card, Col, Row } from 'react-bootstrap'
import { ListItemIcon } from '@mui/material'
import List from '@mui/material/List';
import { Link } from 'react-router-dom';

import ListForm from '../components/ListForm'

function QAScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const qnaList = useSelector(state => state.qnaList)
  const { qnas } = qnaList
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const qnaCreate = useSelector(state => state.qnaCreate)
  const { success: successCreate, qna: createdQNA } = qnaCreate

  const createHandler = () => { 
    dispatch(createQNA())
    if(successCreate) {
      dispatch({ type: QNA_CREATE_RESET })
      navigate(`/qna/update/{createdQNA.id}`)
    }
  }

  useEffect(() => {
    dispatch(listQNA(userInfo))
    if (successCreate) {
      dispatch({ type: QNA_CREATE_RESET })
      navigate(`/qna/update/${createdQNA.id}`)
    }
  }, [dispatch, successCreate, navigate, createdQNA, userInfo]);

  return (
    <div>
      <h1>Q&A</h1>
      <Row>
        {qnas.map((qna) => (
          <Col key={qna.id} sm={12} md={6} lg={4} xl={12}>
            <Card className='my-3 p-3 rounded'>
              <Card.Body>
                <Row>
                  <Col xs={2}>
                    <Card.Img src={qna.image}></Card.Img>
                    <Card.Text>텍스트 확인</Card.Text>
                  </Col>
                  <Col xs={10}>
                    <Card.Title as='div'>
                      <Link to={`/qna/detail/${qna.id}`}>
                      <strong>{qna.title}</strong></Link>
                    </Card.Title>
                    <Card.Text>
                    <div dangerouslySetInnerHTML={{ __html: qna.content }} style={{ color: 'black', backgroundColor: 'white' }} />
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
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