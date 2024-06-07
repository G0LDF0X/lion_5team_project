import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector
import { mainAxiosInstance } from "../../api/axiosInstances";
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import 'tailwindcss/tailwind.css';

function OrderDetail() {
  const [orderItem, setOrder] = useState(null);
  const [payment, setPayment] = useState(null);
  const { id } = useParams();

  // Get userInfo from the state
  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await mainAxiosInstance.get(`/order/detail/${id}`, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${userInfo.access}`
        }
      });
      setOrder(response.data);
    };
    
    const fetchPayment = async (paymentId) => {
      const response = await mainAxiosInstance.get(`/payment/detail/${paymentId}`, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${userInfo.access}`
        }
      });
      setPayment(prevPayments => ({
        ...prevPayments,
        [paymentId]: response.data,
      }));
    };

    fetchOrder();

    if (orderItem) {
      orderItem.forEach(item => {
        fetchPayment(item.payment_id);
      });
    }
  }, [id, userInfo.access, orderItem]);


  const handleRefund = () => {
    console.log('환불하기 버튼이 클릭되었습니다.');
   // 포트원 환불 api 호출 시작!!
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
          <Button variant="contained" color="primary" onClick={handleRefund}>
            환불하기
          </Button>
          <p className="mb-1">Payment ID: {item.payment_id}</p>
          <p className="mb-1">Payment Details: {payment?.[item.payment_id]?.paymentId}</p>
        </div>
      ))}
    </div>
  );
}

export default OrderDetail;