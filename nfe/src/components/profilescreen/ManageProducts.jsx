import React from 'react';
import ItemListSkeleton from '../ItemListSkeleton';
import { Link } from 'react-router-dom';

function ManageProducts({ products, updateHandler, deleteHandler, loading, error }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Products</h1>
      </div>

      {loading ? (
        <ItemListSkeleton />
      ) : error ? (
        <div className="bg-red-500 text-white p-3 rounded">{error}</div>
      ) : (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">NAME</th>
                <th className="py-3 px-6 text-left">PRICE</th>
                <th className="py-3 px-6 text-left">CATEGORY</th>
                <th className="py-3 px-6 text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {products.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="py-3 px-6">{product.id}</td>
                  <td className="py-3 px-6">{product.name}</td>
                  <td className="py-3 px-6">{product.price}₩</td>
                  <td className="py-3 px-6">
                    {product.category_id === 1
                      ? '산책용품'
                      : product.category_id === 2
                      ? '간식'
                      : ''}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                      onClick={() => updateHandler(product.id)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => deleteHandler(product.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ManageProducts;