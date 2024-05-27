import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Box, Typography, CircularProgress, IconButton } from "@mui/material";
import { Delete, Edit, Add } from "@mui/icons-material";
import Message from "../Message";
import Loading from "../Loading";
import { deleteProduct, createProduct, listProductDetails } from "../../store/actions/productActions";
import ItemListSkeleton from "../ItemListSkeleton";
import { mainAxiosInstance } from "../../api/axiosInstances";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import ProductCreateModal from "../../modals/ProductCreate";
function SellerItem({ userInfo }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;
  const productCreate = useSelector((state) => state.productCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;
  const productUpdate = useSelector((state) => state.productUpdate);
  const { success: successUpdate } = productUpdate;

  const createProductHandler = () => {
    // dispatch(createProduct());
    setOpenModal(true); 
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await mainAxiosInstance.get("/items/myitems", {
          headers: {
            Authorization: `Bearer ${userInfo.access}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

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
    // navigate(`/items/update/${id}`);
    dispatch(listProductDetails(id));
  };

  return (
    <div className="container mx-auto py-8">
      <ProductCreateModal isOpen={openModal} onClose={() => setOpenModal(false)} />
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