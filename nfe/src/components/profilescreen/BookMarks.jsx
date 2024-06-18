import React from "react";
import { useSelector } from "react-redux";
import Product from "../Product";
import Loading from "../Loading";
import Message from "../Message";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";


function BookMarks({ bookMarkItems }) {
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" className="my-6 text-center font-bold">
        My Bookmarks
      </Typography>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <Grid container spacing={3}>
          {bookMarkItems && bookMarkItems.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Product product={product} id={product.item_id} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default BookMarks;