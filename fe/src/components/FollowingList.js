import React from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const FollowingList = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [following, setFollowing] = React.useState([]);
  console.log(userInfo);
  React.useEffect(() => {
    fetch(`/users/following/${userInfo.id}/`, {
      headers: {
        'Authorization': `Bearer ${userInfo.access}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const promises = data.map(follow => 
        fetch(`/users/detail/${follow.followed_id}`).then(response => response.json())
      );
  
      Promise.all(promises).then(userData => {
        const followingWithUserData = data.map((follow, index) => ({
          ...follow,
          user: userData[index]
        }));
        console.log("RESULT:", followingWithUserData);
        setFollowing(followingWithUserData);
      });
    })
    .catch(error => console.error('Error:', error));
  }, []);
  return (
    <div>
      {console.log(following)}
      <h1>나의 팔로잉</h1>
    {/* /*
      <div className='d-flex flex-row flex-wrap'>

      
      {following.map((follow, index) => (
        <Card style={{ width: '18rem' , margin: '10px' }} key={index}>
        <Card.Body>
          <Card.Title>{follow.user.username}</Card.Title>
          <Card.Text>{follow.user.description}</Card.Text>
          <Link to={`/users/detail/${follow.followed_id.id}`}>
          <Button variant="primary">바로가기</Button>
          </Link>
        </Card.Body>   
      </Card>
      ))}
      </div> */}
    </div>
  );
};

export default FollowingList;