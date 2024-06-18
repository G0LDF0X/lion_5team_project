import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../store/actions/productActions";
import Loading from "../components/Loading";
import Message from "../components/Message";
import Product from "../components/Product";
import { FormControl, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';
import useCategory from "../hook/useCategory";
import { mainAxiosInstance } from "../api/axiosInstances";

import Pagination from '@mui/material/Pagination';

function ProductsScreen() {
  const location = useLocation();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지 상태 추가

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, totalPages, currentPage: apiCurrentPage } = productList;

  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  const params = new URLSearchParams(location.search);
  const query = params.get('query') || '';
  const page = params.get('page') || 1;
  const tag = params.get('tag');
  const suggestions = params.get('s') || ''; 

  useEffect(() => {

    dispatch(listProducts({query:query, page:currentPage, category:selectedCategory, suggestions:suggestions})); // currentPage로 수정
    if (selectedCategory.length === 1) {
      fetchTags(selectedCategory[0]);
    } else {
      setTags([]);
    }
      }, [dispatch, query, tag, currentPage, selectedCategory, suggestions ]); // currentPage로 수정

  const categories = useCategory();



  const handleCategoryChange = (e) => {
    const value = e.target.value;
    const newSelectedCategories = e.target.checked
      ? [...selectedCategory, value]
      : selectedCategory.filter((cat) => cat !== value);

    setSelectedCategory(newSelectedCategories);
    setCurrentPage(1);  // 카테고리 변경 시 페이지를 1로 초기화
    navigate(`?query=${query}&page=1&category=${newSelectedCategories.join(',')}`);
    dispatch(listProducts({ query, page: 1, category: newSelectedCategories, suggestions }));
  };

  const fetchTags = async (categoryId) => {
    try {
      const response = await mainAxiosInstance.get(`/items/tags/${categoryId}`);
      setTags(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handlePageChange = (event, value) => {
    setCurrentPage(value); // currentPage 상태 업데이트
    navigate(`?query=${query}&page=${value}`);
   
  };


  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 p-4">
          <h3 className="text-2xl font-bold mb-4">Category</h3>
          <FormControl component="fieldset">
            <FormGroup>
              {categories && categories.map((category) => (
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

                {(Array.isArray(products) ? products : []) // 배열이 아닌 경우 빈 배열 사용
                  .filter(product => !selectedTag || (product.tag_id === selectedTag.id))
                  .map((product) => (
                    <Product key={product.id} product={product} id={product.id} />
                  ))}
              </div>
              
            </>
          )}
          <Pagination
            count={totalPages} // 총 페이지 수
            page={parseInt(currentPage, 10)} // 현재 페이지를 currentPage로 수정
            onChange={handlePageChange} // 페이지 변경 핸들러
            sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductsScreen;