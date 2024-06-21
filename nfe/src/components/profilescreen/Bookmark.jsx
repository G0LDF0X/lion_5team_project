import React from "react";
import { Link } from "react-router-dom";
import { Typography} from '@mui/material';



const Bookmark = ({ bookMarkItems }) => {
  return (
    <div className="flex flex-wrap">
      <div className="container mx-auto py-8">
      <Typography variant="h4" className="mb-10 font-bold text-gray-800">
        나의 북마크
      </Typography>
      {bookMarkItems && bookMarkItems.length > 0 ? (
        bookMarkItems.map((bookmark) => (
          <div
            key={bookmark.id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
          >
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{bookmark.name}</h2>
                <h3 className="text-md text-gray-600 mb-2">
                  {bookmark.price}원
                </h3>
                <span className="bg-blue-500 text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                  {bookmark.category}
                </span>
                <p className="text-gray-700 mt-2">
                  {bookmark.description &&
                  bookmark.description.length > 30
                    ? `${bookmark.description.substring(0, 30)}...`
                    : bookmark.description}
                </p>
                <Link to={`/items/detail/${bookmark.item_id}`}>
                  <button className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    바로가기
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : ( <div className="w-full p-4 text-center">  
        <div className="text-center bg-white shadow-md rounded-lg  mb-8 mt-8 p-4 max-w-xxl mx-auto">
                    <h1 className="mb-8 mt-8 text-center text-xl text-gray-700" >등록된 북마크가 없습니다.</h1>
             </div>
      </div>  
      )}
    </div>
    </div>
  );
};

export default Bookmark;