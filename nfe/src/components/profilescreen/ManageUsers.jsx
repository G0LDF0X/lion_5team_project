import React from 'react'
import { Table, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function ManageUsers({deleteUserHandler,users}) {
  return ( <div>
    <h1>Users</h1>
  
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
           
            <th>USER ID</th>
            
            <th>NAME</th>
            <th>EMAIL</th>
            <th>SELLER</th>
            <th>ADMIN</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users&&users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>

              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                {user.is_seller ? (
                  <i className="fas fa-check" style={{ color: "green" }}></i>
                ) : (
                  <i className="fas fa-times" style={{ color: "red" }}></i>
                )}
              </td>
              <td>
                {user.is_staff ? (
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
                  <Button variant="danger" className="btn-sm" onClick={()=>deleteUserHandler(user.id)}>
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

export default ManageUsers
