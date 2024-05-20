import React from 'react';
import { Box, Card, CircularProgress, Typography } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import BoardForm from '../BoardForm';
import Message from '../Message';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function BoardCarousel({ loading, error, boards }) {
  return (
    <>
      <Typography variant="h5" className="my-4 font-semibold text-gray-700">
        Boards
      </Typography>
      {loading ? (
        <Box className="flex justify-center">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <Carousel responsive={responsive} infinite>
          {boards.map((board) => (
            // <Box key={board.id} className="p-2 h-full">
              <Card className="p-4 rounded-lg shadow-lg h-full flex flex-col">
                <BoardForm board={board} />
              </Card>
            // </Box>
          ))}
        </Carousel>
      )}
    </>
  );
}

export default BoardCarousel;