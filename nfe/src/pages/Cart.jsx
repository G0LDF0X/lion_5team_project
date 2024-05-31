<<<<<<< HEAD
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Select, MenuItem, Button, Card, CardContent, Typography } from "@mui/material";
import { addToCart, removeFromCart, listCartItems, updateQty } from "../store/actions/cartActions";
=======
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Select,
  MenuItem,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import {
  removeFromCart,
  listCartItems,
  updateQty,
} from "../store/actions/cartActions";
>>>>>>> main
import Message from "../components/Message";

function CartScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
<<<<<<< HEAD

  const cart = useSelector((state) => state.cart);
    const { cartItems, successCartRemove, } = cart;

=======
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const cart = useSelector((state) => state.cart);
  const { cartItems, successCartRemove } = cart;
  const [subtotalQuantity, setSubtotalQuantity] = useState(0);
  const [subtotalPrice, setSubtotalPrice] = useState(0);
>>>>>>> main

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      dispatch(listCartItems());
<<<<<<< HEAD
      console.log(cartItems.length  );
=======
>>>>>>> main
    }
    if (successCartRemove) {
      dispatch(listCartItems());
    }
  }, [dispatch, successCartRemove, navigate]);

  const removeFromCartHandler = (id) => {
    window.alert("Item이 삭제되었습니다.");
    dispatch(removeFromCart(id));
    window.location.reload();
  };

  const checkOutHandler = () => {
    navigate("/shipping");
  };

<<<<<<< HEAD
  const subtotalQuantity = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const subtotalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

  return (
    <div className="container mx-auto py-8">
      <Typography variant="h4" className="mb-6">Shopping Cart</Typography>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2">
          {cartItems.length === 0 ? (
=======
  const updateQtyHandler = (id, qty) => {
    dispatch(updateQty({ id, qty }));
  };

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

  useEffect(() => {
    if (combinedCartItems) {
      setSubtotalQuantity(
        combinedCartItems.reduce((acc, item) => acc + item.qty, 0)
      );
      setSubtotalPrice(
        combinedCartItems
          .reduce((acc, item) => acc + item.qty * item.price, 0)
          .toFixed(2)
      );
    } else {
      setSubtotalQuantity(0);
      setSubtotalPrice(0);
    }
  }, [combinedCartItems]);

  return (
    <div className="container mx-auto py-8">
      <Typography variant="h4" className="mb-6">
        Shopping Cart
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2">
          {combinedCartItems.length === 0 ? (
>>>>>>> main
            <Message variant="info">
              Your cart is empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <List>
<<<<<<< HEAD
              {cartItems&&cartItems.map((item) => (
                
                <ListItem key={item.id} className="flex justify-between items-center border-b py-4">
                  <ListItemAvatar>
                    <Avatar src={item.image || '/placeholder.jpg'} alt={item.name} variant="square" className="w-24 h-24" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Link to={`/items/detail/${item.id}`} className="text-blue-500 hover:underline">{item.name}</Link>}
=======
              {combinedCartItems.map((item) => (
                <ListItem
                  key={item.item_id}
                  className="flex justify-between items-center border-b py-4"
                >
                  <ListItemAvatar>
                    <Avatar
                      src={
                        VITE_API_BASE_URL + item.image || "/placeholder.jpg"
                      }
                      alt={item.name}
                      variant="square"
                      className="w-24 h-24"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Link
                        to={`/items/detail/${item.item_id}`}
                        className="text-blue-500 hover:underline"
                      >
                        {item.name}
                      </Link>
                    }
>>>>>>> main
                    secondary={`Price: ${item.price}₩`}
                  />
                  <Select
                    value={item.qty}
<<<<<<< HEAD
                    onChange={(e) => dispatch(updateQty(item.item_id, Number(e.target.value)))}
                    className="mr-4"
                  >
                    {[...Array(40).keys()].map(x => (
=======
                    onChange={(e) =>
                      updateQtyHandler(item.item_id, e.target.value)
                    }
                    className="mr-4"
                  >
                    {[...Array(40).keys()].map((x) => (
>>>>>>> main
                      <MenuItem key={x + 1} value={x + 1}>
                        {x + 1}
                      </MenuItem>
                    ))}
                  </Select>
<<<<<<< HEAD
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeFromCartHandler(item.item_id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
=======

                  <IconButton
                    color="secondary"
                    onClick={() => removeFromCartHandler(item.item_id)}
                  >
                    <Delete />
                  </IconButton>
>>>>>>> main
                </ListItem>
              ))}
            </List>
          )}
        </div>
        <div className="col-span-1">
          <Card className="shadow-lg">
            <CardContent>
<<<<<<< HEAD
              <Typography variant="h6" className="mb-4">Subtotal ({subtotalQuantity}) items</Typography>
              <Typography variant="body1" className="mb-2">Shipping: 5000 ₩</Typography>
              <Typography variant="h5" className="font-bold mb-4">{subtotalPrice} ₩</Typography>
=======
              <Typography variant="h6" className="mb-4">
                Subtotal ({subtotalQuantity}) items
              </Typography>
              <Typography variant="body1" className="mb-2">
                Shipping: 5000 ₩
              </Typography>
              <Typography variant="h5" className="font-bold mb-4">
                {subtotalPrice} ₩
              </Typography>
>>>>>>> main
              <Button
                variant="contained"
                color="primary"
                fullWidth
<<<<<<< HEAD
                disabled={cartItems.length === 0}
=======
                disabled={combinedCartItems.length === 0}
>>>>>>> main
                onClick={checkOutHandler}
              >
                Proceed To Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;