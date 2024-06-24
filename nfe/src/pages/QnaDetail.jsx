import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listQnADetails, createQNAAnswer, updateQNA, deleteQnA, deleteQNAAnswer, updateQnAAnswer } from "../store/actions/qnaActions";
import { Button, List, ListItem, ListItemText, Card, CardContent, Typography } from "@mui/material";
import QnAAnswer from "../modals/QnAAnswer";


function QADetailScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const qnaDetails = useSelector((state) => state.qnaDetails);
  const { loading, error, qna } = qnaDetails;
  const [state, setState] = useState({ open: false });
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (id) {
      dispatch(listQnADetails(id));
    }
  }, [dispatch, id]);

  const answerCreateHandler = () => {
    setState({ open: true });
  };

  const handleClose = () => {
    setState({ open: false });
  };

  
  const editHandler = () => {
    if (qna.question.user_id === userInfo.id) {
      navigate(`/qna/update/${id}`);
    }
  };
  
  const deleteHandler = () => {
    if (window.confirm('정말 이 Q&A를 삭제하시겠습니까?')) {
      dispatch(deleteQnA(id))
        .then(() => {
          navigate('/qna');
        })
        .catch((error) => {
          console.error('Q&A 삭제 오류:', error);
        });
    }
  };

//Answers 수정 버튼 클릭 시
const [openEditModal, setOpenEditModal] = useState(false);
const [answerToEdit, setAnswerToEdit] = useState(null);

const editAnswerHandler = (answer) => {
  // Save the answer to edit
  
  console.log(answer);
  setAnswerToEdit(answer);
  // Open the edit modal
  setOpenEditModal(true);
};

const handleCloseEditModal = () => {
  // Close the edit modal
  setOpenEditModal(false);
};


  //Answers 삭제 버튼 클릭 시
  const deleteAnswerHandler = (answerId) => {
    if (window.confirm('정말 이 답변을 삭제하시겠습니까?')) {
      dispatch(deleteQNAAnswer(answerId))
        .then(() => {
          // dispatch(listQnADetails(id));
          navigate('/qna');
        })
        .catch((error) => {
          console.error('Answer 삭제 오류:', error);
        });
    }
  };


  const submithandler = (title, content) => {
    dispatch(createQNAAnswer({ id, title, content }))
      .then(() => {
        dispatch(listQnADetails(id));
        handleClose();
      })
      .catch((error) => {
        console.error("Q&A 답변 생성 오류:", error);
      });
  };

  return (
    <div className="container mx-auto py-8">
      <QnAAnswer open={state.open} handleClose={handleClose} questionId={id} />
      <Link to="/qna/" className="btn btn-light my-2">
        Go Back
      </Link>
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="loader"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div>
          <div className="mb-8">
            <Card className="shadow-lg rounded-lg">
              <CardContent>
                <div className="flex justify-between items-center">
                  <Typography variant="h5" component="div" className="mb-4">
                    {qna.question && qna.question.title}
                  </Typography>
                  {userInfo && qna.question && userInfo.id === qna.question.user_id && (
                    <div>
                      <Button variant="contained" color="primary" onClick={editHandler} className="ml-2">
                        수정
                      </Button>
                      <Button variant="contained" color="primary" onClick={deleteHandler} className="ml-2">
                        삭제
                      </Button>
                    </div>
                  )}
                </div>
                <Typography variant="body2" color="text.secondary">
                  <Link to={`/users/${qna.question && qna.question.user_id}/`}>
                    {qna.question && qna.question.user}
                  </Link>{" "}
                  - {qna.question && qna.question.created_at.substring(0, 10)}
                </Typography>
                {qna.question && (
                  <img
                    src={VITE_API_BASE_URL + qna.question.image_url}
                    alt="QnA"
                    className="w-full rounded-lg my-4"
                  />
                )}
                {qna.question && (
                  <Typography
                    variant="body1"
                    component="p"
                    dangerouslySetInnerHTML={{ __html: qna.question.content.replace(/<img[^>]*>/g, "") }}
                    className="text-gray-800"
                  />
                )}
              </CardContent>
            </Card>
          </div>
          <div className="text-right mb-4">
            {userInfo && (
              <>
                <Button variant="contained" color="primary" onClick={answerCreateHandler}>
                  Create Q&A Answer
                </Button>
              </>
            )}
          </div>
          <div>
            <Card className="shadow-lg rounded-lg">
              <CardContent>
                <Typography variant="h5" component="div" className="mb-4">
                  Answers
                </Typography>
                <List>
                  {/* {qna.answers && qna.answers.length > 0 ? (
                    qna.answers.map((answer) => (
                      <ListItem key={answer.id} className="mb-4">
                        <ListItemText
                          primary={
                            <Typography variant="h6" className="text-xl font-semibold">
                              {answer.title}
                            </Typography>
                          }
                          secondary={
                            <React.Fragment>
                              <Typography component="span" variant="body2" color="text.secondary">
                                <Link to={`/users/${answer.user_id}/`}>
                                  {answer.user}
                                </Link>{" "}
                                - {answer.created_at.substring(0, 10)}
                              </Typography>
                              <Typography
                                component="span"
                                variant="body1"
                                dangerouslySetInnerHTML={{ __html: answer.content }}
                                className="text-gray-800"
                              />
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No Answers
                    </Typography>
                  )} */}
                  {qna.answers && qna.answers.length > 0 ? (
                    qna.answers.map((answer) => (
                      <ListItem key={answer.id} className="mb-4">
                        <ListItemText
                          primary={
                            <Typography variant="h6" className="text-xl font-semibold">
                              {answer.title}
                              {userInfo && answer.user_id === userInfo.id && (
                                <div>
                                  <Button variant="contained" color="primary" onClick={() => editAnswerHandler(answer)} className="ml-2">
                                    수정
                                  </Button>
                                  <Button variant="contained" color="primary" onClick={() => deleteAnswerHandler(answer)} className="ml-2">
                                    삭제
                                  </Button>
                                </div>
                                
                              )}
                            </Typography>
                          }
                          
                          secondary={
                            <React.Fragment>
                              <Typography component="span" variant="body2" color="text.secondary">
                                <Link to={`/users/${answer.user_id}/`}>
                                  {answer.user}
                                </Link>{" "}
                                - {answer.created_at.substring(0, 10)}
                              </Typography>
                              <Typography
                                component="span"
                                variant="body1"
                                dangerouslySetInnerHTML={{ __html: answer.content }}
                                className="text-gray-800"
                              />
                            </React.Fragment>
                          }
                        />
                      </ListItem>

                    ))
                    
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No Answers
                    </Typography>
                  )}
                  <div>
                    
                    {answerToEdit && (
                      <QnAAnswer
                        open={openEditModal}
                        handleClose={handleCloseEditModal}
                        questionId={answerToEdit.id}
                        initialContent={answerToEdit.content}
                        initialTitle={answerToEdit.title}
                        isUpdate={true} 
                        answer={answerToEdit}
                        question={id}
                      />
                    )}
                  </div>
                </List>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
    
  );

}

export default QADetailScreen;
