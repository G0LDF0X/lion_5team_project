import React from 'react'
import { Link } from 'react-router-dom'

function Settings({ num, children, userInfo }) {

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <div className="w-full">
      <div className="border-b border-gray-300">
        <div className="flex justify-center space-x-4">
          <Link to="/users/profile">
            <button
              className={`py-2 px-4 ${num === 0 ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-700"}`}
              {...a11yProps(0)}
            >
              프로필
            </button>
          </Link>
          <Link to="/users/myshopping">
            <button
              className={`py-2 px-4 ${num === 1 ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-700"}`}
              {...a11yProps(1)}
            >
              나의 쇼핑
            </button>
          </Link>
          <Link to="/users/myreview">
            <button
              className={`py-2 px-4 ${num === 2 ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-700"}`}
              {...a11yProps(2)}
            >
              나의 리뷰
            </button>
          </Link>
          <Link to="/users/setting">
            <button
              className={`py-2 px-4 ${num === 3 ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-700"}`}
              {...a11yProps(3)}
            >
              설정
            </button>
          </Link>
          {(userInfo && userInfo.is_seller) || (userInfo && userInfo.is_staff) ? (
            <Link to="/seller/manage">
              <button
                className={`py-2 px-4 ${num === 4 ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-700"}`}
                {...a11yProps(4)}
              >
                판매자 관리
              </button>
            </Link>
          ) : null}
          {userInfo && userInfo.is_staff ? (
            <Link to="/admin/manage">
              <button
                className={`py-2 px-4 ${num === 5 ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-700"}`}
                {...a11yProps(5)}
              >
                관리자
              </button>
            </Link>
          ) : null}
        </div>
      </div>

      <div>
        {children}
      </div>
    </div>
  );
}

export default Settings;