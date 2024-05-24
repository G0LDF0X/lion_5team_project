import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../actions/userActions";
import PropTypes from "prop-types";
import UserSetting from "../components/UserSetting";
import SellerApplication from "../components/SellerApplication";
import MyPassword from "../components/MyPassword";
import Settings from "../components/Settings";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div className="p-3">
          {children}
        </div>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function UserSettingScreen() {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserDetails(userInfo.id));
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, navigate]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Settings num={3} userInfo={userInfo}>
      <CustomTabPanel value={3} index={3}>
        <div className="w-full">
          <div className="border-b border-gray-300">
            <div className="flex justify-center space-x-4">
              <button
                className={`py-2 px-4 ${value === 0 ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-700"}`}
                onClick={() => handleChange(null, 0)}
                {...a11yProps(0)}
              >
                회원정보 수정
              </button>
              <button
                className={`py-2 px-4 ${value === 1 ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-700"}`}
                onClick={() => handleChange(null, 1)}
                {...a11yProps(1)}
              >
                알림 설정
              </button>
              <button
                className={`py-2 px-4 ${value === 2 ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-700"}`}
                onClick={() => handleChange(null, 2)}
                {...a11yProps(2)}
              >
                사용자 숨기기 신청
              </button>
              <button
                className={`py-2 px-4 ${value === 3 ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-700"}`}
                onClick={() => handleChange(null, 3)}
                {...a11yProps(3)}
              >
                판매자 신청
              </button>
              <button
                className={`py-2 px-4 ${value === 4 ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-700"}`}
                onClick={() => handleChange(null, 4)}
                {...a11yProps(4)}
              >
                비밀번호 변경
              </button>
              <button
                className={`py-2 px-4 ${value === 5 ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-700"}`}
                onClick={() => handleChange(null, 5)}
                {...a11yProps(5)}
              >
                추천코드
              </button>
            </div>
          </div>
          <CustomTabPanel value={value} index={0}>
            <UserSetting userInfo={userInfo} user={user} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Item Two
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Item Three
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <SellerApplication userInfo={userInfo} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            <MyPassword userInfo={userInfo} user={user} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={5}>
            Item Six
          </CustomTabPanel>
        </div>
      </CustomTabPanel>
    </Settings>
  );
}

export default UserSettingScreen;