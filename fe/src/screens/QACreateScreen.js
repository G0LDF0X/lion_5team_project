import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import { createReview } from '../actions/reviewActions'
// import { useSelector } from 'react-redux'
import Loading from '../components/Loading'
import { createQNA } from '../actions/qnaActions'
function QACreateScreen() {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const qnaCreate = useSelector(state => state.qnaCreate)
    const { success: successCreate, qna: createdQna } = qnaCreate
    useEffect(() => {
        dispatch(createQNA())
    },[])
    useEffect(() => {
        if(successCreate) {
            navigate(`/qna/update/${createdQna.id}`)
        }
    },[successCreate, navigate, createdQna])
  return (
    <div>
      <Loading />
    </div>
  )
}

export default QACreateScreen
