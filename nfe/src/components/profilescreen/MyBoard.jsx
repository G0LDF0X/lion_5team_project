import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { mainAxiosInstance } from "../../api/axiosInstances";
import { Typography} from '@mui/material';

const MyBoard = ({ userInfo }) => {
  const [MyBoards, setMyBoards] = useState([]);
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    mainAxiosInstance.get('/users/profile/myboard/', {
      headers: {
        'Authorization': `Bearer ${userInfo.access}`
      }
    })
      .then(response => {
        setMyBoards(response.data);
      })
      .catch(error => console.error('Error:', error));
   
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="container mx-auto py-8">
      <Typography variant="h4" className="mb-8 font-bold text-gray-800">
        나의 게시물
      </Typography>
      {MyBoards.length === 0 ? (
        <div className="w-full p-4 text-center">
          <h1 className="text-center text-xl font-bold text-gray-700">
            등록된 게시물이 없습니다.
          </h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {MyBoards.map((board) => (
              <Link to={`/board/${board.id}`}>
          <div key={board.id} className="bg-white rounded-lg shadow-md overflow-hidden">
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