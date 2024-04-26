import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listBoards } from '../actions/boardActions'

function BoardScreen() {
  const dispatch = useDispatch()
  const boardList = useSelector(state => state.boardList)
  const { loading, error, boards } = boardList
useEffect(() => {
  dispatch(listBoards())
}
, [dispatch]);

  return (
    <div>
      <div>
        {boards && boards.map((board) => (
          <div key={board.id}>
            <h2>{board.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: board.content }} style={{ color: 'black', backgroundColor: 'white' }} />
          </div>
        ))}
      </div>
      
    </div>
  )
}
export default BoardScreen