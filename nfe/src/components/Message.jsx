import React from 'react';
import { Alert } from '@mui/material';

function Message({ children, variant = 'info' }) {
  return (
    <Alert severity={variant} className="my-4">
      {children}
    </Alert>
  );
}

export default Message;