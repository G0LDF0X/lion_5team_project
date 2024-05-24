import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { BookmarkBorder as BookmarkBorderIcon, FavoriteBorder as FavoriteBorderIcon, ConfirmationNumberOutlined as ConfirmationNumberOutlinedIcon } from '@mui/icons-material';

function UserProfileMain({ userInfo, user }) {
  const [value, setValue] = useState(0);

  return (
    <div className="flex justify-center mt-6">
      <div className="bg-white shadow-md rounded-lg w-full max-w-2xl">
        <div className="flex justify-center mt-4">
          <div className="flex flex-col items-center">
            {user?.user?.image_url ? (
              <img src={user.user.image_url} alt="Profile" className="rounded-full w-32 h-32" />
            ) : (
              <img src="https://placehold.co/400" alt="Placeholder" className="rounded-full w-32 h-32" />
            )}
            <h4 className="mt-4">{userInfo?.nickname || userInfo.username}</h4>
            <h6>팔로워 {userInfo?.follower} | 팔로잉 {userInfo?.following}</h6>
          </div>
        </div>
        <div className="mt-6 mb-4 text-center">
          <div className="w-full">
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => setValue(newValue)}
            >
              <BottomNavigationAction label="스크랩북" icon={<BookmarkBorderIcon />} />
              <BottomNavigationAction label="좋아요" icon={<FavoriteBorderIcon />} />
              <BottomNavigationAction label="내 쿠폰" icon={<ConfirmationNumberOutlinedIcon />} />
            </BottomNavigation>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileMain;