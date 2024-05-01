import React from 'react'
import UserProfileCard from './UserProfileCard'
import { Card, Row, Col } from 'react-bootstrap'

function UserProfileMain() {
  return (
    <div><Row className='justify-content-start'>
        <UserProfileCard />
        <Col>
        <h4>사진</h4>
        <Card></Card>
        <h4>집들이</h4>
        <Card></Card>
        </Col>
      </Row>
    </div>
  )
}

export default UserProfileMain
