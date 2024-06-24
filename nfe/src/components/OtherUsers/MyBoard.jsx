import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { mainAxiosInstance } from '../../api/axiosInstances';
import { Card, CardContent, CardMedia, Grid, Typography, Container } from '@mui/material';
import BoardDetailModal from '../../modals/BoardDetail';
import { getBoardDetails } from '../../store/actions/boardActions';
import useShow from '../../hook/useShow';
import { Link } from 'react-router-dom';
const MyBoard = ({ userId, url, userDetail }) => {
  const [myBoards, setMyBoards] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const dispatch = useDispatch();
  const handleCloseModal = () => {
    setModalOpen(false);
  }
  const handleOpenModal = (id) => {
    setSelectedBoardId(id);
    dispatch(getBoardDetails(id));
    setModalOpen(true);
    
  }
  useShow(selectedBoardId);
  useEffect(() => {
    mainAxiosInstance.get(`/users/${userId}/board/`)
      .then(response => {
        if (!response.ok) {
        setMyBoards(response.data)
        }
      })
  }, [userId]);

  return (
    <div className="container mx-auto p-4">
      <div className="container mx-auto py-8">
          <Typography variant="h4" className="mb-8 font-bold text-gray-800">
            {userDetail.nickname || userDetail.username }의 게시글
          </Typography>
                
    {myBoards.length === 0 ? (
            <div className="w-full p-4 text-center">
              <div className="text-center bg-white shadow-md rounded-lg  mb-5 mt-5 p-4 max-w-xxl mx-auto">
                <h1 className="mb-8 mt-8 text-center text-xl text-gray-700">
                  작성한 게시물이 없습니다.
                </h1>
            </div>
            </div>
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {myBoards.map((board) => (
              <Link key={board.id} to={`/board/${board.id}`}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img className="w-full h-48 object-cover" src={VITE_API_BASE_URL + board.image_url} alt={board.title} />
                  <div className="p-4">
                      <h5 className="text-lg font-semibold mb-2">
                        {board.title.length > 20
                          ? `${board.title.substring(0, 20)}...`
                          : board.title}
                      </h5>
                    <p className="text-gray-700">
                      {board.content.length > 30
                        ? `${board.content.substring(0, 30)}...`
                        : board.content}
                    </p>
                  </div>
                </div>
                </Link>
              ))}
              </div>
            )}
            </div>
            </div>
    
  );
};

export default MyBoard;