import React from "react";
import { Link } from "react-router-dom";
import Rating from "../Rating";

const MyReview = ({ reviews }) => {
  return (
    <div className="container mx-auto p-4">
      {reviews && reviews.length !== 0 ? (
        reviews.map((review) => (
          <div
            className="my-3 p-3 rounded shadow-md bg-white"
            key={review.item_id}
          >
            <div className="p-4">
              <Link to={`/items/detail/${review.item_id}`}>
                <h4 className="text-lg font-semibold">{review.item_name}</h4>
              </Link>
              <div className="my-3">
                <Rating
                  value={review.rate}
                  text={` ${review.rate}`}
                  color={"#f8e825"}
                />
              </div>
              <span
                dangerouslySetInnerHTML={{ __html: review.content }}
                className="text-black bg-white"
              />
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center h-20">
          <h3>리뷰가 없습니다.</h3>
        </div>
      )}
    </div>
  );
};

export default MyReview;