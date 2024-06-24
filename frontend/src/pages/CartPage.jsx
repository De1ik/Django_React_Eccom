import React from 'react'
import { Row, Col, Button, Card, ListGroup, Image } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, increaseQnty, decreaseQnty } from '../slices/cartSlice'
import Message from '../components/Message'


function CartPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cartRed.cartItems)

    const removeItem = (itemId) => {
        dispatch(removeFromCart(itemId))
    }

    const incrQnty = (id) => {
        dispatch(increaseQnty(id))
    }

    const decrQnty = (id) => {
        dispatch(decreaseQnty(id))
    }
    
    const checkoutHandler = () => {
        navigate('/login?redirect=shipping')
    }

    return (
        <div>
            <h1>Cart Shopping</h1>
            <Row>
                <Col md={8}>
                {cartItems.length == 0 ? 
                    <Message variant="info">You have nothing in you cart. <Link to="/">Start buy</Link></Message>
                    : 
                    <ListGroup variant='flush'>
                        {cartItems && 
                            cartItems.map(item => (
                                <ListGroup.Item key={item.id}>
                                <Row>

                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>

                                    <Col md={3}>
                                        <Link to={`/product/${item.id}`}>
                                            {item.name}
                                        </Link>
                                    </Col>

                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    
                                    <Col md={3}>
                                        <Button onClick={ () => decrQnty(item.id) } disabled={item.qnty <= 1}>-</Button>
                                            <span className='p-4'>{item.qnty}</span>
                                        <Button onClick={ () => incrQnty(item.id) } disabled={item.qnty >= item.amountStock} >+</Button>
                                    </Col>

                                    <Col md={2}>
                                        <Button onClick={ () => removeItem(item.id) }><i className='fas fa-trash'></i></Button>
                                    </Col>
                                </Row>
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                }
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup>
                            <ListGroup.Item>
                                <h2>Your Cart ({cartItems.reduce((acc, item) => acc + item.qnty, 0)})</h2>
                                <p>Total price: <strong>${cartItems.reduce((acc, item) => acc + (item.qnty * item.price), 0)}</strong></p>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button 
                                    type='button'
                                    disabled={cartItems.length == 0}
                                    className='btn-block text-center'
                                    onClick={checkoutHandler}
                                >    
                                    Checkout
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default CartPage
