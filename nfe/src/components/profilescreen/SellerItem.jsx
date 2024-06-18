import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, IconButton, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import ProductCreateModal from "../../modals/ProductCreate";
import ProductUpdateModal from "../../modals/ProductUpdate";
import { deleteProduct, createProduct, listProductDetails, updateProduct } from "../../store/actions/productActions";
function SellerItem({ fetchProducts, products, isLoading}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;
  const productCreate = useSelector((state) => state.productCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;
  const productUpdate = useSelector((state) => state.productUpdate);
  const { success: successUpdate } = productUpdate;
  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;
  const createProductHandler = () => {
    setOpenModal(true); 
  };
  
  useEffect(() => {
    fetchProducts();
  }, [navigate, successCreate, successDelete, successUpdate]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    } else {
      navigate("/seller/manage");
    }
  };

  const updateHandler = (id) => {
    setOpenUpdateModal(true);
    dispatch(listProductDetails(id));
  };

  return (
    <div className="container mx-auto py-8">
      <ProductCreateModal isOpen={openModal} onClose={() => setOpenModal(false)} createProduct={createProduct} />
      <ProductUpdateModal isOpen={openUpdateModal} onClose={() => setOpenUpdateModal(false)} updateProduct={updateProduct} product={product} />
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Products</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={createProductHandler}
        >
          상품 등록
        </Button>
      </Box>

      {loadingDelete && <Loading />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loading />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {isLoading ? (
        <ItemListSkeleton />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>NAME</TableCell>
                <TableCell>PRICE</TableCell>
                <TableCell>CATEGORY</TableCell>
                <TableCell align="right">ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>
                    <Link to={`/items/detail/${product.id}`} className="text-blue-500 hover:underline">
                      {product.name}
                    </Link>
                  </TableCell>
                  <TableCell>{product.price}₩</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => updateHandler(product.id)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => deleteHandler(product.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default SellerItem;