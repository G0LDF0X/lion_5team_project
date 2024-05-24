import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetail } from "../store/actions/userActions";
import { listBookMark } from "../store/actions/bookMarkActions";
import PropTypes from "prop-types";
import UserProfileMain from "../components/profilescreen/UserProfileMain";
import MyBoard from "../components/profilescreen/MyBoard";
// import Follow from "../components/Follow";
// import UserQnA from "../components/UserQnA";
// import Bookmark from "../components/Bookmark";


function CustomTabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div className="p-4">
          <div>{children}</div>
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

function UserProfileScreen() {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  const bookMarkList = useSelector((state) => state.bookMarkList);
  const { bookMarkItems } = bookMarkList;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!userInfo || !userInfo.username) {
      navigate("/login");
    } else {
      dispatch(listBookMark());
      dispatch(getUserDetail(userInfo.id));
    }
  }, [dispatch, navigate, userInfo]);

  return (
    
      <div className="w-full">
        <div className="border-b border-gray-300">
          <div className="flex justify-center">
            <button
              className={`py-2 px-4 ${
                value === 0 ? "border-b-2 border-blue-500 text-blue-500" : ""
              }`}
              onClick={() => handleChange(null, 0)}
              {...a11yProps(0)}
            >
              모두보기
            </button>
            <button
              className={`py-2 px-4 ${
                value === 1 ? "border-b-2 border-blue-500 text-blue-500" : ""
              }`}
              onClick={() => handleChange(null, 1)}
              {...a11yProps(1)}
            >
              사진
            </button>
            <button
              className={`py-2 px-4 ${
                value === 2 ? "border-b-2 border-blue-500 text-blue-500" : ""
              }`}
              onClick={() => handleChange(null, 2)}
              {...a11yProps(2)}
            >
              팔로잉
            </button>
            <button
              className={`py-2 px-4 ${
                value === 3 ? "border-b-2 border-blue-500 text-blue-500" : ""
              }`}
              onClick={() => handleChange(null, 3)}
              {...a11yProps(3)}
            >
              질문과 답변
            </button>
            <button
              className={`py-2 px-4 ${
                value === 4 ? "border-b-2 border-blue-500 text-blue-500" : ""
              }`}
              onClick={() => handleChange(null, 4)}
              {...a11yProps(4)}
            >
              북마크
            </button>
            <button
              className={`py-2 px-4 ${
                value === 5 ? "border-b-2 border-blue-500 text-blue-500" : ""
              }`}
              onClick={() => handleChange(null, 5)}
              {...a11yProps(5)}
            >
              좋아요
            </button>
          </div>
        </div>
        <CustomTabPanel value={value} index={0}>
          <UserProfileMain userInfo={userInfo} user={user} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <MyBoard userInfo={userInfo} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          {/* <Follow userInfo={userInfo} /> */}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          {/* <UserQnA userInfo={userInfo} /> */}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          {/* <Bookmark bookMarkItems={bookMarkItems} /> */}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          Item Seven
        </CustomTabPanel>
      </div>
    
  );
}

export default UserProfileScreen;
