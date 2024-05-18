import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { CardMedia, Typography, Box } from "@mui/material";

function Product({ product, id }) {
  return (
    <Card className="shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col justify-between">
      <Link to={`/items/detail/${id}`}>
        <CardMedia
          component="img"
          height={250}
          className="object-cover w-full"
          image={product.image_url}
          alt={product.name}
          style={{height:"250px"}} // Ensure image is not too tall
        />
      </Link>

      <Card.Body className="p-4 flex flex-col justify-between flex-grow">
        <Link to={`/items/detail/${id}`}>
          <Card.Title as="div">
            <Typography
              variant="h6"
              noWrap
              className="w-full text-gray-800 font-semibold"
              title={product.name}
            >
              {product.name}
            </Typography>
          </Card.Title>
        </Link>

        <Box className="flex flex-col items-start mt-2">
          <Card.Text as="div">
            <Box className="flex items-center space-x-2">
              <Rating value={product.rate} text={``} color={"#f8e825"} />
              <Typography variant="body2" className="text-gray-500">
                {product.rate} stars
              </Typography>
            </Box>
          </Card.Text>

          <Card.Text as="h6" className="mt-2 text-lg font-bold text-gray-800">
            {product.price}₩
          </Card.Text>
        </Box>
      </Card.Body>
    </Card>
  );
}

export default Product;