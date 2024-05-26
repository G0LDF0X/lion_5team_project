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
                  <Col xs={1}>
                  {qna.image_url && 
                    <Link to={`/qna/detail/${qna.id}`}>
                    <Card.Img src={qna.image_url}
                    style={{
                      width: '100px',  // 원하는 너비로 설정
                      height: '100px', // 원하는 높이로 설정
                      objectFit: 'cover', // 이미지가 정사각형에 맞게 잘리도록 설정
                      margin: '-20px',
                    }}></Card.Img></Link>}
                  </Col>
                  <Col xs={11}>
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
  


export default QAScreen