import React, { useEffect, useState } from "react";
// import UserSettingNavBar from '../components/UserSetitngNavbar'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";
import { listBookMark } from "../actions/bookmarkActions";
import { getMyOrders } from "../actions/orderActions";
import { Tab, Tabs, Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import UserProfileShoppingOrderlist from "../components/UserProfileShoppingOrderlist";
import UserProfileBookmark from "../components/UserProfileBookmark";
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
function MyShoppingScreen() {
  const [value, setValue] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const myOrderList = useSelector((state) => state.myOrderList);
  const { orders } = myOrderList;

  useEffect(() => {
      dispatch(listBookMark());
      dispatch(getMyOrders());
    
  }, [navigate]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={1} aria-label="basic tabs example" centered>
          <Link to="/users/profile">
            <Tab label="프로필" {...a11yProps(0)} />
          </Link>
          <Link to="/users/myshopping">
            {" "}
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
      <CustomTabPanel value={1} index={1}>
      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="주문배송목록" {...a11yProps(0)} />
          <Tab label="상품 스크랩북" {...a11yProps(1)} />
          <Tab label="나의문의내역" {...a11yProps(2)} />
          <Tab label="포인트" {...a11yProps(3)} />
          <Tab label="공지사항" {...a11yProps(4)} />
          <Tab label="고객센터" {...a11yProps(5)} />
          
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} >
        <UserProfileShoppingOrderlist orders={orders} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <UserProfileBookmark />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
            Item Four
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
            Item Five
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
            Item Six
        </CustomTabPanel>
    </Box>
      </CustomTabPanel>
    </Box>
  );
}

export default MyShoppingScreen;
