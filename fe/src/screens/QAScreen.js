import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listQNA } from '../actions/qnaActions'

function QAScreen() {
  const dispatch = useDispatch()
  const qnaList = useSelector(state => state.qnaList)
  const { loading, error, qnas } = qnaList
useEffect(() => {
  dispatch(listQNA())
}
, [dispatch]);

  return (
    <div>
      <div>
        {qnas.map((qna) => (
          <div key={qna.id}>
            <h2>{qna.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: qna.content }} style={{ color: 'black', backgroundColor: 'white' }} />
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default QAScreen