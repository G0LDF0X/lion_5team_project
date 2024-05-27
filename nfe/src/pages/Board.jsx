import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listBoards, getBoardDetails } from '../store/actions/boardActions';
import { Grid, Box, Skeleton } from '@mui/material';
import  BoardDetailModal  from '../modals/BoardDetail';
import { mainAxiosInstance } from '../api/axiosInstances';



function StandardImageList() {
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board);
  const { boards, loading } = board;
  const useShow = (id) => {
    mainAxiosInstance.post(`/board/detail/${id}/add_show/`);
  };
  useEffect(() => {
    dispatch(listBoards());
  }, [dispatch]);
  const handleOpenModal = (id) => {
    setSelectedBoardId(id);
    dispatch(getBoardDetails(id));
    setModalOpen(true);
    useShow(id);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {loading ? (
         <Grid container wrap="nowrap">
         {Array.from(new Array(3)).map((_, index) => (
           <Box key={index} sx={{ width: 490, marginRight: 0.5, my: 5 }}>
               <Skeleton variant="rectangular" width={490} height={490} />
            </Box>
         ))}
       </Grid>
      ) : (
        boards.map((board) => (
          <div key={board.id} className="relative w-full h-full cursor-pointer" onClick={() => handleOpenModal(board.id)}>
            <img
              src={`${VITE_API_BASE_URL}${board.image_url}`}
              alt={board.title}
              className="w-full h-full object-cover rounded shadow-lg"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-50">
              <p className="text-white text-lg font-bold">{board.title}</p>
            </div>
          </div>
        ))
      )}
       <BoardDetailModal open={modalOpen} handleClose={handleCloseModal} boardId={selectedBoardId} />
    </div>
  );
}

function BoardPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Board Page</h1>
      <StandardImageList />
    </div>
  );
}

export default BoardPage;