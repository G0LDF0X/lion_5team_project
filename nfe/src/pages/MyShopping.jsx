import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";
import { listBookMark } from "../store/actions/bookMarkActions";
import { getMyOrders } from "../store/actions/orderActions";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Orderlist from "../components/profilescreen/OrderList";
import BookMarks from "../components/profilescreen/BookMarks";
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
function MyShoppingScreen() {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const order = useSelector((state) => state.order);
  const { orders } = order;
  const bookMarkList = useSelector((state) => state.bookMarkList);
  const { bookMarkItems } = bookMarkList;

  useEffect(() => {
      dispatch(listBookMark());
      dispatch(getMyOrders());
    
  }, [navigate]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
  
      <CustomTabPanel value={1} index={1}>
      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="주문배송목록" {...a11yProps(0)} />
          <Tab label="상품 스크랩북" {...a11yProps(1)} />
          <Tab label="나의문의내역" {...a11yProps(2)} />
          <Tab label="고객센터" {...a11yProps(3)} />
          
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} >
        <Orderlist orders={orders} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <BookMarks bookMarkItems={bookMarkItems} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        문의내역 페이지
      </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
            고객센터 페이지
        </CustomTabPanel>
    </Box>
      </CustomTabPanel>

  );
}

export default MyShoppingScreen;
