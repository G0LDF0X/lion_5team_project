import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../store/actions/productActions";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Product from "../components/Product";
import { FormControl, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';
import useCategory from "../hook/useCategory";
import { mainAxiosInstance } from "../api/axiosInstances";

function ProductsScreen() {
  const location = useLocation();
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState([]);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages } = productList;

  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  const params = new URLSearchParams(location.search);
  const query = params.get('query') || '';
  const page = params.get('page') || 1;
  const tag = params.get('tag');
  const suggestions = params.get('s') || ''; 

  useEffect(() => {
    dispatch(listProducts({query:query, page:page, category:selectedCategory, suggestions:suggestions}));
  }, [dispatch, query, tag, page, selectedCategory, suggestions ]);

  useEffect(() => {
    if (selectedCategory.length === 1) {
      fetchTags(selectedCategory[0]);
    } else {
      setTags([]);
    }
  }, [selectedCategory]);

  const categories = useCategory();

  const handleCategoryChange = (e) => {
    setSelectedCategory((prev) => 
      e.target.checked ? [...prev, e.target.value] : prev.filter((cat) => cat !== e.target.value)
    );
  };
  
  const fetchTags = async (categoryId) => {
    try {
      const response = await mainAxiosInstance.get(`/items/tags/${categoryId}`);
      setTags(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 p-4">
          <h3 className="text-2xl font-bold mb-4">Category</h3>
          <FormControl component="fieldset">
            <FormGroup>
              {categories&&categories.map((category) => (
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

              <div>
                {tags.map(tag => (
                  <Button 
                    key={tag.id} 
                    variant="outlined" 
                    color="primary" 
                    onClick={() => setSelectedTag(tag)}
                    style={{ margin: '10px' }}
                  >
                    {tag.name}
                  </Button>
                ))}
              </div>

              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products
                  .filter(product => {
                    const selectedCategoryAsNumbers = selectedCategory.map(Number);
                    return (selectedCategoryAsNumbers.length === 0 || selectedCategoryAsNumbers.includes(product.category_id)) && (!selectedTag || (product.tag_id === selectedTag.id));
                  })
                  .map((product) => (
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