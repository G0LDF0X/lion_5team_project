import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const TagInput = ({ selectedTags, setSelectedTags }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTagSelect = (product) => {
    setSelectedTags(product.name);
    setSearchTerm('');
  };

  return (
    <div>
      <div className="flex flex-wrap mb-2">
        {selectedTags && (
          <div className="flex items-center bg-gray-200 text-gray-700 px-2 py-1 rounded mr-2 mb-2">
            {selectedTags}
            <button
              type="button"
              className="ml-1 text-red-500"
              onClick={() => setSelectedTags('')}
            >
              ✖
            </button>
          </div>
        )}
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full p-2 border border-gray-300 rounded-md"
        placeholder="Search to tag products"
      />
      {searchTerm && (
        <div className="mt-2 bg-white shadow-md rounded-md max-h-40 overflow-y-auto">
          {products
            .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(product => (
              <div
                key={product.id}
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleTagSelect(product)}
              >
                <img src={`${VITE_API_BASE_URL}${product.image_url}`} alt={product.name} className="w-10 h-10 rounded-full mr-2" />
                <div>
                  <p className="text-gray-500 text-sm">{product.name}</p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default TagInput;