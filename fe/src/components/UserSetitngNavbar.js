import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import UserSettingSettingNavbar from './UserSettingSettingNavbar';
import SellerSettingNavBar from './SellerSettingNavbar';
import UserSettingProfileNavbar from './UserSettingProfileNavBar';
import UserSettingMyshoppingNavbar from './UserSettingMyshoppingNavbar';
import UserSettingMyreviewNavbar from './UserSettingMyreviewNavbar';
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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function UserSettingNavBar() {
  const [value, setValue] = React.useState(0);
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);  
    const { userInfo } = userLogin;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="프로필" {...a11yProps(0)} />
          <Tab label="나의 쇼핑" {...a11yProps(1)} />
          <Tab label="나의 리뷰" {...a11yProps(2)} />
            <Tab label="설정" {...a11yProps(3)} />
          {userInfo &&userInfo.is_staff && <Tab label="판매자 관리" {...a11yProps(4)} />}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <UserSettingProfileNavbar />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <UserSettingMyshoppingNavbar />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <UserSettingMyreviewNavbar />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <UserSettingSettingNavbar />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <SellerSettingNavBar />
      </CustomTabPanel>
    </Box>
  );
}