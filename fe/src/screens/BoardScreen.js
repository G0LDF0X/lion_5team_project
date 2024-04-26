import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listBoards } from '../actions/boardActions'

function BoardScreen() {
  const dispatch = useDispatch()
  const boardList = useSelector(state => state.boardList)
  const { loading, error, boards } = boardList
  console.log(boards)
useEffect(() => {
  dispatch(listBoards())
}
, [dispatch]);

  return (
    <div>
      <h1>Boards</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Row>
          {boards.map((board) => (
            <Col key={board._id} sm={12} md={6} lg={4} xl={3}>
              <Card className="my-3 p-3 rounded">
                <Link to={`/board/detail/${board._id}`}>

                  {/* <Card.Img src={board.image} variant="top" /> */}
                </Link>
                <Card.Body>
                  <Link to={`/board/${board._id}`}>
                    <Card.Title as="div">
                      <strong>{board.title}</strong>
                      <strong>{board.name}</strong>
                      <strong>{board.content}</strong>
                    </Card.Title>
                  </Link>
                 
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
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