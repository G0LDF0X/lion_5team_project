import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@mui/material";
import { listProducts } from "../store/actions/productActions";
import { listCartItems } from "../store/actions/cartActions";
import Message from "../components/Message";
import { createOrder } from "../store/actions/orderActions";
//포트원 모듈 추가 npm i @portone/browser-sdk로 설치함
import * as PortOne from "@portone/browser-sdk/v2";
import {mainAxiosInstance} from "../api/axiosInstances";
import AddressSearch from "../components/AddressSearch";



function ShippingScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [payment, setPayment] = useState("paypal");
  const [isUserAddressSelected, setIsUserAddressSelected] = useState(true);
  const [address, setAddress] = useState(userInfo.address);
  const [otherAddress, setOtherAddress] = useState(false);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
    const productList = useSelector((state) => state.productList);
    const { products } = productList;
  useEffect(() => {
    if (!products.length) {
        dispatch(listProducts({ query: "", page: 1, category: [] }));
    }
    if (!cartItems.length) {
      dispatch(listCartItems());
    }
  }, [dispatch]);






  


// 결제하기 버튼 누를시 requestPayment() 함수 실행
// 결제요청 시작부분(react 방식, 포트원 V2)
  
  async function requestPayment() {
    console.log("결제하기 버튼 눌림");

    // console.log(combinedCartItems);
    // console.log(combinedCartItems.length);
    // console.log(realPrice);
    // console.log(address);
    // console.log(payment);
    // console.log(combinedCartItems[0].name, `외`, combinedCartItems.length,`건`);
    // console.log(userInfo);
    // console.log(userInfo.access);
    // console.log(userInfo.username);
    // console.log(userInfo.refresh);
    const response = await PortOne.requestPayment({
      // Store ID 설정
      storeId: "store-6744d212-553b-40b5-bd60-4fef72aa2093",
      // 채널 키 설정(현재는 토스 test)
      channelKey: "channel-key-0d3a759f-1678-4bc4-b640-15cc05170f0b",
      paymentId: `payment-${crypto.randomUUID()}`,
      orderName: combinedCartItems.length === 1 ? combinedCartItems[0].name : `${combinedCartItems[0].name} 외 ${combinedCartItems.length - 1}건`,
      totalAmount: realPrice,
      currency: "CURRENCY_KRW",
      payMethod: "CARD", 
      // redirectUrl: "http://localhost:5173", // 결제 완료 후 리다이렉트할 URL",
      // noticeUrls: ["https://127.0.0.1:8000/payment/complete/"],

    });
    
    if (response.code != null){
      // 오류 발생한 경우
      return alert(response.message);
    }

    // paymentId: "payment-9ce6810e-f611-45fb-81c7-3c799a2cb80f" >> DB에 별도저장 필요
    // transactionType: "PAYMENT"
    // txId: "018fdb9c-1177-9bde-be09-406d002e097a"
      // 결제 오류 없는경우

    const paymentInfo = {
      paymentId: response.paymentId,
      orderName: combinedCartItems[0].name,
      totalAmount: realPrice,
      currency: "CURRENCY_KRW",
      payMethod: "CARD",
      userInfo: userInfo,
      address: address,
      // ... 기타 필요한 정보 ...
    };
    console.log(paymentInfo);

      // 오류없이 결제가 성공했다면 여기로 감, 결제 정보를 서버에 저장합니다.
    const savePaymentResponse = await mainAxiosInstance.post('/payment/save/', paymentInfo, 
    {  headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${userInfo.access}`
        } }
                  );

    if (savePaymentResponse.status !== 200) {
      // 결제 정보 저장에 실패한 경우
      return alert('Failed to save payment information.');
    }

    // 결제 정보 저장에 성공한 경우
    alert('Payment information saved successfully.');
    window.location.href = "http://localhost:5173";
    
  };
  







  const subtotalQuantity = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const subtotalPrice = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);
  const realPrice = Number(subtotalPrice) + 5000;
  const combineCartItems = (items) => {
    const combinedItems = {};
    items.forEach((item) => {
      if (combinedItems[item.item_id]) {
        combinedItems[item.item_id].qty += item.qty;
      } else {
        combinedItems[item.item_id] = { ...item };
      }
    });
    return Object.values(combinedItems);
  };

  const combinedCartItems = combineCartItems(cartItems);



  
  return (
    <Container maxWidth="lg" className="py-8">
      <Grid container spacing={4}>
        <Grid item md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                주문 / 결제
              </Typography>
              <Divider />
              <Box my={2}>
                <Typography variant="h6">배송지</Typography>
                <RadioGroup
                  aria-label="shipping address"
                  name="shippingAddress"
                  value={isUserAddressSelected ? userInfo.address : "other"}
                  onChange={(e) => {
                    if (e.target.value === userInfo.address) {
                      setAddress(userInfo.address);
                      setOtherAddress(false);
                      setIsUserAddressSelected(true);
                    } else {
                      setAddress("");
                      setOtherAddress(true);
                      setIsUserAddressSelected(false);
                    }
                  }}
                >
                  <FormControlLabel
                    value={userInfo.address}
                    control={<Radio />}
                    label={userInfo.address}
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="새로운 배송지"
                  />
                </RadioGroup>
                {otherAddress && (
                  <AddressSearch
                  onAddressSelected={setAddress}
                  />
                )}
              </Box>
              <Divider />
              <Box my={2}>
                <Typography variant="h6">결제 방법</Typography>
                <RadioGroup
                  aria-label="payment method"
                  name="paymentMethod"
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                >
                  <FormControlLabel
                    value="paypal"
                    control={<Radio />}
                    label="PayPal"
                  />
                  <FormControlLabel
                    value="toss"
                    control={<Radio />}
                    label="토스"
                  />
                  <FormControlLabel
                    value="creditcard"
                    control={<Radio />}
                    label="신용카드"
                  />
                </RadioGroup>
              </Box>
              <Divider />
              <Box my={2}>
                <Typography variant="h6">주문자 정보</Typography>
                <List>
                  <ListItem>
                    <ListItemText primary="이름" secondary={userInfo.username} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="이메일" secondary={userInfo.email} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="전화번호" secondary={userInfo.phone} />
                  </ListItem>
                </List>
              </Box>
              <Divider />
              <Box my={2}>
                <Typography variant="h6">주문 상품</Typography>
                {combinedCartItems.length === 0 ? (
                  <Message>Your cart is empty</Message>
                ) : (
                  <List>
                    {combinedCartItems.map((item, index) => (
                      <ListItem key={index} alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar src={VITE_API_BASE_URL+item.image} alt={item.name} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Link to={`/items/detail/${item.item_id}`}>
                              {item.name}
                            </Link>
                          }
                          secondary={
                            <>
                              <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                              >
                                {item.qty} x {item.price}₩ = {item.qty * item.price}₩
                              </Typography>
                            </>
                          }
                        />
                        <ListItemText primary="수량" secondary={item.qty} />

                      </ListItem>
                    //   <ListItem>
                    //     <ListItemText primary="수량" secondary={item.qty} />
                    //     </ListItem>
                    ))}
                  </List>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                결제 금액
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="총 상품금액" secondary={`${subtotalPrice}₩`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="배송비" secondary="5000₩" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="총 결제금액" secondary={`${realPrice}₩`} />
                </ListItem>
              </List>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={requestPayment}
              >
                {realPrice}₩ 결제하기
              </Button>
              
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}


export default ShippingScreen;