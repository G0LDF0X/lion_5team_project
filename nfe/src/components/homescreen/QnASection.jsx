import React from 'react';
import { Box, Card, CircularProgress, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Message from '../Message';

function QnASection({ loading, error, qnas }) {
  return (
    <>
      <Box className="flex items-center mt-8">
        <svg width="24" height="24" viewBox="0 0 24 24" className="text-pink-500">
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-2h-2v2zm2-4h-2V7h2v6z"
          />
        </svg>
        <Typography variant="h5" className="ml-2 font-semibold text-gray-700">
          Q&A
        </Typography>
      </Box>
      {loading ? (
        <Box className="flex justify-center mt-4">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {qnas.slice(0, 4).map((qna) => (
            <Card
              key={qna.id}
              className="p-4 rounded-lg shadow-lg border border-gray-200"
            >
              <Link to={`/qna/detail/${qna.id}`} className="no-underline">
                <Typography variant="h6" className="font-bold text-gray-800">
                  {qna.title}
                </Typography>
                <Typography variant="body2" className="text-gray-600">
                  <span
                    className="my-3"
                    dangerouslySetInnerHTML={{ __html: qna.content }}
                  />
                </Typography>
              </Link>
            </Card>
          ))}
        </Box>
      )}
    </>
  );
}

export default QnASection;