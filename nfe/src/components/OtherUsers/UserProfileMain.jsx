import React, { useState, useEffect } from 'react';
import { Button, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { BookmarkBorder as BookmarkBorderIcon, FavoriteBorder as FavoriteBorderIcon, ConfirmationNumberOutlined as ConfirmationNumberOutlinedIcon } from '@mui/icons-material';
import { mainAxiosInstance } from '../../api/axiosInstances';

function UserProfileMain({ userDetail, url, userInfo }) {
    const [value, setValue] = useState(0);
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [isFollowing, setIsFollowing] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await mainAxiosInstance.get(`/users/follow/${userDetail.id}/`, {
                
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
        if (userDetail.id && userInfo.access) {
            fetchData();
            console.log(followerCount)
            console.log(followingCount)
        }
      
        const checkFollowStatus = async () => {
            try {
                const response = await mainAxiosInstance.get(`/users/follow/${userDetail.id}/`, {
                
                    headers: {
                        'Authorization': `Bearer ${userInfo.access}`
                    }
                });
    
                if (response.status === 201) {
                    console.log('팔로우 상태 확인');

                    if (response.data.follow_exists) {
                        setIsFollowing(true);

                    } else {
                        setIsFollowing(false);
                    }
                }
            } catch (error) {
                console.error("팔로우 상태 확인 실패:", error);
            }
        };
        if (userDetail.id && userInfo.access) {
            checkFollowStatus();
        }
    }, [userDetail.id, userInfo.access]);

    const handleFollow = async () => {
        try {
            console.log('userDetail.id:', userDetail.id);
            console.log('userInfo.access:', userInfo.access);
            const response = await mainAxiosInstance.post(`/users/follow/${userDetail.id}/`,{}, {
                        headers: {
                        'Authorization': `Bearer ${userInfo.access}`
                    }
                });
                console.log('response:', response);
                if (response.status === 201) {
                    setIsFollowing(true);

                    setFollowerCount(followerCount + 1);

                    
                }
            
        } catch (error) {
            console.error('팔로우 실패:', error);
        }
  };

    const handleUnfollow = async () => {
        try {
            console.log('userDetail.id:', userDetail.id);
            console.log('userInfo.access:', userInfo.access);
            const response = await mainAxiosInstance.delete(`/users/follow/${userDetail.id}/`, {
                    headers: {
                        'Authorization': `Bearer ${userInfo.access}`
                }
            });
            console.log('response:', response);
            if (response.status === 201) {
                setIsFollowing(false);

                setFollowerCount(followerCount - 1);
                
            }
            
        } catch (error) {
            console.error('언팔로우 실패:', error);
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
                        <h6>팔로워 {followerCount} | 팔로잉 {followingCount}</h6>
                        <Button 
                        variant="contained" 
                        color={isFollowing ? "secondary" : "primary"} 
                        onClick={isFollowing ? handleUnfollow : handleFollow}
                        className="mt-5"
                        style={{
                            backgroundColor: isFollowing ? '#E35959' : '#FFB6C1', 
                            color: isFollowing ? 'white': 'black'
                        }}
                    >
                        {isFollowing ? "언팔로우" : "팔로우"}
                        </Button>
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
    );
  }


export default UserProfileMain;