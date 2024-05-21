import React from 'react';
import { Box, Card, CircularProgress, Typography, Grid, Skeleton } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Product from '../Product';
import Message from '../Message';
import PropTypes from "prop-types";


const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
function Media() {
  

  return (
    <Grid container wrap="nowrap">
      {Array.from(new Array(4)).map((index) => (
        <Box key={index} sx={{ width: 300, marginRight: 0.5, my: 5 }}>
          <Skeleton variant="rectangular" width={256} height={250} />

          <Box sx={{ pt: 0.5 }}>
            
            <Skeleton width="70%" />
            <Skeleton width="70%" />
            <Skeleton width="70%" />
          </Box>
        </Box>
      ))}
    </Grid>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

function Loading2() {
  return (
    <Box sx={{ overflow: "hidden" }}>
      <Media loading />
      
    </Box>
  );
}

function ProductCarousel({ loading, error, products }) {
  return (
    <>
      <Typography variant="h5" className="my-4 font-semibold text-gray-700">
        Products
      </Typography>
      {loading ? (
        <Box className="flex justify-center">
          <Loading2 loading />
        </Box>
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <Carousel responsive={responsive} infinite>
          {products.map((product) => (
            // <Box key={product.id} className="p-2 h-full">
              <Card className="p-4 rounded-lg shadow-lg h-full flex flex-col">
                <Product product={product} id={product.id} />
              </Card>
            // </Box>
          ))}
        </Carousel>
      )}
    </>
  );
}

export default ProductCarousel;