import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector
import { mainAxiosInstance } from "../../api/axiosInstances";
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';

function OrderDetail() {
  const [orderItem, setOrder] = useState(null);
  const [payment, setPayment] = useState(null);
  const { id } = useParams();

  // Get userInfo from the state
  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  // useEffect(() => {
  //   const fetchOrder = async () => {
  //     const response = await mainAxiosInstance.get(`/order/detail/${id}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         'Authorization': `Bearer ${userInfo.access}`
  //       }
  //     });
  
  //     const orderData = response.data;
  //     setOrder(orderData);
  
  //     // Fetch payment details for each order item
  //     orderData.forEach(async item => {
  //       const paymentResponse = await mainAxiosInstance.get(`/payment/detail/${item.payment_id}`, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           'Authorization': `Bearer ${userInfo.access}`
  //         }
  //       });
  
  //       setPayment(prevPayments => ({
  //         ...prevPayments,
  //         [item.payment_id]: paymentResponse.data,
  //       }));
  //     });
  //   };
  
  //   fetchOrder();
  // }, [id, userInfo.access]); // Removed orderItem from the dependency array

// 개선 후 코드
  useEffect(() => {
    const fetchOrder = async () => {
      const response = await mainAxiosInstance.get(`/order/detail/${id}`, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${userInfo.access}`
        }
      });
  
      const orderData = response.data;
      setOrder(orderData);
  
      // Fetch payment details for each order item
      const paymentPromises = orderData.map(item => 
        mainAxiosInstance.get(`/payment/detail/${item.payment_id}`, {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${userInfo.access}`
          }
        })
      );
  
      const paymentResponses = await Promise.all(paymentPromises);
  
      const payments = paymentResponses.reduce((acc, paymentResponse, index) => {
        return {
          ...acc,
          [orderData[index].payment_id]: paymentResponse.data,
        };
      }, {});
  
      setPayment(payments);
    };
  
    fetchOrder();
  }, [id, userInfo.access]);

  //백엔드로 환불요청 post 요청보낸다. 

  const handleRefund = async (item) => {
    // Define the parameters
    const payment_id = item.payment_id; // Use item.payment_id

    
    
    // Define the body
    const body = {
      // Add the data you want to send in the request body

    };
  
    // Send the POST request
    try {
      const response = await mainAxiosInstance.post(`/payment/refund/${payment_id}`, body, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${userInfo.access}`
        }
      });
  
      console.log(response.data);
      // If the request is successful, show an alert and refresh the page
      window.alert("환불요청이 처리되었습니다.");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  

  if (!orderItem) {
    return <div>Loading...</div>;
  }
  

  return (
    <div className="p-4">
      {orderItem.map((item, index) => (
        <div key={index} className="mb-4 p-4 border rounded">
          <h2 className="text-2xl mb-2">제품명: {item.name}</h2>
          <p className="mb-1">수량: {item.qty}</p>
          <p className="mb-1">제품가격: {item.price_multi_qty}</p>
          <p className="mb-1">총 제품가격: {item.qty * item.price_multi_qty}</p>
          <p className="mb-1">배송비: 5000원</p>
          <img src={item.image}  className="w-64 h-64 object-cover mb-2" />
          <p className="mb-1">Item ID: {item.item_id}</p>
          <p className="mb-2">Order ID: {item.order_id}</p>
          {item.is_refund ? (
            <Button variant="contained" disabled style={{backgroundColor: 'yellow'}}>
              환불완료
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={() => handleRefund(item)}>
              환불하기
            </Button>
          )}
          <p className="mb-1">Payment ID: {item.payment_id}</p>
          <p className="mb-1">Payment Details: {payment?.[item.payment_id]?.paymentId}</p>
        </div>
      ))}
    </div>
  );
}

export default OrderDetail;