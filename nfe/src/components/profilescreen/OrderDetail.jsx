// import React, { useEffect, useState } from 'react';
// import {mainAxiosInstance} from "../../api/axiosInstances";
// import { useParams } from 'react-router-dom';
// import Button from '@mui/material/Button';

// function OrderDetail() {
//   const [order, setOrder] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchOrder = async () => {
//       const response = await mainAxiosInstance.get(`/order/detail/${id}`);
//       setOrder(response.data);
//     };

//     fetchOrder();
//   }, [id]);



//   const handleRefund = () => {
//     // 환불 로직을 여기에 작성하세요.
//     console.log('환불하기 버튼이 클릭되었습니다.');
//   };

//   if (!order) {
//     return <div>Loading...</div>;
//   }

//   // Render order details here
//   return (
//     <div>
//       {order.map((item, index) => (
//         <div key={index}>
//           <h2>{item.name}</h2>
//           <p>Quantity: {item.qty}</p>
//           <p>Price Multi Quantity: {item.price_multi_qty}</p>
//           <img src={item.image} alt={item.name} />
//           <p>Item ID: {item.item_id}</p>
//           <p>Order ID: {item.order_id}</p>
//           <Button variant="contained" color="primary" onClick={handleRefund}>
//             환불하기
//           </Button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default OrderDetail;


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
// import { Typography, Button, Grid, List, ListItem, Card, CardMedia, CardContent, CardActions } from "@material-ui/core";
// import Message from "../components/Message";
// import Loading from "../components/Loading";
// import { getOrderDetails, getShippingAddress, get_Order } from "../actions/orderActions";

function OrderDetail() {
  // ... (keep the existing code here)

  return loading ? (
    <Loading />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div className="container mx-auto px-4">
      <Typography variant="h4">Order {order.id}</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <List>
            <ListItem>
              <Typography variant="h6">Shipping</Typography>
              <Typography variant="body1">
                <strong>Address:</strong>
                {address && address.address}
              </Typography>
              {orderInfo.is_delivered ? (
                <Message variant="success">
                  Delivered on {orderInfo.delivered_at.split("T")[0]}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListItem>
            {/* ... (keep the existing code here) */}
            <ListItem>
              <Typography variant="h6">Order Items</Typography>
              <div className="flex flex-wrap justify-start">
                {order ? order.map((item, index) => (
                  <Link to={`/items/detail/${item.item_id}`} className="w-1/3 m-1 inline-block">
                    <Card>
                      <CardMedia
                        component="img"
                        alt={item.name}
                        height="200"
                        image={item.image}
                        title={item.name}
                      />
                      <CardContent>
                        <Typography variant="subtitle1">{item.name}</Typography>
                        <Typography variant="body2">
                          수량 : {item.qty}
                          <br />
                          합계 : {item.price_multi_qty}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                )) : null}
              </div>
              {/* ... (keep the existing code here) */}
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <List>
              <ListItem>
                <Typography variant="h6">Order Summary</Typography>
              </ListItem>
              {/* ... (keep the existing code here) */}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListItem>
                    {loadingDeliver && <Loading />}
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListItem>
                )}
            </List>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default OrderDetail