import React from 'react'
import { Row, Col, Card, ListGroup, Image, Form } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../../components/Message'
import { useEffect } from 'react'
import Loader from '../../components/Loader'
import AuthGuard from '../../components/mainComponents/AuthGuard'

import { getOrderById } from '../../slices/orderSlice'

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



  return (
    <AuthGuard error={error}>
    <div className="d-flex flex-column justify-content-center align-items-center">
       <h1 className='text-center my-3'>Order Details {orderById.createdAt}</h1>

      
       {error && <Message type="danger">{error}</Message>}
       {loading ? <Loader/> :
        <Row className='mx-2 my-3'>
            <Col sm={12} md={3}>
                <h3 className='text-center mb-4'>Shipping Details</h3>
                <Row className="mb-5">
                            <Col>
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
                                <p>{orderById.isDelivered ? <Message type="success">Delivered at: <strong>{orderById.deliveredAt}</strong></Message> : <Message type="info"><strong>Not Delivered Yet</strong></Message>}</p>
                            </Col>
                </Row> 
            </Col>

            <Col sm={12} md={5}>
                <h3 className='text-center mb-4'>Order Items</h3>
                <Row className="mb-5" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        <ListGroup>
                            {orderItems && 
                                orderItems.map(item => (
                                    <ListGroup.Item key={item._id} >
                                    <Row >
                                        <Col>
                                            <Image src={"/images/"+item.image} alt={item.name} fluid rounded style={{
                                            maxWidth: "100px", 
                                            display: "block",
                                            }}/>
                                        </Col>

                                        <Col>
                                            <Link to={`/product/${item.product}`}>
                                                {item.name + " "+ `(${item.amount})`}
                                            </Link>
                                        </Col>

                                        <Col>
                                            ${item.price}
                                        </Col>
                                    </Row>
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                </Row>
            </Col>
            
            <Col sm={12} md={4} style={{ 
                                    maxWidth: "100%", 
                                    marginBottom: "10px", 
                                    maxHeight: "400px", 
                                    display: "block",
                                    marginLeft: "auto",
                                    marginRight: "auto", 
                                }}>
                <h3 className='text-center mb-4'>Payment Details ({orderItems.reduce((acc, item) => acc + item.amount, 0)})</h3>
                    <Card className='mb-5'>
                        <ListGroup>
                            <ListGroup.Item>
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
    </AuthGuard>
  )
}

export default OrderDetails
