import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
function Product({ product }) {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/items/detail/${product.id}`}> 
                <Card.Img src={product.image_url} variant="top" />
            </Link>

            <Card.Body>
                <Link to={`/items/detail/${product.id}`}> 
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <div className="my-3">
                        {product.rate} 
                        <Rating
                            value={product.rate}
                            text={` reviews`}
                            color={"#f8e825"}
                        />
                    </div>
                </Card.Text>
                <Card.Text as="h3">${product.price}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Product;
