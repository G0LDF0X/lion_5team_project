import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listBoards } from "../actions/boardActions";
import { LinkContainer } from "react-router-bootstrap";
import { createBoard } from "../actions/boardActions";
import { BOARD_CREATE_RESET } from "../constants/boardConstants";

function BoardScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boardList = useSelector((state) => state.boardList);
  const { loading, error, boards } = boardList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(userInfo);
  const boardCreate = useSelector((state) => state.boardCreate);
  const { loading:loadingCreate, error: errorCreate, success: successCreate, board: createdBoard} = boardCreate;
  console.log(boards);
  const createHandler = () => { 
    dispatch(createBoard());
  }
  useEffect(() => {
    dispatch(listBoards());
    if (successCreate) {
      dispatch({ type: BOARD_CREATE_RESET });
      navigate(`/board/update/${createdBoard.id}`);
    }
  }, [dispatch , successCreate, navigate, createdBoard]);

  return (
    <div>
      <h1>Boards</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : userInfo ? (
        <Row>
          <Col className="text-right">
          <Button variant="light" className="my-3" onclicke={createBoard}>
            <i className="fas fa-plus"></i>create
          </Button>
          </Col>
          {boards.map((board) => (
            <Col key={board.id} sm={12} md={6} lg={4} xl={3}>
              <Card className="my-3 p-3 rounded">
                <Link to={`/board/detail/${board.id}`}>
                  {/* <Card.Img src={board.image} variant="top" /> */}
                </Link>
                <Card.Body>
                  <Link to={`/board/detail/${board.id}`}>
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
      ) : (
        <Row>
          {boards.map((board) => (
            <Col key={board.id} sm={12} md={6} lg={4} xl={3}>
              <Card className="my-3 p-3 rounded">
                <Link to={`/board/detail/${board.id}`}>
                  <Card.Img src={board.image_url} variant="top" />
                </Link>
                <Card.Body>
                  <Link to={`/board/${board.id}`}>
                    <Card.Title as="div">
                      <strong>{board.title}</strong>
                    </Card.Title>
                  </Link>
                  <Card.Text as="div">
                    <div className="my-3">{board.like}</div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <div>
        {/* {boards && boards.map((board) => (
          <div key={board.id}>
            <h2>{board.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: board.content }} style={{ color: 'black', backgroundColor: 'white' }} />
          </div>
        ))} */}
      </div>
    </div>
  );
}
export default BoardScreen;