import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, IconButton, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Pagination } from "@mui/material";
import ProductCreateModal from "../../modals/ProductCreate";
import ProductUpdateModal from "../../modals/ProductUpdate";
import { deleteProduct, createProduct, listProductDetails, updateProduct, listMyProducts } from "../../store/actions/productActions";
import { Add, Delete, Edit } from "@mui/icons-material";
import ItemListSkeleton from "../ItemListSkeleton";
import Loading from "../Loading";
import Message from "../Message"; // Ensure Message is imported

function SellerItem({ fetchProducts, isLoading }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;
  const productCreate = useSelector((state) => state.productCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;
  const productUpdate = useSelector((state) => state.productUpdate);
  const { success: successUpdate } = productUpdate;
  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;
  const productLists = useSelector((state) => state.productList);
  const { loading, error, products, totalPages } = productLists;
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const createProductHandler = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    dispatch(listMyProducts({ page: currentPage }));
  }, [dispatch, navigate, successCreate, successDelete, successUpdate, currentPage]);

  useEffect(() => {
    console.log('Products:', products.items);
  }, [products]);

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

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
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
      {loading ? (
        <ItemListSkeleton />
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>IMAGE</TableCell>
                  <TableCell>NAME</TableCell>
                  <TableCell>PRICE</TableCell>
                  <TableCell>CATEGORY</TableCell>
                  <TableCell align="right">ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {console.log(products)}
                {Array.isArray(products) && products.length > 0 ? (
                  products
                  .slice() // 배열 복사
                  .sort((a, b) => a.id - b.id).map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.id}</TableCell>
                      <TableCell>
                        <img src={VITE_API_BASE_URL + product.image_url} alt={product.name} style={{ width: "50px", height: "auto" }} />
                      </TableCell>
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
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No products found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
        </>
      )}
    </div>
  );
}

export default SellerItem;
