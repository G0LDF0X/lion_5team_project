import React from 'react'
import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


function ManageSellers({sellers}) {
  return ( <div>
    <h1>Sellers</h1>
  
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>SELLER ID</th>
            <th>USER ID</th>
            <th>BS NUMBER</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sellers&&sellers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.user_id}</td>
              <td>{user.bs_number}</td>
              <td>{user.user}</td>
              <td>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </td>
              <td>
                {user.isAdmin ? (
                  <i className="fas fa-check" style={{ color: "green" }}></i>
                ) : (
                  <i className="fas fa-times" style={{ color: "red" }}></i>
                )}
              </td>
              <td>
                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                  <Button variant="light" className="btn-sm">
                    <i className="fas fa-edit"></i>
                  </Button>
                </LinkContainer>
                  <Button variant="danger" className="btn-sm" onClick={()=>userDeleteHandler(user.user_id)}>
                      <i className="fas fa-trash"></i>
                  </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    
  </div>
  )
}

export default ManageSellers
