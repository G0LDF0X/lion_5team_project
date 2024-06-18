import React, { useState, useEffect } from 'react';
import { mainAxiosInstance } from '../../api/axiosInstances';
import { Link  } from 'react-router-dom';

function UserProfileMain({ userInfo, user, url}) {
  const [value, setValue] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowings, setShowFollowings] = useState(false);
  const [hoverFollowers, setHoverFollowers] = useState(false);
  const [hoverFollowings, setHoverFollowings] = useState(false);
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 


  const fetchFollowers = async () => {
    try {
        const response = await mainAxiosInstance.get(`/users/follower/${user.id}/`, {
        
            headers: {
                'Authorization': `Bearer ${userInfo.access}`
            }
        });
      
        setFollowers(response.data);
        setShowFollowers(true);
        setShowFollowings(false);
    } catch (error) {
        console.error(`An error occurred: ${error}`);
    }
};

const fetchFollowings = async () => {
try {
    const response = await mainAxiosInstance.get(`/users/following/${user.id}/`, {
        
            headers: {
                'Authorization': `Bearer ${userInfo.access}`
            }
        });

        setFollowings(response.data);
        setShowFollowers(false);
        setShowFollowings(true);
    } catch (error) {
        console.error(`An error occurred: ${error}`);
    }
};


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

    }
  }, [user.id, userInfo.access]);

  return (
    <div className="flex justify-center mt-6">
      <div className="bg-white shadow-md rounded-lg w-full max-w-2xl">
        <div className="flex justify-center mt-4">
          <div className="flex flex-col items-center">
            {user?.image_url ? (
              <img src={VITE_API_BASE_URL +user.image_url} alt="Profile" className="rounded-full w-32 h-32" />
            ) : (
              <img src="https://placehold.co/400" alt="Placeholder" className="rounded-full w-32 h-32" />
            )}
            <h4 className="mt-4 font-bold" style={{ fontSize: '1.6em' }}>{userInfo?.nickname || userInfo?.username}</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '140px', marginBottom: '20px' }}>
                          <h6 onClick={fetchFollowers} style={{ cursor: 'pointer' }} onMouseEnter={() => setHoverFollowers(true)} onMouseLeave={() => setHoverFollowers(false)}>
                                <span style={{ color: hoverFollowers ? 'blue' : 'initial', textDecoration: hoverFollowers ? 'underline' : 'none' }}>팔로워 {followerCount}</span>
                            </h6>
                            <h6 onClick={fetchFollowings} style={{ cursor: 'pointer' }} onMouseEnter={() => setHoverFollowings(true)} onMouseLeave={() => setHoverFollowings(false)}>
                                <span style={{ color: hoverFollowings ? 'blue' : 'initial', textDecoration: hoverFollowings ? 'underline' : 'none' }}> | 팔로잉 {followingCount}</span>
                            </h6>
                                </div>
          </div>
        </div>
    
        {showFollowers && followers && (
                    <div className="followers-list">
                        <ul style={{ paddingLeft: '20px' }}>
                        <h3 style={{ 
                        textAlign: 'center',
                        fontWeight: 'bold', 
                        fontSize: '24px',
                        marginBottom: '20px',
                        }}>Follower List</h3>
                        {followers && followers.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {followers.map((follower) => (
                            <li key={follower.id} className="flex items-center py-4">
                                {follower.follower_image_url ? (
                                <img src={VITE_API_BASE_URL + follower.follower_image_url} alt="Profile" className="rounded-full w-16 h-16 mr-4" />
                                ) : (
                                <img src="https://placehold.co/400" alt="Placeholder" className="rounded-full w-16 h-16 mr-4" />
                                )}
                                <Link to={`/users/${follower.follower_id}`} onClick={() => setShowFollowers(false)}>
                                <span className="text-xl font-bold">{follower.follower_nickname || follower.follower_username}</span>
                                </Link>
                            </li>
                            ))}
                        </ul>
                        ) : (
                        <p style={{ 
                            textAlign: 'center',
                            marginBottom: '20px',
                            fontSize: '20px',

                        }}>No Followers</p>
                        )}


                        </ul>
                    </div>
                 
                )}
                    {showFollowings && followings && (
                        <div className="followings-list">
                            <ul style={{ paddingLeft: '20px' }}>

                            <h3 style={{ 
                            textAlign: 'center',
                            fontWeight: 'bold', 
                            fontSize: '24px',
                            marginBottom: '20px',
                            }}>Following List</h3>
                            {followings && followings.length > 0 ? (
                                <ul className="divide-y divide-gray-200">
                               { followings.map((following) => (
                                    <li key={following.id} className="flex items-center py-4">

                                    {following.followed_image_url ? (
                                        <img src={VITE_API_BASE_URL + following.followed_image_url} alt="Profile"  className="rounded-full w-16 h-16 mr-4" />
                                    ) : (
                                        <img src="https://placehold.co/400" alt="Placeholder"  className="rounded-full w-16 h-16 mr-4"  />
                                    )}
                                     <Link to={`/users/${following.followed_id}`}
                                     onClick={() => setShowFollowings(false)}>
                                    <span className="text-xl font-bold">{following.followed_nickname || following.followed_username}</span>
                                    </Link></li>
                                ))}
                                </ul>
                            ) : (
                                <p style={{ 
                                    textAlign: 'center',
                                    marginBottom: '20px',
                                    fontSize: '20px',

                                 }}>No Following users.</p>
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