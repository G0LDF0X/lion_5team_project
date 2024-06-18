import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetail } from "../store/actions/userActions";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import UserSetting from "../components/profilescreen/UserSetting";
import SellerApplication from "../components/profilescreen/SellerApplication";
import MyPassword from "../components/profilescreen/MyPassword";
import { clearSuccess } from "../store/slices/userSlices";
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
function UserSettingScreen() {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { userInfo , userDetail} = user;
  

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
    dispatch(getUserDetail(userInfo.id));
  }, [navigate]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              centered
            >
              <Tab label="회원정보 수정" {...a11yProps(0)} />
              <Tab label="판매자 신청" {...a11yProps(1)} />
              <Tab label="비밀번호 변경" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <UserSetting userInfo={userInfo} userDetail={userDetail} reset={clearSuccess} />
          </CustomTabPanel>
          
          
          <CustomTabPanel value={value} index={1}>
            <SellerApplication userInfo={userInfo} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <MyPassword userInfo={userInfo} user={userDetail} reset={clearSuccess} />
          </CustomTabPanel>
        
        </Box>
  );
}

export default UserSettingScreen;
