import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserPassword, logout } from "../../store/actions/userActions";

import { mainAxiosInstance } from "../../api/axiosInstances";

function MyPassword({ userInfo, reset }) {
  const [message, setMessage] = useState(null);
  const [loginPassword, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { success } = user;
  

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      setPassword(userInfo.password);
    }

    if (success) {
      dispatch(logout());
      dispatch( reset );
      navigate("/password-change-confirm");
    }
  }, [userInfo, success]);
  
  console.log("Current Token:", userInfo.access); // 액세스 토큰 확인

  const submitHandler = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setMessage("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    } else if (loginPassword !== currentPassword) {
      setMessage("현재 비밀번호가 일치하지 않습니다.");
    } else {
      try {
       
        // 서버에 비밀번호 변경 요청을 보냅니다.
        const response = await mainAxiosInstance.put(
          "/users/updatePassword/",
          { current_password: currentPassword, new_password: newPassword },
          {
            headers: {
              Authorization: `Bearer ${userInfo.access}`,
            },
          }
        );
  
        // 서버에서 응답을 받습니다.
        if (response.status === 200) {
          dispatch(updateUserPassword({ password: newPassword }));
          dispatch(logout());
          navigate("/password-change-confirm");
        } else {
          setMessage(response.data.detail);
        }
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