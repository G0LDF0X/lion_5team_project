import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { createReply, getBoardDetails, createApply, updateBoard, deleteBoard } from "../store/actions/boardActions";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation, useParams } from "react-router-dom";
import { CardActions, IconButton, Checkbox, Card, Box } from "@mui/material";
import { FavoriteBorder, Favorite, Share } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { mainAxiosInstance } from "../api/axiosInstances";
import AddIcon from '@mui/icons-material/Add';

const StyledCheckbox = styled(Checkbox)({
  "&.Mui-checked": {
    color: "#ff6d75",
  },
});

function BoardDetailModal({ open, handleClose }) {
  const dispatch = useDispatch();
  const boardId = useParams().id;
  const [likeSuccess, setLikeSuccess] = useState(false);
  const [reply, setReply] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [replyCreated, setReplyCreated] = useState(false);
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const location = useLocation();
  const board = useSelector((state) => state.board);
  const { loading, error, replies, boardDetail } = board;
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const [showTag, setShowTag] = useState(false);
  const [applied_id, setAppliedId] = useState(0);
  const [apply, setApply] = useState("");
  const [replyToUser, setReplyToUser] = useState(null);
  
  const [editMode, setEditMode] = useState(false); 
  const [editTitle, setEditTitle] = useState(""); 
  const [editContent, setEditContent] = useState(""); 
  const [editImage, setEditImage] = useState(null);


  const sortedReplies = [];
  const repliesWithZero = replies.filter(reply => reply.replied_id === 0).sort((a, b) => a.id - b.id);
  const repliesWithNonZero = replies.filter(reply => reply.replied_id !== 0);

  repliesWithZero.forEach(replyWithZero => {
    sortedReplies.push(replyWithZero);
    repliesWithNonZero.filter(reply => reply.replied_id === replyWithZero.id).forEach(reply => sortedReplies.push(reply));
  });

  useEffect(() => {
    if (boardId) {
      dispatch(getBoardDetails(boardId));
      setLikeSuccess(false);
      if (boardDetail?.liked_by_user) {
        setIsLiked(true);
      }
      else {
        setIsLiked(false);  
      }
    }
  }, [dispatch, boardId, boardDetail?.liked_by_user, likeSuccess]);

  useEffect(() => {
    if (editMode && boardDetail?.image_url) {
      setEditImage(`${VITE_API_BASE_URL}${boardDetail.image_url}?${new Date().getTime()}`); // 캐시 방지
    }
  }, [editMode, boardDetail?.image_url]);

  const editHandler = () => {
    setEditMode(true);
    setEditTitle(boardDetail.title);
    setEditContent(boardDetail.content);
    setEditImage(boardDetail.image_url);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditImage(file);
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
    formData.append('userInfo', JSON.stringify(userInfo));

    dispatch(updateBoard({ id: boardId, board: formData }));
    setEditMode(false);
    dispatch(getBoardDetails(boardId)); 

    console.log("Edit Image:" ,editImage);
  };

  const deleteBoardHandler = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      dispatch(deleteBoard(boardId));
      window.location.href = '/board';
    }
  };


  const likeHandler = () => {
    if (userInfo) {
      if (!boardDetail.liked_by_user) {
        const res = mainAxiosInstance.put(
          `/board/like/${boardId}/`,
          {},
          {
            headers: { Authorization: `Bearer ${userInfo.access}` },
          }
        );
        if (res) {
          setLikeSuccess(true);
        }
      } else {
        const res = mainAxiosInstance.delete(
          `/board/like/${boardId}/`,
          {
            headers: { Authorization: `Bearer ${userInfo.access}` },
          }
        );
        if (res) {
          setLikeSuccess(true);
        }
      }
    }
  };

  const deleteReply = async (replyId) => {
    try {
      const response = await mainAxiosInstance.delete(`/board/reply/${replyId}/delete/`,
        {
          headers: { Authorization: `Bearer ${userInfo.access}` },
        }
      );
      console.log(response.data);
      dispatch(getBoardDetails(boardId));
    } catch (error) {
      console.error(error);
    }
  };

  const shareHandler = () => {  
    navigator.clipboard.writeText("localhost:5173"+`/board/${boardId}`);
    alert("Copied the link to clipboard: " + location.pathname);
  };

  useEffect(() => {
    if (replyCreated) {
      setReplyCreated(false);
    }
  }, [replyCreated]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (reply.trim()) {
      dispatch(createReply({ reply, boardId, applied_id }));
      setReply("");
      setReplyCreated(true);
      setAppliedId(0);
    } else {
      alert("Please enter a comment.");
    }
  };

  const submitApplyHandler = (e) => {
    e.preventDefault();
    if (apply) {
      dispatch(createApply({ apply, boardId, applied_id }));
      setApply("");
      setReplyCreated(true);
      setAppliedId(0);
    } else {
      alert("Please enter a comment.");
    }
  };

  const tagHandler = () => {
    setShowTag(!showTag);
  }

  const handleReplyClick = (id, username) => {
    setAppliedId(id);
    setReplyToUser(username);
    setApply(`@${username} `);
  }

  
  
  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="flex items-center justify-center"
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full mx-4 my-8 flex relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 p-1 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <CloseIcon />
        </button>
        {loading ? (
          <div className="w-full flex justify-center items-center p-8">
            <p>Loading...</p>
          </div>
        ) : error ? (
          <div className="w-full flex justify-center items-center p-8">
            <p className="text-red-500">{error}</p>
          </div>
        ) : boardDetail ? (
          <>
            {editMode ? (
              <form onSubmit={submitEditHandler} className="w-full p-4">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                  rows="5"
                />
                <input 
                  type="file" 
                  onChange={handleImageChange} 
                  className="w-full p-2 border rounded mb-2"
                />
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={deleteBoardHandler}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="w-2/3 relative" onClick={tagHandler}>
                  {boardDetail.image_url && (
                    <>
                      <img
                        src={`${VITE_API_BASE_URL}${boardDetail.image_url}?${new Date().getTime()}`}
                        alt={boardDetail.title}
                        className="w-full h-full object-cover"
                      />
                      {showTag && boardDetail.tags && boardDetail.tags.map((tag, index) => (
                        <div
                          key={index}
                          style={{
                            position: 'absolute',
                            top: `${tag.y}px`,
                            left: `${tag.x}px`,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            color: 'white',
                            padding: '2px 5px',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          {tag.tag}
                        </div>
                      ))}
                    </>
                  )}
                </div>
                <div className="w-1/3 p-4 flex flex-col">
                  <div className="flex items-center border-b pb-2 mb-4">
                    <div>
                      <Link to={`/users/${boardDetail.user_id}`}>
                        <p className="font-bold">{boardDetail.username}</p>
                      </Link>
                      <p className="text-sm text-gray-500">
                        {boardDetail.created_at}
                      </p>
                    </div>
                  </div>
                  <div className="flex-grow overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-2">{boardDetail.title}</h2>
                    <p
                      dangerouslySetInnerHTML={{ __html: boardDetail.content }}
                      className="mb-4"
                    ></p>
                    <CardActions disableSpacing>
                      <IconButton
                        aria-label="add to favorites"
                        onClick={likeHandler}
                      >
                        <StyledCheckbox
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                          checked={isLiked}
                        />
                      </IconButton>
                      {boardDetail.like}
                      <Box sx={{ mx: 5 }} />
                      <IconButton 
                        aria-label="share"
                        onClick={shareHandler}
                      >
                        <Share />
                      </IconButton>
                    </CardActions>
                    <h2 className="text-xl font-bold mb-2">Comments</h2>
                    {replies.length === 0 && <p>No Comments</p>}
                    {sortedReplies.map((reply, index) => (
                      <div key={index} className="border-b pb-2 mb-2">
                        <div style={{display:"flex", justifyContent:"space-between", 
                          paddingLeft: reply.replied_id !== 0 ? '30px': '0px'}}>
                        <p className="font-bold">
                          <Link to={`/users/${reply.user_id}`}>
                          {reply.username || reply.nickname}
                          </Link>
                        </p>
                        {userInfo && userInfo.id === reply.user_id && (
                            <button onClick={() => deleteReply(reply.id)}
                            style = {{color: 'red', fontSize: 'small',
                              marginLeft: 'auto'}}
                            >Delete</button>
                          )}
                        </div>
                        <p style={{paddingLeft: reply.replied_id !== 0 ? '30px': '0px'}}>{reply.content}</p>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                          <button onClick={() => handleReplyClick(reply.id, reply.username)}
                          style={{color: 'gray', fontSize: 'small', 
                          marginLeft: reply.replied_id !== 0 ? '30px': '0px',
                          marginTop: '5px'}}
                          >답글 작성</button>
                        </div>
                        {applied_id === reply.id && (
                          <form onSubmit={submitApplyHandler} className="mt-4">
                            <textarea
                              className="w-full p-2 border rounded mb-2"
                              rows="3"
                              value={apply}
                              onChange={(e) => setApply(e.target.value)}
                              placeholder="Add a reply..."
                            ></textarea>
                            <button
                              type="submit"
                              className="w-full bg-blue-500 text-white p-2 rounded"
                            >
                              Submit
                            </button>
                          </form>
                        )}
                      </div>
                    ))}
                  </div>
                  <form onSubmit={submitHandler} className="mt-4">
                    <textarea
                      className="w-full p-2 border rounded mb-2"
                      rows="3"
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      placeholder="Add a comment..."
                    ></textarea>
                    <button
                      type="submit"
                      className="w-full bg-blue-500 text-white p-2 rounded"
                    >
                      Submit
                    </button>
                    {userInfo && userInfo.id === boardDetail.user_id && (
                      <button
                        type="button"
                        onClick={editHandler}
                        className="w-full bg-blue-500 text-white p-2 rounded mt-2"
                      >
                        Edit
                      </button>
                    )}
                  </form>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full flex justify-center items-center p-8">
            <p>Board Not Found</p>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default BoardDetailModal;