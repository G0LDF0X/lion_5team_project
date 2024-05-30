import React from 'react'
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
 


      </Col>
    </Row>
  )
}

export default UserSettingCreateReview
