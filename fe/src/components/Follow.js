import React,{useState ,useEffect} from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const FollowingList = ({userInfo}) => {
  const [following, setFollowing] = useState([]);
  
  useEffect(() => {
    fetch(`/users/following/${userInfo.id}/`, {
      method: 'GET',
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
        
        setFollowing(followingWithUserData);
      });
    })
    .catch(error => console.error('Error:', error));
  }, [userInfo]);
  return (
    <div>
      
      <h2>나의 팔로잉</h2>
    {
      <div className='d-flex flex-row flex-wrap'>

      {following.map((follow, index) => (
        <Card style={{ width: '18rem' , margin: '10px' }} key={index}>
        <Card.Body>
        <Card.Title>{follow.followed_username}</Card.Title>      
        <Card.Text>{follow.created_at.split('T')[0]}</Card.Text>
        <Link to={`/users/${follow.followed_id}`}>
          <Button variant="primary">바로가기</Button>
        </Link>
        </Card.Body>   
      </Card>
      ))}
      </div> }
    </div>
  );
};

export default FollowingList;