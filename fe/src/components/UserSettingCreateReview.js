import React from 'react'
import SearchBox from './SearchBox'
import { Row, Col,Form, Button } from 'react-bootstrap'


function UserSettingCreateReview() {
  return (
    <Row>
        <Col>
            
    <div>       
           <Form className="d-flex">
    <Form.Control
      type="search"
      placeholder="Search"
      className="ml-5"
      aria-label="Search"
    />
    <Button variant="outline-success">Search</Button>
  </Form>
    </div>
 


            {/* {products.map((product) => (
                <Product key={product._id} product={product} />
            ))} */}
      </Col>
    </Row>
  )
}

export default UserSettingCreateReview
