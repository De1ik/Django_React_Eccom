import React from 'react'
import { Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive';
import { ListGroup } from 'react-bootstrap';

function Order({orders}) {
    const navigate = useNavigate()
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 768px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  return (
    <ListGroup>
      <ListGroup.Item className='d-flex'>
        <Col ><strong>ID</strong></Col>
        <Col ><strong>Date</strong></Col>
        <Col ><strong>Price</strong></Col>
        <Col ><strong>Paid</strong></Col>
        {isDesktopOrLaptop && <Col><strong>Delivered</strong></Col>}
        <Col ><strong></strong></Col>
      </ListGroup.Item>  

      {orders.map(order => (
        <ListGroup.Item key={order._id} className='d-flex'>
          <Col>{order._id}</Col>
          <Col>{order.createdAt}</Col>
          <Col>{order.totalPrice}</Col>
          <Col>
            {isDesktopOrLaptop && (order.isPaid ? order.paidAt : "No")}
            {isMobile && (order.isPaid ? "Yes" : "No")} 
          </Col>
          {isDesktopOrLaptop && <Col>{order.isDelivered ? order.deliveredAt : "No"}</Col>}
          <Col>
            <Button onClick={() => (navigate(`/order/${order._id}`))}>Details</Button>
          </Col>
        </ListGroup.Item>
      ))}
  </ListGroup>
)
}

export default Order
