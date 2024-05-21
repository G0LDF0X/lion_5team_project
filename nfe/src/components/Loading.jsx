import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

function Loading({ message = 'Loading...' }) {
  return (
    <Box className="flex flex-col items-center justify-center h-full">
      <CircularProgress />
      <Typography variant="body1" className="mt-2">
        {message}
      </Typography>
    </Box>
  );
}

export default Loading;