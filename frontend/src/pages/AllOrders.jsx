import React from 'react'
import { Row, Col, Button, Card, ListGroup, Image, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAllOrder } from '../slices/orderSlice'
import Message from '../components/Message'
import { useState, useEffect } from 'react'
import Loader from '../components/Loader'
import Order from '../components/Order'



function AllOrders() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { allOrders, loading, error} = useSelector((state) => state.orderRed)
    const token = useSelector((state) => state.authRed.authData.access)


    useEffect(() => {
      dispatch(getAllOrder(token))
    }, [dispatch])


  return (
    <div>
      <h1 className='text-center my-4'>{}My Orders</h1>
            {
                loading ? <Loader/> :
                error ? <Message type="danger">{error}</Message> :

                <ListGroup variant='flush'>

                  <ListGroup.Item className="d-flex">
                    <Col md={1}><strong>ID</strong></Col>
                    <Col md={3}><strong>Date</strong></Col>
                    <Col md={2}><strong>Price</strong></Col>
                    <Col md={2}><strong>Delivered</strong></Col>
                    <Col md={2}><strong>Paid</strong></Col>
                    <Col md={2}><strong></strong></Col>
                  </ListGroup.Item>  

                  {allOrders.map(order => (
                    <ListGroup.Item key={order._id} sm={12} md={12} lg={12} xl={12}>
                      <Order order={order}/>
                    </ListGroup.Item>
                  ))}

                </ListGroup>
            }
    </div>
  )
}

export default AllOrders
