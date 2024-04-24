import React from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


function SearchBox() {
  return (
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
  )
}

export default SearchBox
