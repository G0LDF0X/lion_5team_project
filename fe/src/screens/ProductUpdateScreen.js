import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loading from "../components/Loading";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';

function ProductUpdateScreen() {
  const productId = useParams().id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    // dispatch(listProductDetails(productId));
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/users/profile");
    } else {
      if ( product.id !== Number(productId)) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image_url);
        // setBrand(product.brand);
        setCategory(product.category_id);
        // setCountInStock(product.countInStock);
        setDescription(product.description);
          if(product.tag_id&&product.tag_id !== ""){
        setChipData([`${product.tag_id}`]);
          }
    }}
  }, [product, productId, dispatch, navigate, successUpdate, ]);

  const submitHandler = (e) => {
    
    e.preventDefault();
    console.log({
        id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,

      })
    dispatch(
      updateProduct({
        id: productId,
        name,
        price,
        image,
        // brand,
        category,
        // countInStock,
        description,
        tag: chipData.map(Number),
      })
    );
  };

  const uploadFileHandler = async (e) => {
    // e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    
    formData.append("image", file);
    console.log(file);
    formData.append("product_id", productId);
    // console.log(formData);
    setUploading(true);
    try {
      const config = {
        method: "PUT",
       
        body: formData,
      };
      const res = await fetch(`/items/uploadImage/${productId}/`, config);
      const data = await res.json();
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  // const formdata = new FormData();
  // console.log(formdata)
    console.log("uploadFileHandler");
  }
  const [chipData, setChipData] = useState([ ]);
  const handleClick = (chipValue) => {
    if ( chipData.includes(chipValue)) {
      setChipData((chipData) => chipData.filter((chip) => chip !== chipValue));
    }else{
    setChipData((chipData) => [...chipData, chipValue]);
    console.log(chipData);}
  }
  
  const handleDelete = (chipToDelete) => () => {
    // setChipData((chipData) => chipData.filter((chip) => chip !== chipToDelete));
    console.log(chipData);
  };

  return (
    <div>
      <Link to="/seller/manage" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loading && <Loading />}
        {error && <Message variant="danger">{error}</Message>}
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value) }
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                id="formFile"
                onChange={uploadFileHandler}
              />
              {uploading && <Loading />}
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  >
    <option value="1">산책용품</option>
    <option value="2">간식</option>
    {/* <option value="Clothing">Clothing</option> */}
    {/* Add more options as needed */}
  </Form.Select>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="Tag">
              <Form.Label>Tag</Form.Label>
              <Stack direction="row" spacing={1}>
              <Chip
  label="목줄"
  onClick={() => handleClick("1")}
  onDelete={handleDelete("1")}
  value="1"
  
  deleteIcon={chipData&&chipData.includes("1") ?  <DeleteIcon />:<DoneIcon /> }
/>
<Chip
  label="스텔라앤츄이스"
  onClick={() => handleClick("2")}
  onDelete={handleDelete("2")}
  value="2"
  deleteIcon={chipData&&chipData.includes("2") ?  <DeleteIcon />:<DoneIcon /> }
/>
<Chip
  label="캐츠랑"
  onClick={() => handleClick("3")}
  onDelete={handleDelete("3")}
  value="3"
  deleteIcon={chipData&&chipData.includes("3") ?  <DeleteIcon />:<DoneIcon /> }
/>
<br/><br/>
      
      </Stack>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default ProductUpdateScreen;
