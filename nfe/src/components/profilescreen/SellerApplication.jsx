import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mainAxiosInstance } from "../../api/axiosInstances";
import useSeller from "../../hook/useSeller";

const SellerApplication = ({ userInfo }) => {
  const [bsNumber, setBsNumber] = useState("");
  const [error, setError] = useState("");
  const [isSeller, setIsSeller] = useState(false);
  const navigate = useNavigate();
  useSeller(setIsSeller, userInfo);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const pattern = /^\d{10}$/;
    if (!pattern.test(bsNumber)) {
      setError("BS_NUMBER는 10자리 숫자로 입력해주세요.");
      console.log(userInfo);
    } else {
      try {
        const response = await mainAxiosInstance.post(
          "/seller/apply/",
          { bs_number: bsNumber, user: userInfo.username},
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${userInfo.access}`,
            },
          }
        );

        console.log(response.status);
        if (response.status !== 201) {
          throw new Error("Network response was not ok");
        }
        setBsNumber("");
        setError("");
        alert("판매자 신청이 완료되었습니다. 로그아웃 후 재로그인 하시면 판매자 페이지를 이용하실 수 있습니다.");

        setIsSeller(true);
        navigate("/");
        dispatch
      } catch (error) {
        setError("An error occurred while saving the data.");
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      {userInfo && userInfo.is_seller ? (
        <div
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4"
          role="alert"
        >
          <p className="font-bold">판매자 신청 완료</p>
          <p>판매자 신청이 완료되었습니다.</p>
        </div>
      ) : (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                판매자 신청하기
              </div>
              <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-4">
                  <label
                    htmlFor="bs_Number"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    BS_NUMBER:
                  </label>
                  <input
                    type="text"
                    id="bs_Number"
                    value={bsNumber}
                    onChange={(e) => setBsNumber(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {error && (
                    <p className="text-red-500 text-xs italic">{error}</p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerApplication;
