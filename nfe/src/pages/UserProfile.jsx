import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetail } from "../store/actions/userActions";
import { listBookMark } from "../store/actions/bookMarkActions";
import PropTypes from "prop-types";
import UserProfileMain from "../components/profilescreen/UserProfileMain";
import MyBoard from "../components/profilescreen/MyBoard";
import Follow from "../components/profilescreen/Follow";
import UserQnA from "../components/profilescreen/UserQnA";
import Bookmark from "../components/profilescreen/Bookmark";
import { Tab, Tabs, Box } from "@mui/material";


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
         
  );
}

export default UserProfileScreen;
