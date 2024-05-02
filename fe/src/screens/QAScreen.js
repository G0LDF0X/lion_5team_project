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
    // console.log(userInfo)
  }

useEffect(() => {
  dispatch(listQNA(userInfo))
  if (successCreate) {
    dispatch({ type: QNA_CREATE_RESET })
    navigate(`/qna/update/${createdQNA.id}`)
  }
}
, [dispatch, successCreate, navigate, createdQNA]);

  return (<div>
        <h1>Q&A</h1>
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h3>{error}</h3>
        ) : userInfo? (
          <Row>
             <Col className="text-right">
          <Button variant="light" className="my-3" onClick={createHandler}>
            <i className="fas fa-plus"></i>create
          </Button>
          </Col>
          <QNASearchBox />
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {qnas.map((qna) => (
              <ListForm key={qna.id} qna={qna} /> 
            ))}
            </List>
          </Row>
        ) : (
      <Row>
        {qnas.map((qna) => (
          <Col key={qna.id} sm={12} md={6} lg={4} xl={3}>
            <Card className='my-3 p-3 rounded'>
              <Card.Body>
                <Card.Title as='div'>
                  <strong>{qna.title}</strong>
                </Card.Title>
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