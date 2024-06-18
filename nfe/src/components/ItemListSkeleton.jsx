import * as React from 'react';
import { Box, Skeleton } from '@mui/material';

export default function ItemListSkeleton() {
  return (
    <Box sx={{ width: 1100 }}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
  );
}
