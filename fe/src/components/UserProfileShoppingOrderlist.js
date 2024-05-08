import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Message from "./Message";
import Loading from "./Loading";
import { Typography, Paper } from '@material-ui/core';

function UserProfileShoppingOrderlist() {
  const myOrderList = useSelector((state) => state.myOrderList);
  const { loading: loadingOrders, error: errorOrders, orders } = myOrderList;

  return (
    <Row>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loading />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : orders && orders.length !== 0 ? (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL PRICE</th>
                <th>PAID AT</th>
                <th>DELIVERED AT</th>
                <th>DETAIL</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((orderItem) => (
                <tr key={orderItem.id}>
                  <td>{orderItem.id}</td>
                  <td>{orderItem.created_at ? orderItem.created_at.substring(0, 10) : '-'}</td>
                  <td>{orderItem.total_price}</td>
                  <td>{orderItem.paid_at ? orderItem.paid_at.substring(0, 10) : '-'}</td>
                  <td>{orderItem.delivered_at ? orderItem.delivered_at.substring(0, 10) : '-'}</td>
                  <td>
                    <LinkContainer to={`/order/detail/${orderItem.id}`}>
                      <Button variant="light" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
            <Typography variant="h6" align="center">You have no orders</Typography>
          </Paper>
        )}
      </Col>
    </Row>
  );
}

export default UserProfileShoppingOrderlist;
