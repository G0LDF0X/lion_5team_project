import React from 'react';

function CreateReview() {
  return (
    <div className="flex justify-center py-4">
      <div className="w-full max-w-md">
        <form className="flex">
          <input
            type="search"
            placeholder="Search"
            aria-label="Search"
            className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-r-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateReview;