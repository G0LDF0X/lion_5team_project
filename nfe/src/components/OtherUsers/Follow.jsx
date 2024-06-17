import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, CardActions, Typography, Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { mainAxiosInstance } from '../../api/axiosInstances';

const OtherFollowingList = ({ userId, userDetail }) => {
  const [following, setFollowing] = useState([]);

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
        {userDetail.nickname  }의 팔로잉
      </Typography>
      <Grid container spacing={4}>
        {following.map((follow, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card className="shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <CardContent>
                <Typography variant="h6" className="font-bold text-gray-800 mb-2">
                  {follow.user.username}
                </Typography>
                <Typography variant="body2" className="text-gray-600 mb-4">
                  {follow.created_at.split('T')[0]}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="primary" component={Link} to={`/users/${follow.followed_id}`}>
                  바로가기
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OtherFollowingList;