import React, { useEffect } from 'react'
import { Row, Col, Button, Card, ListGroup, Image } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, increaseQnty, decreaseQnty } from '../../slices/cartSlice'
import Message from '../../components/Message'
import { useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'


function CartPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cartRed.cartItems)
    const [price, setPrice] = useState(0)
    const [taxPrice, setTaxPrice] = useState(0)
    const [shippingPrice, setShippingPrice] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

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
        navigate('/shipping')
    }

    useEffect(() => {
        const newPrice = parseFloat(cartItems.reduce((acc, item) => acc + (item.qnty * item.price), 0))
        setPrice(newPrice.toFixed(2))
    }, [cartItems])

    useEffect(() => {
        const newTaxPrice = parseFloat((parseFloat(price) * 0.10).toFixed(2))
        setTaxPrice(newTaxPrice.toFixed(2))
    
        const newShippingPrice = parseFloat((parseFloat(price) > 100 ? 0 : cartItems.length > 0 ? 5.99 : 0).toFixed(2))
        setShippingPrice(newShippingPrice.toFixed(2))
    
        const newTotalPrice = parseFloat((parseFloat(price) + newTaxPrice + newShippingPrice).toFixed(2))
        setTotalPrice(newTotalPrice.toFixed(2))
    }, [price, cartItems])

    return (
        <div>
            <h1 className='mt-3 text-center'>Cart Shopping</h1>
            <Row>
                <Col md={8} className='my-3'>
                {cartItems.length == 0 ? 
                    <Message variant="info">You have nothing in you cart. <Link to="/">Start buy</Link></Message>
                    : 
                    <ListGroup variant='flush'>
                        {cartItems && 
                            cartItems.map(item => (
                                <ListGroup.Item key={item.id}>
                                <Row>

                                    <Col md={2} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <LinkContainer to={`/product/${item.id}`}>
                                            <Image src={`${item.image.split("?")[0]}`} alt={item.name} style={{ maxWidth: "100%"}} fluid rounded/>
                                        </LinkContainer>
                                    </Col>

                                    <Col md={3} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Link to={`/product/${item.id}`}>
                                            {item.name}
                                        </Link>
                                    </Col>

                                    <Col md={2} style={{ display: 'flex', alignItems: 'center' }}>
                                        ${item.price}
                                    </Col>
                                    
                                    <Col md={3} >
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Button onClick={ () => decrQnty(item.id) } disabled={item.qnty <= 1}>-</Button>
                                            <span className='p-4'>{item.qnty}</span>
                                        <Button onClick={ () => incrQnty(item.id) } disabled={item.qnty >= item.amountStock} >+</Button>
                                    </div>
                                    </Col>

                                    <Col md={2} style={{ display: 'flex', alignItems: 'center' }}>
                                        <Button className='my-2' onClick={ () => removeItem(item.id) }><i className='fas fa-trash'></i></Button>
                                    </Col>
                                </Row>
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                }
                </Col>

                <Col md={4} className='my-3'>
                    <Card>
                        <ListGroup>
                            <ListGroup.Item>
                                <h2>Your Cart ({cartItems.reduce((acc, item) => acc + item.qnty, 0)})</h2>
                                <p>Products price: <strong>${price}</strong></p>
                                <p>Tax price: <strong>${taxPrice}</strong></p>
                                <p>Shipping price: <strong>${shippingPrice}</strong></p>
                                <p>Total price: <strong>${totalPrice}</strong></p>
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
