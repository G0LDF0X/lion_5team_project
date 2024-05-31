import React, { useEffect, useState, useCallback } from "react";
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
import Message from "../components/Message";

function CartScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const cart = useSelector((state) => state.cart);
  const { cartItems, successCartRemove } = cart;
  const [combinedCartItems, setCombinedCartItems] = useState([]);

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      dispatch(listCartItems());
    }
    if (successCartRemove) {
      dispatch(listCartItems());
    }
  }, [dispatch, successCartRemove]);

  const removeFromCartHandler = useCallback((id) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      dispatch(removeFromCart(id));
    }
  }, [dispatch]);

  const checkOutHandler = () => {
    navigate("/shipping");
  };

  const updateQtyHandler = useCallback((id, qty) => {
    dispatch(updateQty({ id, qty }));
  }, [dispatch]);

  const combineCartItems = useCallback((items) => {
    const combinedItems = {};
    items.forEach((item) => {
      if (combinedItems[item.item_id]) {
        combinedItems[item.item_id].qty += item.qty;
      } else {
        combinedItems[item.item_id] = { ...item };
      }
    });
    return Object.values(combinedItems);
  }, []);

  useEffect(() => {
    if (cartItems.length > 0)
    setCombinedCartItems(combineCartItems(cartItems));
  }, [cartItems, combineCartItems]);

  const subtotalQuantity = combinedCartItems.reduce((acc, item) => acc + item.qty, 0);
  const subtotalPrice = combinedCartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  return (
    <div className="container mx-auto py-8">
      <Typography variant="h4" className="mb-6">
        Shopping Cart
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2">
          {combinedCartItems.length === 0 ? (
            <Message variant="info">
              Your cart is empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <List>
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
                    secondary={`Price: ${item.price}₩`}
                  />
                  <Select
                    value={item.qty}
                    onChange={(e) =>
                      updateQtyHandler(item.item_id, e.target.value)
                    }
                    className="mr-4"
                  >
                    {[...Array(40).keys()].map((x) => (
                      <MenuItem key={x + 1} value={x + 1}>
                        {x + 1}
                      </MenuItem>
                    ))}
                  </Select>
                  <IconButton
                    color="secondary"
                    onClick={() => removeFromCartHandler(item.item_id)}
                  >
                    <Delete />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          )}
        </div>
        <div className="col-span-1">
          <Card className="shadow-lg">
            <CardContent>
              <Typography variant="h6" className="mb-4">
                Subtotal ({subtotalQuantity}) items
              </Typography>
              <Typography variant="body1" className="mb-2">
                Shipping: 5000 ₩
              </Typography>
              <Typography variant="h5" className="font-bold mb-4">
                {subtotalPrice} ₩
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={combinedCartItems.length === 0}
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