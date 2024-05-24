import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { mainAxiosInstance } from "../../api/axiosInstances";

const Follow = ({ userInfo }) => {
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    mainAxiosInstance.get(`/users/following/${userInfo.id}/`, {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    })
      .then((response) => {
        const data = response.data;
        const promises = data.map((follow) =>
          mainAxiosInstance.get(`/users/detail/${follow.followed_id}`)
        );

        Promise.all(promises).then((responses) => {
          const userData = responses.map((response) => response.data);
          const followingWithUserData = data.map((follow, index) => ({
            ...follow,
            user: userData[index],
          }));
          setFollowing(followingWithUserData);
        });
      })
      .catch((error) => console.error("Error:", error));
  }, [userInfo]);

  return (
      <div className="flex flex-wrap">
        {following.length === 0 && <h1>팔로잉한 유저가 없습니다.</h1>}
      {following.map((follow, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-4 m-4 w-72"
        >
          <div className="flex flex-col items-center">
            <h5 className="text-lg font-bold mb-2">{follow.followed_username}</h5>
            <p className="text-gray-500 mb-4">{follow.created_at.split("T")[0]}</p>
            <Link to={`/users/${follow.followed_id}`} className="w-full">
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-full">
                바로가기
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Follow;