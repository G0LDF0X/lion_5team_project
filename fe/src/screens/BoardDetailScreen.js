import React, {  useState, useEffect } from "react";
import { Row, Col, Image, ListGroup, Button, Card, Form} from "react-bootstrap";
import { Link, useParams, useNavigate} from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { getBoardDetails, createReply } from "../actions/boardActions";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { board_CREATE_REVIEW_RESET } from "../constants/boardConstants";
import { LinkContainer } from "react-router-bootstrap";
import { FaUser } from 'react-icons/fa';
import ReplyForm from "../components/BoardDetailScreen";


function BoardDetailScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [reply, setReply] = useState('');
  const [replied_id, setReplied_id] = useState(0); 
  const [isUploader, setIsUploader] = useState(false);

  const { id } = useParams(); // URL에서 id를 가져옵니다.
  const boardDetails = useSelector((state) => state.boardDetails);
  const { loading, error, board, replies } = boardDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  console.log(userInfo);

  console.log(board);
  useEffect(() => {
    if(id ===board.user_id) {
      setIsUploader(true);
    }
    dispatch(getBoardDetails(id));

  }, [dispatch, id]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (reply.trim()) {
      dispatch(createReply(id, reply, replied_id)); // 댓글을 생성합니다.
      setReply(''); // 입력 필드를 초기화합니다.
      setReplied_id(0); // 입력 필드를 초기화합니다.
      dispatch(getBoardDetails(id));
    } else {
      alert('Please enter a comment.');
    }
  };

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      // 게시글을 삭제합니다.
      navigate('/board');
    }
  }

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
        {loading ? 
          <Loading />
         : error ? 
          <Message variant={"danger"}>{error}</Message>
         : (
          <div>
          <Row>
            <Col md={12}>
              <Card className='my-3 p-3 rounded'>
            <Card.Header as='h5'>{board.title}  
            <br></br><Link to={`/users/${board.user_id}`}>
                <span><FaUser /> by {board.username}</span>
              </Link>
                  </Card.Header>
                <Link to={board.product_url}>
                </Link>
                <Card.Body>
                  {board.image_url && <Image src={board.image_url}  fluid />}
                  <Card.Text>
                    {board.content}
                  </Card.Text>
                  <Button variant="link" href={board.product_url} target="_blank">
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
              { replies.length === 0 && <Message>No Comments</Message>}
              <ListGroup variant='flush'>
                {replies.map((reply, index) => (
                  <ListGroup.Item key={index}>
                    <strong>{reply.username}</strong>
                    <p>{reply.content}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='comment'>
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    as='textarea'
                    row='3'
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </div>
  )}
        
          </div>
  );
}

export default BoardDetailScreen;