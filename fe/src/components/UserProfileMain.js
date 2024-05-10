import React, {useState} from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import {Box, BottomNavigation, BottomNavigationAction} from '@mui/material'
import { BookmarkBorder as BookmarkBorderIcon, FavoriteBorder as FavoriteBorderIcon, ConfirmationNumberOutlined as ConfirmationNumberOutlinedIcon } from '@mui/icons-material'
import Image from 'react-bootstrap/Image'

function UserProfileMain({userInfo, user}) {
  const [value, setValue] = useState(0);
  return (
<Row className='justify-content-start'>
        <Card className="ms-auto">
        <Row className="justify-content-center">
          <Col xs={6} md={4} className="d-flex flex-column justify-content-center align-items-center">
            {user.user&& user.user.image_url ? 
              <Image src={user.user.image_url} roundedCircle width="40%" />
              : <Image src="https://placehold.co/400" roundedCircle width="40%" />}
            
            {userInfo&& userInfo.nickname !== "" ? 
            <h4 className='text-center'>{userInfo.nickname}</h4>
          : <h4 className='text-center'>{userInfo.username}</h4>}
            <h6>팔로워  {userInfo.follower  } |  팔로잉  {userInfo.following}</h6>
          </Col>
        </Row>
        <Card.Body className='text-center'>
          <Box sx={{ width: 500, margin: '0 auto' }}>
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <BottomNavigationAction label="스크랩북" icon={<BookmarkBorderIcon />} />
              <BottomNavigationAction label="좋아요" icon={<FavoriteBorderIcon />} />
              <BottomNavigationAction label="내 쿠폰" icon={<ConfirmationNumberOutlinedIcon />} />
            </BottomNavigation>
          </Box>
        </Card.Body>
      </Card>
      </Row>
 
  )
}

export default UserProfileMain

