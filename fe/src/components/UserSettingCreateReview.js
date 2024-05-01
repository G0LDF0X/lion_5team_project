import React from 'react'
import SearchBox from './SearchBox'
import { Row, Col } from 'react-bootstrap'

function UserSettingCreateReview() {
  return (
    <Row>
        <Col>
            <h4>내가 사용하는 상품 리뷰쓰기</h4>
            <SearchBox />

            {/* {products.map((product) => (
                <Product key={product._id} product={product} />
            ))} */}
      </Col>
    </Row>
  )
}

export default UserSettingCreateReview
