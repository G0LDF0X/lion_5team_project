import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
<<<<<<< HEAD
import { updateUserProfile, getUserDetails } from "../../store/slices/userSlices";
=======
import { updateUserProfile, getUserDetail } from "../../store/actions/userActions";
>>>>>>> main
import {mainAxiosInstance} from "../../api/axiosInstances";

function UserSetting({ userInfo, userDetail, reset }) {
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { success } = user;
  const [message, setMessage] = useState("");
  const nicknameRef = useRef();
  const emailRef = useRef();
``
  useEffect(() => {
    if (success) {
      alert('수정이 완료되었습니다.');
      window.location.reload();
      dispatch(reset);
    }
  }, [success]);

  const handleImageChange = async (e) => {
    console.log("handleImageChange activated");

    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image_url", image);

    try {
      const response = await mainAxiosInstance.put("/users/updateImage/", formData, {
        headers: {
          Authorization: `Bearer ${userInfo.access}`,
        },
      });
      if (response.status === 200) {
        setMessage("Image uploaded successfully");
<<<<<<< HEAD
        dispatch(getUserDetails(userInfo.id));
=======
        dispatch(getUserDetail(userInfo.id));
>>>>>>> main
      } else {
        console.log("image upload", response.data.message);
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error(error.message);
      setMessage(error.message);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        nickname: nicknameRef.current.value,
        email: emailRef.current.value,
      })
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center">
        <div className="flex flex-col items-center">
        <label htmlFor="fileInput">
            {userDetail.user&& userDetail.user.image_url ? (
                <img
                    src={VITE_API_BASE_URL + user.user.image_url}
                    alt="User"
                    className="rounded-full w-40 h-40 object-cover"
                />
            ) : (
                <img
                    src="https://placehold.co/400"
                    alt="Placeholder"
                    className="rounded-full w-40 h-40 object-cover"
                />
            )}
        </label>
          <input
            type="file"
            id="fileInput"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <div className="w-full max-w-md">
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label htmlFor="nickname" className="block text-gray-700">
                닉네임 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nickname"
                placeholder={userDetail.user&& userDetail.user.nickname}
                ref={nicknameRef}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder={userDetail.user && userDetail.user.email}
                ref={emailRef}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      {message && (
        <div className="flex justify-center mt-4">
          <p className="text-red-500">{message}</p>
        </div>
      )}
    </div>
  );
}

export default UserSetting;