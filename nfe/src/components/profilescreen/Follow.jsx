import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { mainAxiosInstance } from "../../api/axiosInstances";
import { Typography} from '@mui/material';


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
    <div className="container mx-auto py-8">
      <Typography variant="h4" className="mb-8 font-bold text-gray-800">
        나의 팔로잉
      </Typography>
    {following.length === 0 ? (
      <div className="w-full p-4 text-center">
      <div className="border border-gray-300 p-8 w-full h-auto mt-10 rounded-md shadow-sm">
          <h1 className="text-center text-2xl font-bold text-gray-700">
              팔로잉 한 유저가 없습니다.
          </h1>
      </div>
      </div>
    ) : (
      <div className="flex flex-wrap -mx-2">
        {following.map((follow, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  {follow.followed_username}
                </h2>
                <p className="text-gray-600 mb-4">
                  {follow.created_at.split("T")[0]}
                </p>
                <Link to={`/users/${follow.followed_id}`}>
                  <button className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    바로가기
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  );
};

export default Follow;