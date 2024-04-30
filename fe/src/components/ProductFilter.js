import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from 'react';
import { Col, InputGroup, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
// import { listProducts } from '../actions/productActions';
function Filter() {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  useEffect(() => {
    fetch('/items/category')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });

      dispatch(listProducts(selectedCategory));
  }
  , []);



  return (<Row>
    <Col xs={12} md={16}>

            <h3>Category</h3>
    <Form className='filter-form'>
        <div key={`default-checkbox`} className="mb-3">
         {categories.map((category) => (
            <Form.Check // prettier-ignore
            type={'checkbox'}
            id={category.id}
            label={category.name}
            value={category.id}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
            />
        ))}

        </div>
    </Form>
      </Col> 
 
  </Row>
  );
}

export default Filter;