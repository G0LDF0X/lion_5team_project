import React from 'react'
import ItemListSkeleton from '../ItemListSkeleton'
import { Row, Col, Table, Button } from 'react-bootstrap'
function ManageProducts({products, updateHandler, deleteHandler, loading, error}) {
  return ( <div>
    <Row className="align-items-center">
      <Col>
        <h1>Products</h1>
      </Col>
     
    </Row>
    
    {loading ? (
      <ItemListSkeleton />
    ) : error ? (
      <Message variant="danger">{error}</Message>
    ) : (
      <div>
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}₩</td>
                {product.category_id === 1 ? (
                  <td>산책용품</td>
                ) : product.category_id === 2 ? (
                  <td>간식</td>
                ) : null}
                <td>
                  <Button variant="light" className="btn-sm" onClick={() => updateHandler(product.id)}>
                    <i className="fas fa-edit"></i>
                  </Button>
                  <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(product.id)}>
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )}
  </div>
  )
}

export default ManageProducts
