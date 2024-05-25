import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { createReply } from '../store/actions/boardActions';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close'; 
function BoardDetailModal({ open, handleClose, boardId }) {
  const dispatch = useDispatch();
  const [reply, setReply] = useState('');
  const [replyCreated, setReplyCreated] = useState(false);
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
  const boardDetails = useSelector((state) => state.boardDetails);
  const { loading, error, board, replies } = boardDetails;
  
  
  useEffect(() => {
   
    if (replyCreated) {
      setReplyCreated(false);
    }
  }, [  replyCreated]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (reply.trim()) {
      dispatch(createReply(boardId, reply, 0));
      setReply('');
      setReplyCreated(true);
    } else {
      alert('Please enter a comment.');
    }
  };

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
        ) : board.board?(
          <>
            <div className="w-2/3">
              {board.board.image_url && (
                <img
                  src={VITE_API_BASE_URL+board.board.image_url}
                  alt={board.board.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="w-1/3 p-4 flex flex-col">
              <div className="flex items-center border-b pb-2 mb-4">
                <div>
                  <p className="font-bold">{board.board.username}</p>
                  <p className="text-sm text-gray-500">{board.board.createdAt}</p>
                </div>
              </div>
              <div className="flex-grow overflow-y-auto">
                <p dangerouslySetInnerHTML={{ __html: board.board.content }} className="text-2xl font-bold mb-2"></p>
                <h2 className="text-xl font-bold mb-2">댓글</h2>
                {replies.length === 0 && <p>No Comments</p>}
                {replies.map((reply, index) => (
                  <div key={index} className="border-b pb-2 mb-2">
                    <p className="font-bold">{reply.username || reply.nickname}</p>
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
        ):(
            <div className="w-full flex justify-center items-center p-8">
            <p>Board Not Found</p>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default BoardDetailModal;