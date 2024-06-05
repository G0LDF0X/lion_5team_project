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
import { Button, Card, List, ListItem, Typography } from "@material-ui/core";
import Message from "../components/Message";
import Loading from "../components/Loading";
import { getOrderDetails, getShippingAddress, get_Order } from "../actions/orderActions";

function OrderDetailScreen() {
  // ... existing code ...

  return loading ? (
    <Loading />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div className="flex flex-col items-center justify-center">
      <Typography variant="h1">Order {order.id}</Typography>
      <div className="flex flex-row">
        <div className="w-2/3">
          <List>
            <ListItem>
              <Typography variant="h2">Shipping</Typography>
              <p>
                <strong>Address:</strong>
                {address && address.address}
              </p>
              {orderInfo.is_delivered ? (
                <Message variant="success">
                  Delivered on {orderInfo.delivered_at.split("T")[0]}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListItem>
            {/* ... other list items ... */}
          </List>
        </div>
        <div className="w-1/3">
          <Card>
            <List>
              <ListItem>
                <Typography variant="h2">Order Summary</Typography>
              </ListItem>
              {/* ... other list items ... */}
            </List>
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
          </Card>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailScreen