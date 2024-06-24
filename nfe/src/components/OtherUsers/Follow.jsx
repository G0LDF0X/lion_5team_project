import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardActions, CardContent, Grid, Typography, Button } from '@mui/material';
import { mainAxiosInstance } from '../../api/axiosInstances';
import { useSelector } from 'react-redux';


const OtherFollowingList = ({ userId, userDetail }) => {
  const [following, setFollowing] = useState([]);
  const userInfo = useSelector(state => state.user.userInfo);


  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await mainAxiosInstance.get(`/users/following/${userId}/`);
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = response.data;
        const promises = data.map(follow => 
          mainAxiosInstance.get(`/users/detail/${follow.followed_id}`).then(response => response.data)
        );
    
        const userData = await Promise.all(promises);
        const followingWithUserData = data.map((follow, index) => ({
          ...follow,
          user: userData[index]
        }));
        console.log("FOLLOWINGDATA:", followingWithUserData);
        setFollowing(followingWithUserData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchFollowing();
  }, [userId]);

  return (
    <Box className="container mx-auto py-8">
      <Typography variant="h4" className="mb-8 font-bold text-gray-800">
        {userDetail.nickname || userDetail.username }님의 팔로잉
      </Typography>
      {following.length === 0 ? (
          <div className="text-center bg-white shadow-md rounded-lg  mb-8 mt-8 p-4 max-w-xxl mx-auto">
                <h1 className="mb-8 mt-8 text-center text-xl text-gray-700" >팔로잉이 없습니다.</h1>
        </div>
      ) : (
   
    <div className="flex flex-wrap -mx-2 mt-10">
      {following.map((follow, index) => (
        <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                {follow.user.username}
              </h2>
              <p className="text-gray-600 mb-4">
                {follow.created_at.split('T')[0]}
              </p>
              <Link to={follow.followed_id === userInfo.id ? '/users/profile' :`/users/${follow.followed_id}`}>
                <button className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  바로가기
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
        )}
    </Box>
  );
};

export default OtherFollowingList;