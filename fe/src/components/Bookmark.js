import { Link } from "react-router-dom";
import { Card, Badge, Button } from "react-bootstrap";
const Bookmark = ({ bookMarkItems }) => {
  return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {bookMarkItems &&
          bookMarkItems.map((bookmark) => (
            <Card style={{ width: "18rem", margin: "10px" }} key={bookmark.id}>
              <Card.Body>
                <Card.Title>{bookmark.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {bookmark.price}원
                </Card.Subtitle>
                <Badge bg="info">{bookmark.category}</Badge>
                <Card.Text>
                  <br />
                  {bookmark.description && bookmark.description.length > 30
                    ? `${bookmark.description.substring(0, 30)}...`
                    : bookmark.description}
                </Card.Text>
                <Link to={`/items/detail/${bookmark.item_id}`}>
                  <Button variant="primary">바로가기</Button>
                </Link>
              </Card.Body>
            </Card>
          ))}
      </div>
    
  );
};

export default Bookmark;
