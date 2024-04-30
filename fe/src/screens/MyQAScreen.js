import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { listQNA } from '../actions/qnaActions'
import { Card } from 'react-bootstrap'
function MyQAScreen() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const[myQnAs, setMyQnAs] = useState([])
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const qnaList = useSelector((state) => state.qnaList)
  const { loading, error, qnas } = qnaList
  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }
    dispatch(listQNA())
    setMyQnAs(qnas.filter(qna => qna.user_id === userInfo.id))
    console.log(myQnAs)
  }, [dispatch, userInfo, navigate])

  
  return (
    <div>
      {myQnAs.map(qna => (
        <div key={qna.id}>
          <Card>
          <h1>{qna.title}</h1>
          <p>{qna.content}</p>

          </Card>
        </div>
      ))
      }

    </div>
  )
}

export default MyQAScreen
