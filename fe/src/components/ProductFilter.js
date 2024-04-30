import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from 'react';
import { Col, InputGroup, Row } from 'react-bootstrap';
function Filter() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch('/items/category')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
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
            />
        ))}

      <div>
  {/* <h4>Price</h4> */}
  {/* <Form.Label htmlFor="customRange1" className="form-label small-label" /> */}
</div>
      {/* <Form.Range /> */}
{/* <InputGroup className="mb-2 small-input-group" sm>
  <InputGroup.Text>$</InputGroup.Text>
  <InputGroup.Text>0.00</InputGroup.Text>
  <Form.Control aria-label="Dollar amount (with dot and two decimal places)" />
  <InputGroup.Text>9999.99</InputGroup.Text>
  <InputGroup.Text>$</InputGroup.Text>
</InputGroup> */}
        </div>
    </Form>
      </Col> 
 
  </Row>
  );
}

export default Filter;