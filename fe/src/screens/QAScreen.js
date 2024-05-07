import React, {useEffect} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listQNA } from '../actions/qnaActions'
import { createQNA } from '../actions/qnaActions'
import { QNA_CREATE_RESET } from '../constants/qnaConstants'
import QNASearchBox from '../components/QNASearchBox'
import { ListItemIcon } from '@mui/material'
import List from '@mui/material/List';

import ListForm from '../components/ListForm'

function QAScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const qnaList = useSelector(state => state.qnaList)
  const { loading, error, qnas } = qnaList
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  // const userDetail = useSelector(state => state.userDetail)
  // const { user } = userDetail
  const qnaCreate = useSelector(state => state.qnaCreate)
  const { loading: loadingCreate, error: errorCreate, success: successCreate, qna: createdQNA } = qnaCreate
  // console.log(qnas)
  const createHandler = () => { 
    dispatch(createQNA())
    if(successCreate) {
      dispatch({ type: QNA_CREATE_RESET })
      navigate(`/qna/update/{createdQNA.id}`)
      
    }
    // console.log(userInfo)
  }

useEffect(() => {
  dispatch(listQNA(userInfo))
  if (successCreate) {
    dispatch({ type: QNA_CREATE_RESET })
    navigate(`/qna/update/${createdQNA.id}`)
  }
}
, [dispatch, successCreate, navigate, createdQNA, userInfo]);
  console.log(qnas);
  return (<div>
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
                <strong>{qna.title}</strong>
              </Card.Title>
              <Card.Text>
                {qna.content}
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>
{userInfo ? (
  <Row>
    <Col className="text-right">
      <Button variant="light" className="my-3" onClick={createHandler}>
        <i className="fas fa-plus"></i>create
      </Button>
    </Col>
    <QNASearchBox />
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {qnas.map((qna) => (
        <ListForm key={qna.id} qna={qna} /> 
      ))}
    </List>
  </Row>
) : null}</div>
    
    
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