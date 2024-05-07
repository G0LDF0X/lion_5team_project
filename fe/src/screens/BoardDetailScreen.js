import React, {  useState, useEffect } from "react";
import { Row, Col, Image, ListGroup, Button, Card, Form} from "react-bootstrap";
import { Link, useParams, useNavigate} from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listBoardDetails } from "../actions/boardActions";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { board_CREATE_REVIEW_RESET } from "../constants/boardConstants";
import { LinkContainer } from "react-router-bootstrap";
import { FaUser } from 'react-icons/fa';

function BoardDetailScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isUploader, setIsUploader] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  
  const { id } = useParams();
  const boardDetails = useSelector((state) => state.boardDetails);
  const { loading, error, board } = boardDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  console.log(userInfo);

  console.log(board);
  
  useEffect(() => {
    if(board && id ===board.user_id) {
      setIsUploader(true);
    }
    dispatch(listBoardDetails(id));

  }, [dispatch, id, board]);
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      // DELETE BOARD
    }
  }
  
  const submitHandler = (e) => {
    e.preventDefault();
    setComments([...comments, { user: userInfo.username, text: comment }]);
    setComment('');
  }
  // const board = board.find((p) => p._id === id)s
  return (
    <div>

{ isUploader || userInfo.isadmin ? ( 
                <>
                    <LinkContainer to={`board/update/${board.id}`}>
                        <Button variant="light" className="btn-sm">
                            <i className="fas fa-edit"></i>
                        </Button>
                    </LinkContainer>
                
                    <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(board.id)}
                    >
                        <i className="fas fa-trash"></i>
                    </Button>
                </>
            ) : null
            }

      <Link to="/" className="btn btn-light my-2">Go Back
      </Link>
      {loading ? (
  <Loading />
) : error ? (
  <Message variant={"danger"}>{error}</Message>
) : board && board.board ? (
  <div>
    <Row>
      <Col md={12}>
        <Card className='my-3 p-3 rounded'>
          <Card.Header as='h5'>{board.board.title}  
            <br></br><Link to={`/users/${board.board.user_id}`}>
              <span><FaUser /> by {board.board.username}</span>
            </Link>
          </Card.Header>
          <Link to={board.board.product_url}></Link>
          <Card.Body>
            {board.board.image_url && <Image src={board.board.image_url}  fluid />}
            <Card.Text>
              {board.content}
            </Card.Text>
            <Button variant="link" href={board.board.product_url} target="_blank">
              Visit Product
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    {/* 댓글 */}
    <Row>
      <Col md={6}>
        <h2>Comments</h2>
        {comments.length === 0 && <Message>No Comments</Message>}
        <ListGroup variant='flush'>
          {comments.map((comment, index) => (
            <ListGroup.Item key={index}>
              <strong>{comment.user}</strong>
              <p>{comment.text}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='comment'>
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as='textarea'
              row='3'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  </div>
) : null}
</div>
);
}

export default BoardDetailScreen;