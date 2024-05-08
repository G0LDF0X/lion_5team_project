import OtherUserProfileCard from './OtherUserProfileCard';
import { Card, Row, Col } from 'react-bootstrap'

function OtherUserProfileMain({ userId }) {
    return (
        <div>
            <h1>Other User Profile Main</h1>
            <Row className='justify-content-start'>
                <OtherUserProfileCard userId={userId} />
            </Row>
        </div>
        
    )
}

export default OtherUserProfileMain;
