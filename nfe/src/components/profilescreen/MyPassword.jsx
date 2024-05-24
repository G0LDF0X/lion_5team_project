import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserPassword, logout } from "../../store/actions/userActions";

import { mainAxiosInstance } from "../../api/axiosInstances";

function MyPassword({ userInfo }) {
  const [message, setMessage] = useState(null);
  const [loginPassword, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const paswordUpdate = useSelector((state) => state.passwordUpdate);
  const { success } = paswordUpdate;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      setPassword(userInfo.password);
    }

    if (success) {
      dispatch(logout());
      dispatch({ type: USER_UPDATE_PASSWORD_RESET });
      navigate("/password-change-confirm");
    }
  }, [userInfo, success]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (loginPassword !== currentPassword) {
      setMessage("현재 비밀번호가 일치하지 않습니다.");
    } else if (newPassword !== confirmNewPassword) {
      setMessage("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    } else {
      try {
        await mainAxiosInstance.put(
          "/users/updatePassword/",
          { password: newPassword },
          {
            headers: {
              Authorization: `Bearer ${userInfo.access}`,
            },
          }
        );
        dispatch(updateUserPassword({ password: newPassword }));
      } catch (error) {
        console.error("Error:", error);
        setMessage("An error occurred while updating the password.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">비밀번호 변경</h2>
        {message && <div className="mb-4 text-red-500 text-center">{message}</div>}
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="currentPassword" className="block text-gray-700 font-bold mb-2">
              현재 비밀번호 <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="currentPassword"
              placeholder="현재 비밀번호를 입력하세요."
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-700 font-bold mb-2">
              변경할 비밀번호 <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="newPassword"
              placeholder="변경할 새 비밀번호를 입력하세요."
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmNewPassword" className="block text-gray-700 font-bold mb-2">
              변경할 비밀번호 확인 <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              placeholder="변경할 새 비밀번호를 다시 입력하세요."
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MyPassword;