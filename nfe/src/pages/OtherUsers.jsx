import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDetail } from "../store/actions/userActions";
import PropTypes from "prop-types";
import { Tab, Tabs, Box } from "@mui/material";
import UserProfileMain from "../components/OtherUsers/UserProfileMain";
import MyBoard from "../components/OtherUsers/MyBoard";
import Follow from "../components/OtherUsers/Follow";
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

function OtherUserProfile() {
  const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const user = useSelector((state) => state.user);
  const {userDetail, userInfo} = user

  useEffect(() => {
      dispatch(getUserDetail(id));
    
  }, [dispatch, navigate, id]);

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
            <UserProfileMain userInfo={userInfo} userDetail={userDetail} url={VITE_API_BASE_URL} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <MyBoard userId={id} url={VITE_API_BASE_URL}/>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Follow userId={id} />
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
        </Box>
         
  );
}

export default OtherUserProfile;
