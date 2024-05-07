import React from 'react'
import UserProfileCard from './UserProfileCard'
import { Card, Row, Col } from 'react-bootstrap'

function UserProfileMain() {
  return (
    <div><Row className='justify-content-start'>
        <UserProfileCard />
      </Row>
    </div>
  )
}

export default UserProfileMain
