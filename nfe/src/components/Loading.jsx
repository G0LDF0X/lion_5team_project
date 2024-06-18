import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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