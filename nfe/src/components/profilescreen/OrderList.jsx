import React from "react";
import { Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link } from "react-router-dom";

function Orderlist({ orders }) {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center">
        <div className="w-full lg:w-3/4">
          {orders && orders.length === 0 ? (
            <Paper elevation={3} className="p-6 mt-6">
              <Typography variant="h6" align="center">
                You have no orders
              </Typography>
            </Paper>
          ) : (
            <TableContainer component={Paper} className="shadow-md rounded-lg">
              <Table className="min-w-full">
                <TableHead className="bg-gray-200">
                  <TableRow>
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="center">DATE</TableCell>
                    <TableCell align="center">TOTAL PRICE</TableCell>
                    <TableCell align="center">PAID AT</TableCell>
                    <TableCell align="center">DELIVERED AT</TableCell>
                    <TableCell align="center">DETAIL</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders &&
                    orders.map((order) => (
                      <TableRow key={order.id} className="hover:bg-gray-100">
                        <TableCell align="center" className="py-2">{order.id}</TableCell>
                        <TableCell align="center" className="py-2">{order.created_at.substring(0, 10)}</TableCell>
                        <TableCell align="center" className="py-2">{order.total_price} ₩</TableCell>
                        <TableCell align="center" className="py-2">
                          {order.paid_at ? (
                            order.paid_at.substring(0, 10)
                          ) : (
                            <i className="fas fa-times text-red-500"></i>
                          )}
                        </TableCell>
                        <TableCell align="center" className="py-2">
                          {order.delivered_at ? (
                            order.delivered_at.substring(0, 10)
                          ) : (
                            <i className="fas fa-times text-red-500"></i>
                          )}
                        </TableCell>
                        <TableCell align="center" className="py-2">
                          <Link to={`/order/detail/${order.id}`}>
                            <Button variant="outlined" color="primary" size="small">
                              Details
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orderlist;