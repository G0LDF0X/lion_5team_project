import React from "react";
import { Card, Badge } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


function Product({ product, id }) {
    return (
        <div style={{height: "500px"}}>
        {/* // <Card className="my-3 p-3 rounded"> */}
            <Link to={`/items/detail/${id}`}> 
                {/* <Card.Img src={product.image_url} variant="top" /> */}
                <CardMedia
        component="img"
        height="250"
        width="1"
        image={product.image_url}
        // alt="Paella dish"
      />            </Link>

<Card.Body>
  <Link to={`/items/detail/${id}`}> 
    <Card.Title as="div">
    <Typography variant="body1" noWrap style={{ width: '200px' }} title={product.name}>

<strong>{product.name}</strong>
</Typography>
    </Card.Title>
  </Link>

  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
    <Card.Text as="div">
      <div className="my-3">
        {product.rate} 
        <Rating
          value={product.rate}
          text={``}
          color={"#f8e825"}
        />
      </div>
    </Card.Text>
    <Card.Text as="h6">{product.price}₩</Card.Text>
  </div>
</Card.Body>
        {/* </Card> */}
    </div>
    );
}

export default Product;
