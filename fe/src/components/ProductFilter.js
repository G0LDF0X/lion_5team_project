import Form from 'react-bootstrap/Form';
import { Col, InputGroup, Row } from 'react-bootstrap';
function Filter() {
async function getCategory() {
    const res = await fetch('http://localhost:8000/api/category');
    const data = await res.json();
    return data;
}
const categories = getCategory();


  return (<Row>
    <Col xs={12} md={16}>
      
    <Form className='filter-form'>
        <div key={`default-checkbox`} className="mb-3">
            <h3>Category</h3>
         {categories.map((category) => (
            <Form.Check // prettier-ignore
            type={'checkbox'}
            id={category.id}
            label={category.name}
            />
        ))}

      <div>
  <h4>Price</h4>
  {/* <Form.Label htmlFor="customRange1" className="form-label small-label" /> */}
</div>
      {/* <Form.Range /> */}
<InputGroup className="mb-2 small-input-group" sm>
  <InputGroup.Text>$</InputGroup.Text>
  <InputGroup.Text>0.00</InputGroup.Text>
  <Form.Control aria-label="Dollar amount (with dot and two decimal places)" />
  <InputGroup.Text>9999.99</InputGroup.Text>
  <InputGroup.Text>$</InputGroup.Text>
</InputGroup>
        </div>
    </Form>
      </Col> 
 
  </Row>
  );
}

export default Filter;