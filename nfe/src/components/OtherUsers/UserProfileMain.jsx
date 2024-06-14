import React, { useState, useEffect } from 'react';
import { Button, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { BookmarkBorder as BookmarkBorderIcon, FavoriteBorder as FavoriteBorderIcon, ConfirmationNumberOutlined as ConfirmationNumberOutlinedIcon } from '@mui/icons-material';
import { mainAxiosInstance } from '../../api/axiosInstances';
import { Link, useAsyncError } from 'react-router-dom';

function UserProfileMain({ userDetail, url, userInfo }) {
    const [value, setValue] = useState(0);
    const [followerCount, setFollowerCount] = useState(0);
    const [FollowingCount, setFollowingCount] = useState(0);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);
    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowings, setShowFollowings] = useState(false);

    const fetchFollowers = async () => {
                try {
                    const response = await mainAxiosInstance.get(`/users/follower/${userDetail.id}/`, {
                    
                        headers: {
                            'Authorization': `Bearer ${userInfo.access}`
                        }
                    });
                    // const data = await response.json();
                    // 팔로워 목록을 state 변수에 저장
                    setFollowers(response.data);
                    console.log(response.data);
                    setShowFollowers(true);
                    setShowFollowings(false);
                } catch (error) {
                    console.error(`An error occurred: ${error}`);
                }
            };
            
    const fetchFollowings = async () => {
            try {
                const response = await mainAxiosInstance.get(`/users/following/${userDetail.id}/`, {
                    
                        headers: {
                            'Authorization': `Bearer ${userInfo.access}`
                        }
                    });

                    setFollowings(response.data);
                    console.log(response.data);
                    setShowFollowers(false);
                    setShowFollowings(true);
                } catch (error) {
                    console.error(`An error occurred: ${error}`);
                }
            };
           

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
            console.log(FollowingCount)
    
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
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '140px', marginBottom: '20px' }}>
                            <h6 onClick={fetchFollowers}>팔로워 {followerCount}</h6>
                            <h6 onClick={fetchFollowings}> | 팔로잉 {FollowingCount}</h6>
                        </div>
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
                        {isFollowing ? "unfollow" : "follow"}
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
                <div>
                
            </div>
            {/* 팔로워 목록 */}
                {showFollowers && followers && (
                    <div className="followers-list">
                        <ul style={{ paddingLeft: '20px' }}>
                        <h3 style={{ 
                            textAlign: 'center',
                            fontWeight: 'bold', 
                            fontSize: '24px',
                            marginBottom: '20px',
                            }}>팔로워 List</h3>
                         {followers && followers.length > 0 ? (
                            followers.map((follower) => (
                                <li key={follower.id} style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                                   
                                        {follower.follower_image_url ? (
                                        <img src={url + follower.follower_image_url} alt="Profile" className="rounded-full w-8 h-8"  style={{ width: '40px', height: '40px' }} />
                                    ) : (
                                        <img src="https://placehold.co/400" alt="Placeholder" className="rounded-full w-8 h-8"  style={{ width: '40px', height: '40px' }} />
                                    )}
                                     <Link to={`/users/${follower.follower_id}`}
                                     onClick={() => setShowFollowers(false)}>
                                    <span style={{ marginLeft: '10px', fontSize: '18px' }}>{follower.follower_nickname}</span>
                                    </Link></li>
                                    
                            ))
                        ) : (
                            <p style={{ 
                                textAlign: 'center',
                                marginBottom: '20px',
                             }}>팔로워가 없습니다.</p>
                        )
                        }
                        </ul>
                    </div>
                 
                )}
                    {/* 팔로잉 목록 */}
                    {showFollowings && followings && (
                        <div className="followings-list">
                            <ul style={{ paddingLeft: '20px' }}>

                            <h3 style={{ 
                            textAlign: 'center',
                            fontWeight: 'bold', 
                            fontSize: '24px',
                            marginBottom: '20px',
                            }}>팔로잉 List</h3>
                            {followings && followings.length > 0 ? (
                                followings.map((following) => (
                                    <li key={following.id} style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>

                                    {following.following_image_url ? (
                                        <img src={url + following.followed_image_url} alt="Profile" className="rounded-full w-8 h-8"  style={{ width: '40px', height: '40px' }} />
                                    ) : (
                                        <img src="https://placehold.co/400" alt="Placeholder" className="rounded-full w-8 h-8"  style={{ width: '40px', height: '40px' }} />
                                    )}
                                     <Link to={`/users/${following.followed_id}`}
                                     onClick={() => setShowFollowings(false)}>
                                    <span style={{ marginLeft: '10px', fontSize: '18px' }}>{following.followed_nickname}</span>
                                    </Link></li>
                                ))
                            ) : (
                                <p style={{ 
                                    textAlign: 'center',
                                    marginBottom: '20px',
                                 }}>팔로잉 하고 있는 사람이 없습니다.</p>
                            )
                        }
                            </ul>
                        </div>
                    )};
            </div>
          
    </div>
    
  
          

        
    );  
  }


export default UserProfileMain;
