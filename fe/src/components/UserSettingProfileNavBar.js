import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserSettingSetting from './UserSettingSetting';
import UserProfileMain from './UserProfileMain';
import Bookmark from './Bookmark';
import UserQnA from './UserQnA';
import MyBoard from './MyBoard';
import Follow from './Follow';

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

export default function UserSettingProfileNavbar() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="모두보기" {...a11yProps(0)} />
          <Tab label="사진" {...a11yProps(1)} />
          <Tab label="팔로잉" {...a11yProps(2)} />
          <Tab label="질문과 답변" {...a11yProps(3)} />
          <Tab label="북마크" {...a11yProps(4)} />
          <Tab label="좋아요" {...a11yProps(5)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} >
        <UserProfileMain />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MyBoard />
      </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
            <Follow />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
            <UserQnA />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
            <Bookmark />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
            Item Seven
        </CustomTabPanel>
    </Box>
  );
}