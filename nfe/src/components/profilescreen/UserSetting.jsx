import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateUserProfile,
  getUserDetail,
  logout,
  deleteUserAccount,
} from "../../store/actions/userActions";
import { mainAxiosInstance } from "../../api/axiosInstances";

function UserSetting() {
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { userInfo, userDetail, updateSuccess, deleteSuccess } = user;
  const [message, setMessage] = useState("");
  const nicknameRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    if (deleteSuccess) {
      alert("회원 탈퇴가 완료되었습니다.");
      dispatch(logout());
      navigate("/");
    }
  }, [deleteSuccess, navigate, dispatch]);

  useEffect(() => {
    if (updateSuccess) {
      alert("수정이 완료되었습니다.");
      // window.location.reload();
      dispatch(logout());
      navigate("/");
    }
  }, [updateSuccess, dispatch, navigate]);

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserDetail(userInfo.id));
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (userDetail && userDetail.user) {
      nicknameRef.current.value = userDetail.nickname;
      emailRef.current.value = userDetail.email;
    }
  }, [userDetail]);

  const handleImageChange = async (e) => {
    console.log("handleImageChange activated");

    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image_url", image);

    try {
      const response = await mainAxiosInstance.put(
        "/users/updateImage/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userInfo.access}`,
          },
        }
      );
      if (response.status === 200) {
        setMessage("Image uploaded successfully");
        dispatch(getUserDetail(userInfo.id));
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

  const handleDeleteAccount = () => {
    if (window.confirm("정말로 탈퇴하시겠습니까?")) {
      dispatch(deleteUserAccount()).catch((error) => {
        console.error("회원 탈퇴 실패:", error);
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center">
        <div className="flex flex-col items-center">
          <label htmlFor="fileInput">
            {userDetail && userDetail.image_url ? (
              <img
                src={VITE_API_BASE_URL + userDetail.image_url}
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
                ref={nicknameRef}
                defaultValue={userDetail && userDetail.nickname}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                ref={emailRef}
                defaultValue={userDetail && userDetail.email}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
              >
                Update
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
              >
                Delete Account
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
