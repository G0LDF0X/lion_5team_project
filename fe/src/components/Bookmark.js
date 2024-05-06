import React from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

const Bookmark = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [bookmarks, setBookmarks] = React.useState([]);
  React.useEffect(() => {
    fetch('/users/bookmark/', {
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
      const promises = data.map(bookmark => 
        fetch(`/items/detail/${bookmark.item_id}`).then(response => response.json())
      );
  
      Promise.all(promises).then(itemData => {
        const bookmarksWithItemData = data.map((bookmark, index) => ({
          ...bookmark,
          item: itemData[index]
        }));
        console.log("RESULT:", bookmarksWithItemData);
        setBookmarks(bookmarksWithItemData);
      });
    })
    .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>나의 북마크</h1>
      {console.log(bookmarks)}
      <div className='d-flex flex-row flex-wrap'>
      {bookmarks.map((bookmark, index) => (
        <Card style={{ width: '18rem' , margin: '10px' }} key={index}>
        <Card.Body>
          <Card.Title>{bookmark.name}</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>{bookmark.price}원</Card.Subtitle>
          <Card.Text>{bookmark.item.category}</Card.Text>
          <Link to={`/items/detail/${bookmark.item_id}`}>
          <Button variant="primary">바로가기</Button>
          </Link>
        </Card.Body>   
      </Card>
      ))}
      </div>
    </div>
    
  );
};

export default Bookmark;