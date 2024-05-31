import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../actions/userActions";
import { Tab, Tabs, Box, Typography } from "@mui/material";
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
    }
  }, [dispatch, userInfo]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Settings num={3} userInfo={userInfo}>
      <CustomTabPanel value={3} index={3}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              centered
            >
              <Tab label="회원정보 수정" {...a11yProps(0)} />
              <Tab label="알림 설정" {...a11yProps(1)} />
              <Tab label="사용자 숨기기 신청" {...a11yProps(2)} />
              <Tab label="판매자 신청" {...a11yProps(3)} />
              <Tab label="비밀번호 변경" {...a11yProps(4)} />
              <Tab label="추천코드" {...a11yProps(5)} />
            </Tabs>
          </Box>
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
        </Box>
      </CustomTabPanel>
    </Settings>
  );
}

export default UserSettingScreen;
