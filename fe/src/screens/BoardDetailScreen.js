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


function BoardDetailScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isUploader, setIsUploader] = useState(false);
  
  const { id } = useParams();
  const boardDetails = useSelector((state) => state.boardDetails);
  const { loading, error, board } = boardDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log(userInfo);

  console.log(board);
  useEffect(() => {
    if(id ===board.user_id) {
      setIsUploader(true);
    }
    dispatch(listBoardDetails(id));

  }, [dispatch, id]);
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      // DELETE BOARD
    }
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
        {loading ? 
          <Loading />
         : error ? 
          <Message variant={"danger"}>{error}</Message>
         : (
          <div>
          <Row>
            <Col md={12}>
              <Card className='my-3 p-3 rounded'>
                  <Card.Header as='h5'>{board.title}</Card.Header>
                <Link to={board.product_url}>
                </Link>
                <Card.Body>
                <Image src={board.image_url} alt={board.title} fluid />
                  <Card.Text>
                    {board.content}
                  </Card.Text>
                  <Button variant="link" href={board.product_url} target="_blank">
                  
                </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
  )}
        
          </div>
  );
}

export default BoardDetailScreen;