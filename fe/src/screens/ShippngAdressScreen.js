import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";

function ShippingAdressScreen() {
const [address, setAddress] = useState("");
const [city, setCity] = useState("");
const [postalCode, setPostalCode] = useState("");
const dispatch = useDispatch();
const navigate = useNavigate();
const submitHandler = (e) => {
    e.preventDefault();
    navigate("/shipping");
    console.log("submit");
}

  return (
    <FormContainer>
        
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
            </Form.Group>
            <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
            </Form.Group>
            <Form.Group controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter postal code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
            
            </Form.Group>
            <Button type="submit" variant="primary">
            Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default ShippingAdressScreen
