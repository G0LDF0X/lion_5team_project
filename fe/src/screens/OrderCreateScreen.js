import React from 'react'
import { Row } from 'react-bootstrap'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createOrder} from '../actions/orderActions'
import {Form, Button} from 'react-bootstrap'
import {Col} from 'react-bootstrap'

function OrderCreateScreen() {
  const [order, setOrder] = useState({})
  const dispatch = useDispatch()
  return (
    <Row>
      <h3>주문 / 결제</h3>
    <Col md={6}>
      <Form>
        <Form.Group controlId='name'>
          <Form.Label>이름</Form.Label>
          <Form.Control
            type='text'
            placeholder='이름을 입력하세요'
            value={order.name}
            onChange={(e) => setOrder({ ...order, name: e.target.value })}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type='email'
            placeholder='이메일을 입력하세요'
            value={order.email}
            onChange={(e) => setOrder({ ...order, email: e.target.value })}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='phone'>
          <Form.Label>전화번호</Form.Label>
          <Form.Control
            type='text'
            placeholder='전화번호를 입력하세요'
            value={order.phone}
            onChange={(e) => setOrder({ ...order, phone: e.target.value })}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='address'>
          <Form.Label>주소</Form.Label>
          <Form.Control
            type='text'
            placeholder='주소를 입력하세요'
            value={order.address}
            onChange={(e) => setOrder({ ...order, address: e.target.value })}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          주문하기
        </Button>
      </Form>
      </Col>

    </Row>
  )
}

export default OrderCreateScreen
