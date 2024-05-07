import React, { useEffect, useState } from 'react'
import OtherUserProfileCard from './OtherUserProfileCard';
import { Card, Row, Col } from 'react-bootstrap'

function OtherUserProfileMain({ userId }) {
    return (
        <div>
            <Row className='justify-content-start'>
                <OtherUserProfileCard userId={userId} />
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

export default OtherUserProfileMain;
