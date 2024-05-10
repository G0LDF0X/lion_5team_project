import React, { useEffect, useState } from "react";
// import UserSettingNavBar from '../components/UserSetitngNavbar'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getUserDetails,
  listSellers,
  listUsers,
  logout,
} from "../actions/userActions";
import { listBookMark } from "../actions/bookmarkActions";
import { Tab, Tabs, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import UserProfileMain from "../components/UserProfileMain";
import MyBoard from "../components/MyBoard";
import Follow from "../components/Follow";
import UserQnA from "../components/UserQnA";
import Bookmark from "../components/Bookmark";
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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
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
  const [myBoards, setMyBoards] = useState([]);
  const [following, setFollowing] = useState([]);
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
      dispatch(getUserDetails(userInfo.id));
    }
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={0} aria-label="basic tabs example" centered>
          <Tab label="프로필" {...a11yProps(0)} />
          <Link to="/users/myshopping">
            <Tab label="나의 쇼핑" {...a11yProps(1)} />
          </Link>
          <Link to="/users/myreview">
            <Tab label="나의 리뷰" {...a11yProps(2)} />
          </Link>
          <Link to="/users/setting">
            <Tab label="설정" {...a11yProps(3)} />
          </Link>
          {(userInfo && userInfo.is_seller) ||
          (userInfo && userInfo.is_staff) ? (
            <Link to="/seller/manage">
              <Tab label="판매자 관리" {...a11yProps(4)} />
            </Link>
          ) : null}
          {userInfo && userInfo.is_staff ? (
            <Link to="/admin/manage">
              <Tab label="관리자" {...a11yProps(5)} />
            </Link>
          ) : null}
        </Tabs>
      </Box>
      <CustomTabPanel value={0} index={0}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              centered
            >
              <Tab label="모두보기" {...a11yProps(0)} />
              <Tab label="사진" {...a11yProps(1)} />
              <Tab label="팔로잉" {...a11yProps(2)} />
              <Tab label="질문과 답변" {...a11yProps(3)} />
              <Tab label="북마크" {...a11yProps(4)} />
              <Tab label="좋아요" {...a11yProps(5)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <UserProfileMain userInfo={userInfo} user={user} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <MyBoard userInfo={userInfo} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Follow userInfo={userInfo} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <UserQnA userInfo={userInfo} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            <Bookmark bookMarkItems={bookMarkItems} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={5}>
            Item Seven
          </CustomTabPanel>
        </Box>
      </CustomTabPanel>
    </Box>
  );
}

export default UserProfileScreen;
