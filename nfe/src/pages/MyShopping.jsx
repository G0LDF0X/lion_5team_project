import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listBookMark } from "../store/actions/bookMarkActions";
import { getMyOrders } from "../store/actions/orderActions";
import { Tab, Tabs, Box, Pagination } from "@mui/material";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12); // 한 페이지당 보여줄 항목 수

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myOrderList = useSelector((state) => state.order.orders);
  const { loading, error, items: orders, totalItems, totalPages } = myOrderList;

  const bookMarkList = useSelector((state) => state.bookMarkList);
  const { bookMarkItems } = bookMarkList;

  useEffect(() => {
    dispatch(listBookMark());
    dispatch(getMyOrders({ page: currentPage, pageSize }));
  }, [dispatch, navigate, currentPage, pageSize]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="container mx-auto py-8">
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
            <Tab label="주문배송목록" {...a11yProps(0)} />
            <Tab label="상품 스크랩북" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Orderlist orders={orders} />
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <BookMarks bookMarkItems={bookMarkItems} />
        </CustomTabPanel>
      </Box>
    </div>
  );
}

export default MyShoppingScreen;
