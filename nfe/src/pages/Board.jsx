import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { listBoards } from '../store/actions/boardActions';
import { Grid, Box, Skeleton } from '@mui/material';



function StandardImageList() {
  const navigate = useNavigate();
  const location = useLocation();

  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board);
  const { boards, loading } = board;
  
  useEffect(() => {
    dispatch(listBoards());
    console.log(location)
  }, [navigate]);

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
          <Link key={board.id} to={`/board/${board.id}`} state={{ background: location }}>
          <div key={board.id} className="relative w-full h-full cursor-pointer" >
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
          </Link>
        ))
      )}

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