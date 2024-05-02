import React from "react";
import { Card, Badge } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
function Product({ product }) {
    return (
        <div>
        {/* // <Card className="my-3 p-3 rounded"> */}
            <Link to={`/items/detail/${product.id}`}> 
                {/* <Card.Img src={product.image_url} variant="top" /> */}
                <Card.Img src={decodeURIComponent(product.image_url)} variant="top" />
            </Link>

            <Card.Body>
                <Link to={`/items/detail/${product.id}`}> 
                    <Card.Title as="div">
                        <strong> <h6>
         <Badge bg="secondary">New</Badge>
      </h6>{product.name}</strong>
                    </Card.Title>
                </Link>

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
                <Card.Text as="h3">{product.price}₩</Card.Text>
            </Card.Body>
        {/* </Card> */}
    </div>
    );
}

export default Product;
