import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listQnADetails, createQNAAnswer, updateQNA, deleteQnA } from "../store/actions/qnaActions";
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

  const [editMode, setEditMode] = useState(false); 
  const [editTitle, setEditTitle] = useState(""); 
  const [editContent, setEditContent] = useState(""); 
  const [editImage, setEditImage] = useState(null);

  const answerCreateHandler = () => {
    setState({ open: true });
  };

  function submithandler() {
    console.log(id);
    dispatch(createQNAAnswer({ id: id, content: editorData, title: title }));
    handleClose();
  }

  const handleClose = () => {
    setState({ open: false });
  };

  useEffect(() => {
    dispatch(listQnADetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (editMode && qna?.question?.image_url) {
      setEditImage(`${VITE_API_BASE_URL}${qna.question.image_url}?${new Date().getTime()}`);
    }
  }, [editMode, qna?.question?.image_url, VITE_API_BASE_URL]);

  const editHandler = () => {
    setEditMode(true);
    setEditTitle(qna.question.title);
    setEditContent(qna.question.content);
    setEditImage(qna.question.image_url);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditImage(file);
  };
  const deleteHandler = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      dispatch(deleteQnA(qnaId));
      window.location.href = "/qna";
    }
  };
    
  const submitEditHandler = async (e) => {
    e.preventDefault();
    if (!editTitle || !editContent) {
      alert("Title and content must not be empty.");
      return;
    }

    const formData = new FormData();
    formData.append('title', editTitle);
    formData.append('content', editContent);
    if (editImage) {
      formData.append('image', editImage);
    }

    // userInfo 객체를 추가
    formData.append('userInfo', JSON.stringify({ id: userInfo.id }));

    await dispatch(updateQNA({ id, userqna: formData }));
    setEditMode(false);
    dispatch(listQnADetails(id));
  };

  return (
    <div className="container mx-auto py-8">
      <QnAAnswer open={state.open} handleClose={handleClose} submithandler={submithandler} />
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
          {editMode ? (
            <form onSubmit={submitEditHandler} className="my-4">
              <div className="mb-4">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Title"
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  placeholder="Content"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  rows={5}
                />
              </div>
              <div className="mb-4">
                {editImage && (
                  <img
                    src={typeof editImage === 'string' ? editImage : URL.createObjectURL(editImage)}
                    alt="Preview"
                    className="w-full rounded-lg mb-2"
                    style={{ maxHeight: '300px' }}
                  />
                )}
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2">
                  Save
                </button>
                <button type="button" onClick={() => setEditMode(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md">
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className="mb-8">
                <Card className="shadow-lg rounded-lg">
                  <CardContent>
                    <Typography variant="h5" component="div" className="mb-4">
                      {qna.question && qna.question.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <Link to={`/users/${qna.question && qna.question.user_id}/`}>{qna.question && qna.question.user}</Link> - {qna.question && qna.question.created_at.substring(0, 10)}
                    </Typography>
                    {qna.question && (
                      <img src={VITE_API_BASE_URL + qna.question.image_url} alt="QnA" className="w-full rounded-lg my-4" />
                    )}
                    {qna.question && (
                      <Typography variant="body1" component="p" dangerouslySetInnerHTML={{ __html: qna.question.content.replace(/<img[^>]*>/g, "")  }} className="text-gray-800" />
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
                    {qna.question && userInfo.id === qna.question.user_id && (
                      <Button variant="contained" color="secondary" onClick={editHandler} className="ml-2" >
                        수정
                      </Button>
                    )}
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
      )}
    </div>
  );
}

export default QADetailScreen;
