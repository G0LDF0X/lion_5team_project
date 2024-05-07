import React from 'react';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';

const OtherBookmark = ({ userId }) => {
  const [bookmarks, setBookmarks] = React.useState([]);
  React.useEffect(() => {
    fetch('bookmark/')
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
        setBookmarks(bookmarksWithItemData);
      });
    })
    .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h2>나의 북마크</h2>
      <div className='d-flex flex-row flex-wrap'>
      {bookmarks.map((bookmark, index) => (
        <Card style={{ width: '18rem' , margin: '10px' }} key={index}>
        <Card.Body>
          <Card.Title>{bookmark.name}</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>{bookmark.price}원</Card.Subtitle>
          <Badge bg="info">{bookmark.item.category}</Badge>
          <Card.Text>
            <br />
            {bookmark.item.description.length > 30 
                ? `${bookmark.item.description.substring(0, 30)}...` 
                : bookmark.item.description}
            </Card.Text>
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

export default OtherBookmark;