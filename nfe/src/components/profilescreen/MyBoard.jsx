import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { mainAxiosInstance } from "../../api/axiosInstances";
const MyBoard = ({ userInfo }) => {
  const [MyBoards, setMyBoards] = useState([]);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {MyBoards.map((board) => (
          <div key={board.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img className="w-full h-48 object-cover" src={board.image_url} alt={board.title} />
            <div className="p-4">
              <Link to={`/board/detail/${board.id}`}>
                <h5 className="text-lg font-semibold mb-2">
                  {board.title.length > 20
                    ? `${board.title.substring(0, 20)}...`
                    : board.title}
                </h5>
              </Link>
              <p className="text-gray-700">
                {board.content.length > 30
                  ? `${board.content.substring(0, 30)}...`
                  : board.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBoard;