import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listQnADetails, createQNAAnswer } from "../store/actions/qnaActions";
// import { QNA_ANSWER_CREATE_RESET } from "../store/constants/qnaConstants";
import { Snackbar, Button, List, ListItem, ListItemText, Card, CardContent, Typography } from "@mui/material";

function QADetailScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const qnaDetails = useSelector((state) => state.qnaDetails);
  const { loading, error, qna, answers } = qnaDetails;
  const qnaAnswerCreate = useSelector((state) => state.qnaAnswerCreate);
  const { success: successCreate, qna: createdQna } = qnaAnswerCreate;
  const [state, setState] = useState({ open: false });
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const answerCreateHandler = () => {
    dispatch(createQNAAnswer(qna.id));
    setState({ open: true });
  };

  const handleClose = () => {
    setState({ open: false });
  };

  useEffect(() => {
    dispatch(listQnADetails(id));
    if (successCreate) {
      dispatch({ type: QNA_ANSWER_CREATE_RESET });
      navigate(`/qna/answer/update/${createdQna.id}/`);
    }
  }, [dispatch, id, navigate, successCreate, createdQna]);

  return (
    <div className="container mx-auto py-8">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        open={state.open}
        onClose={handleClose}
        message="Q&A Answer Created"
      />
      <Link to="/" className="btn btn-light my-2">
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
                <Typography variant="h5" component="div" className="mb-4">
                  {qna.question.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <Link to={`/users/${qna.user_id}/`}>{qna.user}</Link> - {qna.question.created_at && qna.question.created_at.substring(0, 10)}
                </Typography>
                {qna.question.image_url && (
                  <img src={VITE_API_BASE_URL+qna.question.image_url} alt="QnA" className="w-full rounded-lg my-4" />
                )}
                <Typography variant="body1" component="p" dangerouslySetInnerHTML={{ __html: qna.question.content }} className="text-gray-800" />
              </CardContent>
            </Card>
          </div>

          <div className="text-right mb-4">
            {userInfo && userInfo.is_staff && (
              <Button variant="contained" color="primary" onClick={answerCreateHandler}>
                Create Q&A Answer
              </Button>
            )}
          </div>

          <div>
            <Card className="shadow-lg rounded-lg">
              <CardContent>
                <Typography variant="h5" component="div" className="mb-4">
                  Answers
                </Typography>
                <List>
                  {qna.answers && qna.answers.length > 0 ? (
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
                                <Link to={`/users/${answer.user_id}/`}>{answer.user}</Link> - {answer.created_at.substring(0, 10)}
                              </Typography>
                              <Typography component="span" variant="body1" dangerouslySetInnerHTML={{ __html: answer.content }} className="text-gray-800" />
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