import React, { useEffect, useState } from 'react';
import { mainAxiosInstance } from "../../api/axiosInstances";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Button, Box } from '@mui/material';

function CreateReview() {
  const [unreviewedItems, setUnreviewedItems] = useState([]);
  const [search, setSearch] = useState('');
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
const handleChange = (e) => {
  setSearch(e.target.value);
}
  return (
    <div className="flex justify-center py-4">
      <div className="w-full max-w-2xl">
      <Box style={{backgroundColor: '#FFCCCC', borderRadius: '10px', padding: '15px', margin: '5px'}}>
          <p style={{fontSize: 'medium'}}>❗️ 환불한 제품은 리뷰 작성이 불가능합니다.</p>
      </Box>
        <form className="flex">
          <input
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={handleChange}
            value = {search}
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
         
        </form>
        {formattedItems
        .filter((item) => { item.name.toLowerCase().includes(search.toLowerCase()) })
        .map(item => (
          <Box display="flex" alignItems="center" justifyContent="space-between" key={item.id}>
            <Box display="flex" alignItems="center">
              <img className="w-20 h-20 object-cover mr-4" src={VITE_API_BASE_URL + item.image_url} style={{ margin: '10px' }} />
              <Box display="flex" flexDirection="column">
                <p style={{fontSize: "large", fontWeight: "bold"}}>{item.name}</p>
                <p style={{fontSize: "small"}}>{item.qty}개 | {item.total_price}\</p>
                <p style={{fontSize: "small", color: "gray"}}>{item.created_at}</p>
              </Box>
            </Box>
            <Link to={`/items/detail/${item.item_id}`}>
              <Button variant="outlined">Go to Review</Button>
            </Link>
          </Box>
        ))}
      </div>
    </div>
  );
}

export default CreateReview;