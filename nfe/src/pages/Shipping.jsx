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
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createOrder({ payment_method: payment, address: address }));
    navigate("/payment");
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
                  value={isUserAddressSelected ? userInfo.address : address}
                  onChange={(e) => {
                    if (e.target.value === userInfo.address) {
                      setAddress(userInfo.address);
                      setOtherAddress(false);
                      setIsUserAddressSelected(true);
                    } else {
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
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="새로운 배송지 입력"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
                    label="PayPal 또는 신용카드"
                  />
                  <FormControlLabel
                    value="toss"
                    control={<Radio />}
                    label="토스"
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
                onClick={submitHandler}
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