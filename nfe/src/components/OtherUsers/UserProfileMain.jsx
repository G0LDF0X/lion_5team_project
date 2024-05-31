import React, { useState, useEffect } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { BookmarkBorder as BookmarkBorderIcon, FavoriteBorder as FavoriteBorderIcon, ConfirmationNumberOutlined as ConfirmationNumberOutlinedIcon } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import {mainAxiosInstance} from "../../api/axiosInstances";

function UserProfileMain({userDetail, url}) {

    const [value, setValue] = useState(0);
    const [isFollowing, setIsFollowing] = useState(false);
    // const token = useSelector((state) => state.userLogin?.userInfo?.access);
    const [userData, setUserData] = useState(null);

    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const userResponse = await mainAxiosInstance.get(`/users/${userDetail.id}/`);
          const followingResponse = await mainAxiosInstance.get(`/users/following/${userDetail.id}/`);
          const followerResponse = await mainAxiosInstance.get(`/users/follower/${userDetail.id}/`);

          const followStatusResponse = await mainAxiosInstance.get(`/users/follow/${userDetail.id}/`, {
            headers: {
              'Authorization': `Bearer ${userDetail.access}`,
            },
          });

          if (!userResponse.ok) {
              throw new Error(`HTTP error! status: ${userResponse.status}`);
          }
          if (!followerResponse.ok) {
              throw new Error(`HTTP error! status: ${followerResponse.status}`);
          }
          if (!followingResponse.ok) {
              throw new Error(`HTTP error! status: ${followingResponse.status}`);
          }

          if (!followStatusResponse.ok) {
            throw new Error(`HTTP error! status: ${followStatusResponse.status}`);
          }

          const userData = await userResponse.json();
          // const followerData = await followerResponse.json();
          // const followingData = await followingResponse.json();
          const followStatusData = await followStatusResponse.json();
          
          setUserData(userData);
          setIsFollowing(followStatusData.follow_exists); // Assuming the response contains a boolean 'isFollowing' field
        } 
            catch (error) {
          console.error('Failed to fetch user data:', error);
        }

      };
  
      fetchData();
    }, [userDetail.id]);
    

    const handleFollow = async () => {

      try {
          const response = await mainAxiosInstance.post(`/users/follow/${userDetail.id}/`, {}, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userDetail.access}`
          },
        });
  
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }
  
        // const responseData = await response.json();
  
        if (response.data.success) {
          setIsFollowing(!isFollowing);
          // Update userDetail follower count if needed
          setUserData((prevState) => ({
            ...prevState,
            follower: isFollowing ? prevState.follower - 1 : prevState.follower + 1,
          }));
        }
      } catch (error) {
        console.error('Failed to follow:', error);
      }
    };

  return (
    <div className="flex justify-center mt-6">
    <div className="bg-white shadow-md rounded-lg w-full max-w-2xl">
      <div className="flex justify-center mt-4">
        <div className="flex flex-col items-center">
          {userDetail?.image_url ? (
            <img src={url + userDetail.image_url} alt="Profile" className="rounded-full w-32 h-32" />
          ) : (
            <img src="https://placehold.co/400" alt="Placeholder" className="rounded-full w-32 h-32" />
          )}
          <h4 className="mt-4">{userDetail?.nickname || userDetail?.username}</h4>
          <h6>팔로워 {userDetail?.follower} | 팔로잉 {userDetail?.following}</h6>
          <button style={{backgroundColor: 'rgb(255, 192, 203)', padding: '10px 20px', borderRadius: '20px', marginTop: '20px'}} onClick={() => handleFollow(userDetail)}>
            {isFollowing ? '팔로잉 중' : '팔로우'}
          </button>
        </div>
      </div>
      <div className="mt-6 mb-4 text-center">
        <div className="w-full">
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
          >
            <BottomNavigationAction label="스크랩북" icon={<BookmarkBorderIcon />} />
            <BottomNavigationAction label="좋아요" icon={<FavoriteBorderIcon />} />
            <BottomNavigationAction label="내 쿠폰" icon={<ConfirmationNumberOutlinedIcon />} />
          </BottomNavigation>
        </div>
      </div>
    </div>
  </div>
  )
}

export default UserProfileMain
