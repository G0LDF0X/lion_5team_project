import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { createReply, getBoardDetails } from "../store/actions/boardActions";
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
      dispatch(createReply({ reply, boardId }));
      setReply("");
      setReplyCreated(true);
    } else {
      alert("Please enter a comment.");
    }
  };

  const tagHandler = () => {
    setShowTag(!showTag);
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
            <div className="w-2/3 relative" onClick={tagHandler}>
              {boardDetail.image_url && (
                <>
                  <img
                    src={`${VITE_API_BASE_URL}${boardDetail.image_url}`}
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
                <p
                  dangerouslySetInnerHTML={{ __html: boardDetail.content }}
                  className="text-2xl font-bold mb-2"
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
                {replies.map((reply, index) => (
                  <div key={index} className="border-b pb-2 mb-2">
                    <p className="font-bold">
                      <Link to={`/users/${reply.user_id}`}>
                      {reply.username || reply.nickname}
                      </Link>
                    </p>
                    <p>{reply.content}</p>
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
              </form>
            </div>
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
