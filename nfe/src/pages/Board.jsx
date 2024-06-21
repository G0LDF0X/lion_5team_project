import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { listBoards } from "../store/actions/boardActions";
import { Grid, Box, Skeleton, Pagination } from "@mui/material";
import { Visibility, FavoriteBorder } from "@mui/icons-material";

function StandardImageList() {
  const navigate = useNavigate();
  const location = useLocation();

  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board);
  const { boards, loading, totalPages, currentPage: apiCurrentPage } = board;

  const [currentPage, setCurrentPage] = useState(apiCurrentPage || 1);

  useEffect(() => {
    dispatch(listBoards({ page: currentPage }));
  }, [navigate, currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    navigate(`?page=${value}`);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 p-4">
        {loading ? (
          <Grid container wrap="nowrap" direction="column">
            {Array.from(new Array(3)).map((_, rowIndex) => (
              <Grid container key={rowIndex} wrap="nowrap">
                {Array.from(new Array(3)).map((_, colIndex) => (
                  <Box key={colIndex} sx={{ width: 490, marginRight: 0.5, my: 5 }}>
                    <Skeleton variant="rectangular" width={490} height={490} />
                  </Box>
                ))}
              </Grid>
            ))}
          </Grid>
        ) : (
          boards
            .slice()
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((board) => (
              <Link
                key={board.id}
                to={`/board/${board.id}`}
                state={{ background: location }}
              >
                <div
                  key={board.id}
                  className="relative w-full h-full cursor-pointer"
                >
                  <img
                    src={`${VITE_API_BASE_URL}${board.image_url}`}
                    alt={board.title}
                    className="w-full h-full object-cover rounded shadow-lg"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-lg font-bold mb-2">
                      {board.title}
                    </p>
                    <div className="flex items-center text-white text-lg font-bold mb-2">
                      <Visibility className="mr-1" />
                      {board.show}
                    </div>
                    <div className="flex items-center text-white text-lg font-bold">
                      <FavoriteBorder className="mr-1" />
                      {board.like}
                    </div>
                  </div>
                </div>
              </Link>
            ))
        )}
      </div>
      <Pagination
        count={totalPages} // 총 페이지 수
        page={parseInt(currentPage, 10)} // 현재 페이지를 currentPage로 수정
        onChange={handlePageChange} // 페이지 변경 핸들러
        sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}
      />
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
