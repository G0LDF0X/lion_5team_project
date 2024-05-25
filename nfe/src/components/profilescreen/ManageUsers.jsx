import React from 'react';
import { Link } from 'react-router-dom';

function ManageUsers({ deleteUserHandler, users }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Users</h1>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6 text-left">USER ID</th>
              <th className="py-3 px-6 text-left">NAME</th>
              <th className="py-3 px-6 text-left">EMAIL</th>
              <th className="py-3 px-6 text-center">SELLER</th>
              <th className="py-3 px-6 text-center">ADMIN</th>
              <th className="py-3 px-6 text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {users && users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="py-3 px-6">{user.id}</td>
                <td className="py-3 px-6">{user.username}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6 text-center">
                  {user.is_seller ? (
                    <i className="fas fa-check text-green-500"></i>
                  ) : (
                    <i className="fas fa-times text-red-500"></i>
                  )}
                </td>
                <td className="py-3 px-6 text-center">
                  {user.is_staff ? (
                    <i className="fas fa-check text-green-500"></i>
                  ) : (
                    <i className="fas fa-times text-red-500"></i>
                  )}
                </td>
                <td className="py-3 px-6 text-center">
                  <Link to={`/admin/user/${user._id}/edit`} className="text-blue-600 hover:text-blue-800">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                      <i className="fas fa-edit"></i>
                    </button>
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
                    onClick={() => deleteUserHandler(user.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageUsers;