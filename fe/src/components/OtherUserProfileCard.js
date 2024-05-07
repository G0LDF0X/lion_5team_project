import React, {useEffect, useState } from 'react'
import { Card, Row, Col, Image } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import Loading from './Loading';

import { getUserDetails } from '../actions/userActions';
function OtherUserProfileCard({ userId }) {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const [value, setValue] = useState(0);
    const [userData, setUserData] = useState(null);
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const userResponse = await fetch(`/users/${userId}`);
            const followingResponse = await fetch(`/users/follower/${userId}/`);
            const followerResponse = await fetch(`/users/following/${userId}/`);
            if (!userResponse.ok) {
                throw new Error(`HTTP error! status: ${userResponse.status}`);
            }
            if (!followerResponse.ok) {
                throw new Error(`HTTP error! status: ${followerResponse.status}`);
            }
            if (!followingResponse.ok) {
                throw new Error(`HTTP error! status: ${followingResponse.status}`);
            }
            const userData = await userResponse.json();
            const followerData = await followerResponse.json();
            const followingData = await followingResponse.json();

            setUserData(userData);
            setFollowerCount(followerData.length);
            setFollowingCount(followingData.length);
          } catch (error) {
            console.error('Failed to fetch user data:', error);
          }
        };
    
        fetchData();
      }, [userId]);
    
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
export default OtherUserProfileCard
