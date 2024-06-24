import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Modal, Box, Chip, Stack, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

import Message from "../components/Message";
import Loading from "../components/Loading";
import { Done, Delete, Close } from "@mui/icons-material";
import useCategory from "../hook/useCategory";
import useTags from "../hook/useTags";

function ProductUpdateModal({ isOpen, onClose, updateProduct, product }) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  console.log("PRODUCT:", product);
  console.log("PRODUCT.IMAGE_URL:", product.image_url);
  const [id, setId] = useState(product.id);
  const [image, setImage] = useState(product.image_url);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const  categories  = useCategory(); 
  const tags = useTags();
  const dispatch = useDispatch();
  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading, error, success } = productUpdate;

  const [previewImage, setPreviewImage] = useState(product.image_url);
  console.log("PREVIEWIMAGE:", previewImage);

  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (product) {
      setId(product.id);
      setName(product.name);
      setPrice(product.price);
      setCategory(product.category ? product.category_id : "");
      setDescription(product.description);
      setChipData(product.tags || []);
    }
  }, [product]);

  useEffect(() => {
    setPreviewImage(product.image_url);
  }, [product.image_url]);
    

  const submitHandler = (e) => {
    e.preventDefault();
    const product = {
      id,
      name,
      price,
      image,
      category,
      description,
      tag: chipData,
    };
    dispatch(updateProduct(product));
    if (success) {
      onClose();
    }
    
  };

  const [chipData, setChipData] = useState(null)
  const handleClick = (tagId) => {
    setChipData(prevChipData => prevChipData === tagId ? null : tagId);
  };
  const filteredTags = tags.filter(tag => tag.category_id === category);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className="w-full max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <h1 className="text-2xl mb-4">Update Product</h1>
      <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          <Close />
        </button>
        {loading && <Loading />}
        {error && <Message variant="danger">{error}</Message>}
        <form onSubmit={submitHandler}>
        <FormControl fullWidth variant="outlined" className="mb-4">
        <InputLabel shrink>Name</InputLabel>
          <TextField
            fullWidth
            variant="outlined"
            value={name}
            pl
            onChange={(e) => setName(e.target.value)}
            className="mb-4"
          />
          </FormControl>
          <div className="mb-4"/>
        <FormControl fullWidth variant="outlined" className="mb-4">
        <InputLabel shrink>Price</InputLabel>
          <TextField
            fullWidth
            variant="outlined"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mb-4"
          />
        </FormControl>
          <div className="mb-4"/>
          <Button
            variant="contained"
            component="label"
            className="mb-4"
          >
            Upload Image
            <input
              type="file"
              hidden
              onChange={(e) => {
                setImage(e.target.files[0]);
                const reader = new FileReader();
                reader.onload = () => {
                  setPreviewImage(reader.result);
                };
                reader.readAsDataURL(e.target.files[0]);
              }}
            />
          </Button>
          {uploading && <Loading />}
          {previewImage && 
          <img
          src={previewImage.startsWith('http') || previewImage.startsWith('data') ? previewImage : VITE_API_BASE_URL + previewImage}
          alt="Preview"
          style={{marginTop: '20px'}} />}
          <div className="mb-4"/>
          <FormControl fullWidth variant="outlined" className="mb-4">
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="mb-4"/>
          <FormControl fullWidth variant="outlined" className="mb-4">
            <InputLabel shrink>Description</InputLabel>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mb-4"
            />
          </FormControl>
          <div className="mb-4"/>
          <FormControl fullWidth variant="outlined" className="mb-4">
          <Stack direction="row" spacing={1} flexWrap="wrap">
              {filteredTags.map((tag) => (
                <Chip
                  key={tag.id}
                  label={tag.name}
                  onClick={() => handleClick(tag.id.toString())}
                  color={chipData === tag.id.toString() ? "primary" : "default"}
                  icon={chipData === tag.id.toString() ? <Delete /> : <Done />}

                />
              ))}
            </Stack>
          </FormControl>
          <div className="mb-4"/>
          <Button type="submit" variant="contained" color="primary" className="w-full">
            Update
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default ProductUpdateModal;