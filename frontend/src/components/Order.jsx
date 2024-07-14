import React from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Order({order}) {
    const navigate = useNavigate()

  return (
    <Row>
      <Col md={1}>{order._id}</Col>

      <Col md={3}>{order.createdAt}</Col>

      <Col md={2}>{order.totalPrice}</Col>

      <Col md={2}>{order.isDelivered ? order.deliveredAt : "No"}</Col>

      <Col md={2}>{order.isDelivered ? order.deliveredAt : "No"}</Col>

      <Col md={2}><Button onClick={() => (navigate(`/order/${order._id}`))}>Info</Button></Col>
    </Row>
  )
}

export default Order
