import React from 'react'
import { Row, Col, Button, Card, ListGroup, Image, Container, Form } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAllOrder } from '../slices/orderSlice'
import Message from '../components/Message'
import { useState, useEffect } from 'react'
import Loader from '../components/Loader'
import Order from '../components/Order'
import { getOrderById } from '../slices/orderSlice'

function OrderDetails() {
    const { id } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { orderById, orderShipping, orderItems, loading, error} = useSelector((state) => state.orderRed)
    const token = useSelector((state) => state.authRed.authData.access)
    const userData = JSON.parse(localStorage.getItem("userData"))
    const email = userData["email"]













    useEffect(() => {
      dispatch(getOrderById({token, id}))
    }, [])

    console.log(orderShipping)


  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h1 className='text-center my-4'>Order Details {orderById.createdAt}</h1>

      
      {error && <Message type="danger">{error}</Message>}
      {loading ? <Loader/> :
      <Row className="my-5 mx-2">
          <Col lg={3}>
              <h3 className='text-center mb-4'>Adress Details</h3>
              <Row className="mb-5">
                          <Col>
                              <Form.Label>Shipping Details</Form.Label>
                              <Form.Group className="mb-3" controlId="country">
                                  <Form.Control 
                                      required
                                      value={orderShipping.country}
                                      disabled
                                  />
                              </Form.Group> 
                              <Form.Group className="mb-3" controlId="city">
                                  <Form.Control 
                                      required
                                      value={orderShipping.city}
                                      disabled
                                  />
                              </Form.Group> 
                              <Form.Group className="mb-3" controlId="address">
                                  <Form.Control 
                                      required
                                      value={orderShipping.adress}
                                      disabled
                                  />
                              </Form.Group>     
                              <Form.Group className="mb-3" controlId="zipcode">
                                  <Form.Control 
                                      required
                                      value={orderShipping.zipCode}
                                      disabled
                                  />
                              </Form.Group> 
                              <Form.Label>Email</Form.Label>
                              <Form.Group className="mb-3" controlId="email">
                                  <Form.Control 
                                      required
                                      value={email}
                                      disabled
                                  />
                              </Form.Group> 
                              <p>{orderById.isDelivered ? <Message type="success">Delivered at: <strong>{orderById.deliveredAt}</strong></Message> : <Message type="info"><strong>Not Delivered Yet</strong></Message>}</p>
                          </Col>
              </Row> 
          </Col>

          <Col lg={5} style={{ maxHeight: '700px', overflowY: 'auto' }} className="mx-5">
            <h3 className='text-center mb-5'>Order Items</h3>
              <Row>
                      <ListGroup variant='flush'>
                          {orderItems && 
                              orderItems.map(item => (
                                  <ListGroup.Item key={item._id}>
                                  <Row>

                                      <Col md={3}>
                                          <Image src={"/images/"+item.image} alt={item.name} fluid rounded/>
                                      </Col>

                                      <Col md={5}>
                                          <Link to={`/product/${item.product}`}>
                                              {item.name}
                                          </Link>
                                      </Col>

                                      <Col md={1}>
                                          ${item.price}
                                      </Col>
                                      
                                      <Col md={2}>
                                          <span className='px-5'>{"Amnt:" + item.amount}</span>
                                      </Col>
                                  </Row>
                                  </ListGroup.Item>
                              ))
                          }
                      </ListGroup>
                  </Row>
          </Col>
          
          <Col className='mt-5'>
                  <Card className='mt-5'>
                      <ListGroup>
                          <ListGroup.Item>
                              <h3>Payment Details ({orderItems.reduce((acc, item) => acc + item.amount, 0)})</h3>
                              <p>Products price: <strong>${(orderById.totalPrice - orderById.taxPrice - orderById.shippingPrice).toFixed(2)}</strong></p>
                              <p>Tax price: <strong>${orderById.taxPrice}</strong></p>
                              <p>Shipping price: <strong>${orderById.shippingPrice}</strong></p>
                              <p>Total price: <strong>${orderById.totalPrice}</strong></p>
                              <p>Payment Method: <strong>{orderById.paymentMethod}</strong></p>
                              <p>{orderById.isPaid ? <Message type="success">Paid at: <strong>{orderById.paidAt}</strong></Message> : <Message type="info"><strong>Not Paid Yet</strong></Message>}</p>
                          </ListGroup.Item>
                      </ListGroup>
                  </Card>
          </Col>
      </Row>

    }  

    </div>
  )
}

export default OrderDetails
