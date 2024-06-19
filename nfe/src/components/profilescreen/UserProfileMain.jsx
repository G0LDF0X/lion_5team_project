import React, { useState, useEffect } from 'react';
import { BottomNavigationAction, BottomNavigation } from '@mui/material';
import { BookmarkBorder, FavoriteBorder, ConfirmationNumberOutlined } from '@mui/icons-material';
import { mainAxiosInstance } from '../../api/axiosInstances';

function UserProfileMain({ userInfo, user, url}) {
  const [value, setValue] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await mainAxiosInstance.get(`/users/follow/${user.id}/`, {
            
                headers: {
                    'Authorization': `Bearer ${userInfo.access}`
                }
            });
            setFollowerCount(response.data.followers_count);  
            setFollowingCount(response.data.following_count);
              
        } catch (error) {
            console.error(`An error occurred: ${error}`);
        }
    };
    if (user.id && userInfo.access) {
        fetchData();
        console.log(followerCount)
        console.log(followingCount)
    }
  }, [user.id, userInfo.access]);

  return (
    <div className="flex justify-center mt-6">
      <div className="bg-white shadow-md rounded-lg w-full max-w-2xl">
        <div className="flex justify-center mt-4">
          <div className="flex flex-col items-center">
            {user?.image_url ? (
              <img src={url+user.image_url} alt="Profile" className="rounded-full w-32 h-32" />
            ) : (
              <img src="https://placehold.co/400" alt="Placeholder" className="rounded-full w-32 h-32" />
            )}
            <h4 className="mt-4">{userInfo?.nickname || userInfo?.username}</h4>
            <h6>팔로워 {followerCount} | 팔로잉 {followingCount}</h6>
          </div>
        </div>
        <div className="mt-6 mb-4 text-center">
          <div className="w-full">              
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileMain;