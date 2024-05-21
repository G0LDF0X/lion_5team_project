import React, {useEffect, useState } from 'react'
import { Card, Row, Col, Image, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';


function OtherUserProfileCard({ userId }) {
    const token = useSelector((state) => state.userLogin.userInfo.access);

    const [value, setValue] = useState(0);
    const [userData, setUserData] = useState(null);
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);

    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const userResponse = await fetch(`/users/${userId}`);
            const followingResponse = await fetch(`/users/following/${userId}/`);
            const followerResponse = await fetch(`/users/follower/${userId}/`);

            const followStatusResponse = await fetch(`/users/follow/${userId}/`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`
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
            const followerData = await followerResponse.json();
            const followingData = await followingResponse.json();
            const followStatusData = await followStatusResponse.json();


            setUserData(userData);
            setFollowerCount(followerData.length);
            setFollowingCount(followingData.length);
            setIsFollowing(followStatusData.follow_exists); // Assuming the response contains a boolean 'isFollowing' field
          } 
              catch (error) {
            console.error('Failed to fetch user data:', error);
          }

        };
    
        fetchData();
      }, [userId, token]);
      

      


      async function handleFollow(userId) {
  
        try {
          
          if (isFollowing) {
            alert('한 번 팔로우는 영원한 팔로우');
            return;
        }
            const userId = window.location.pathname.split('/').pop();
            console.log(token);
            const response = await fetch(`/users/follow/${userId}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
      
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
          }
        
          alert('팔로우 완료!');
        window.location.reload();

        } catch (error) {
          console.error('Failed to follow:', error);
      }
      
      };


      if (!userData) {
        return <div>Loading...</div>;
      }

    return (
        <Card className="ms-auto">
          <Row className="justify-content-center">
            <Col xs={6} md={4} className="d-flex flex-column justify-content-center align-items-center">
              <Image src="https://placehold.co/400" roundedCircle width="40%" />
              {userData&& userData.User.nickname !== "" ? 
              <h4 className='text-center'>{userData.User.nickname}</h4>
            : <h4 className='text-center'>{userData.User.username}</h4>}
              <h6>팔로워  {followerCount} |  팔로잉  {followingCount}</h6>
              <Button variant="primary" onClick={() => handleFollow(userId)}>
            {isFollowing ? '팔로잉' : '팔로우'}         </Button>
            </Col>
          </Row>
          <Card.Body className='text-center'>
            <Box sx={{ width: 500, margin: '0 auto' }}>
              <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              >
                <BottomNavigationAction label="스크랩북" icon={<BookmarkBorderIcon />} />
                <BottomNavigationAction label="좋아요" icon={<FavoriteBorderIcon />} />
                <BottomNavigationAction label="내 쿠폰" icon={<ConfirmationNumberOutlinedIcon />} />
              </BottomNavigation>
            </Box>
          </Card.Body>
        </Card>
      )
  }
  
  

export default OtherUserProfileCard;
