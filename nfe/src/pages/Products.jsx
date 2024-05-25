import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../store/actions/productActions";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Product from "../components/Product";
import { FormControl, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { mainAxiosInstance } from "../api/axiosInstances";
function ProductsScreen() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages } = productList;

  const params = new URLSearchParams(location.search);
  const query = params.get('query') || '';
  const page = params.get('page') || 1;
  const tag = params.get('tag');

const getCategories = async () => {
    const response = await mainAxiosInstance('/items/category');
    setCategories(response.data);
}

getCategories()
useEffect(() => {
    dispatch(listProducts({query:query, page:page, category:selectedCategory}));
}, [dispatch, query, tag, page, selectedCategory]);

  const handleCategoryChange = (e) => {
    if (e.target.checked) {
      setSelectedCategory((prev) => [...prev, e.target.value]);
    } else {
      setSelectedCategory((prev) => prev.filter((cat) => cat !== e.target.value));
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 p-4">
          <h3 className="text-2xl font-bold mb-4">Category</h3>
          <FormControl component="fieldset">
            <FormGroup>
              {categories.map((category) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      value={category.id}
                      onChange={handleCategoryChange}
                      color="primary"
                    />
                  }
                  label={category.name}
                  key={category.id}
                />
              ))}
            </FormGroup>
          </FormControl>
        </div>
        <div className="w-full md:w-3/4 p-4">
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              {query && <h6 className="text-xl mb-4">{query}에 관한 검색결과</h6>}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Product key={product.id} product={product} id={product.id} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="pagination-container">
        {/* Pagination component if available */}
      </div>
    </div>
  );
}

export default ProductsScreen;