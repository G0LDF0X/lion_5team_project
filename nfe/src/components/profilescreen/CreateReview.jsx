import React, { useEffect, useState } from 'react';
import { mainAxiosInstance } from "../../api/axiosInstances";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function CreateReview() {
  const [unreviewedItems, setUnreviewedItems] = useState([]);
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const formattedItems = unreviewedItems.map(item => {
    const date = new Date(item.created_at);
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    return { ...item, created_at: `${formattedDate} ${formattedTime}` };
  });

  useEffect(() => {
    mainAxiosInstance.get(`/users/check_review/${userInfo.id}/`)
    .then((response) => {
      setUnreviewedItems(response.data);
    });
  }, []);

  return (
    <div className="flex justify-center py-4">
      <div className="w-full max-w-2xl">
        {/* <form className="flex">
          <input
            type="search"
            placeholder="Search"
            aria-label="Search"
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-r-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Search
          </button>
        </form> */}
        {formattedItems.map(item => (
          <Box display="flex" alignItems="center" justifyContent="space-between" key={item.id}>
            <Box display="flex" alignItems="center">
              <img className="w-20 h-20 object-cover mr-4" src={VITE_API_BASE_URL + item.image_url} style={{ margin: '10px' }} />
              <Box display="flex" flexDirection="column">
                <p style={{fontSize: "large", fontWeight: "bold"}}>{item.name}</p>
                <p style={{fontSize: "small"}}>{item.qty}개 | {item.total_price}\</p>
                <p style={{fontSize: "small", color: "gray"}}>{item.created_at}</p>
              </Box>
            </Box>
            <Link to={`/items/detail/${item.id}`}>
              <Button variant="outlined">Go to Review</Button>
            </Link>
          </Box>
        ))}
      </div>
    </div>
  );
}

export default CreateReview;