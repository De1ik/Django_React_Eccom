import React from 'react'
import { Row, Col, Button, Card, ListGroup, Image, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, increaseQnty, decreaseQnty } from '../slices/cartSlice'
import Message from '../components/Message'
import { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import OrderSters from '../components/OrderSters'
import { createOrder } from '../slices/orderSlice'


function CheckoutPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartItems = useSelector((state) => state.cartRed.cartItems)
    const token = useSelector((state) => state.authRed.authData.access)
    const [pageError, setPageError] = useState("")
    const [price, setPrice] = useState(0)
    const [taxPrice, setTaxPrice] = useState(0)
    const [shippingPrice, setShippingPrice] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    const userData = JSON.parse(localStorage.getItem("userData"))
    const shipData = JSON.parse(localStorage.getItem("shipData")) || ""
    if (!shipData){
        navigate("/shipping")
    }
    const country = shipData["country"]
    const town = shipData["town"]
    const address = shipData["address"]
    const zipcode = shipData["zipcode"]
    const phoneNumber = shipData["phoneNumber"]
    const email = userData["email"]

    const payment = JSON.parse(localStorage.getItem("paymentMethod"))
    const [paymentMethod, setPaymentMethod] = useState("")

    useEffect(() => {
        if (!payment){
            navigate("/pay-method")
        } else{
            setPaymentMethod(payment.paymentMethod)
        }
    }, [])



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
        if (paymentMethod === "After delivery"){
            try{
                const orderData = {
                        "paymentMethod": paymentMethod,
                        "taxPrice": taxPrice,
                        "shippingPrice": shippingPrice,
                        "totalPrice": totalPrice
                }
        
                const shippingData = {
                        "adress": address,
                        "city": town,
                        "zipCode": zipcode,
                        "country": country,
                        "shippingPrice": shippingPrice
                }
                const orderItemsData = cartItems.map(product => ({
                    product_id: product.id,
                    amount: product.qnty
                }));
        
                dispatch(createOrder({orderData, shippingData, orderItemsData, token})).then((resultAction) => {
                    if (createOrder.fulfilled.match(resultAction)){
                        localStorage.removeItem("cartItems")
                        navigate('/all-orders')
                        window.location.reload();
                        return
                    }
                    else {
                        setPageError("Error during order creation: " + resultAction.payload);
                    }
                    })
                .catch((e) => {
                    setPageError("Error during order creation: "+e)
                });
            }
            catch (e) {
                setPageError("Error during order creation: "+e)
            }
        }
        else{
            setPageError("You must pay now or change the payment method")
        }
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
        <div className="d-flex flex-column justify-content-center align-items-center">
            <h1 className='text-center my-4'>Order Confirmation</h1>
            <OrderSters data={{"step1": true, "step2": true, "step3": true}}/>
            {pageError && <Message type="danger">{pageError}</Message>}
            <Row className="my-5">
                <Col lg={4} md={5} sm={12} className='mx-2 my-3'>
                    <h3 className='text-center mb-4'>Adress Detailed</h3>
                    <Row className="mb-5">
                                <Col md={6}>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Group className="mb-3" controlId="country">
                                        <Form.Control 
                                            required
                                            value={country}
                                            disabled
                                        />
                                    </Form.Group> 
                                    <Form.Group className="mb-3" controlId="town">
                                        <Form.Control 
                                            required
                                            value={town}
                                            disabled
                                        />
                                    </Form.Group> 
                                    <Form.Group className="mb-3" controlId="address">
                                        <Form.Control 
                                            required
                                            value={address}
                                            disabled
                                        />
                                    </Form.Group>     
                                </Col>
                                <Col md={6}>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Group className="mb-3" controlId="zipcode">
                                        <Form.Control 
                                            required
                                            value={zipcode}
                                            disabled
                                        />
                                    </Form.Group> 
                                    <Form.Group className="mb-3" controlId="phone">
                                        <Form.Control 
                                            required
                                            value={phoneNumber}
                                            disabled
                                        />
                                    </Form.Group> 
                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Control 
                                            required
                                            value={email}
                                            disabled
                                        />
                                    </Form.Group> 
      
                                </Col>
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                    <Button style={{ minWidth: '100px' }} variant="primary" onClick={(e) => navigate("/shipping")}>
                                        Change
                                    </Button>
                                </div>
                    </Row> 

                    <Row className='mb-4'>
                        <p className='text-center'>Payment Method: {paymentMethod}</p>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <Button style={{ minWidth: '100px' }} variant="primary" onClick={(e) => navigate("/pay-method")}>
                                Edit
                            </Button>
                        </div>
                    </Row>
                </Col>

                <Col lg={4} md={6} sm={12} style={{ maxHeight: '700px', overflowY: 'auto' }} className='mx-2 my-3'>
                    <Row>
                            <ListGroup variant='flush'>
                                {cartItems && 
                                    cartItems.map(item => (
                                        <ListGroup.Item key={item.id}>
                                        <Row>

                                            <Col md={3}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>

                                            <Col md={5}>
                                                <Link to={`/product/${item.id}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>

                                            <Col md={1}>
                                                ${item.price}
                                            </Col>
                                            
                                            <Col md={2}>
                                                <span className='px-5'>{item.qnty}</span>
                                            </Col>
                                        </Row>
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                        </Row>
                </Col>
                
                <Col lg={3} md={12} sm={12} className='mx-2 my-3'>
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
                                    {paymentMethod === "After delivery" ? 
                                        <Button 
                                            type='button'
                                            disabled={cartItems.length == 0}
                                            className='btn-block text-center'
                                            onClick={checkoutHandler}
                                        > 
                                        Submit Order
                                        </Button>   
                                        :
                                        <Button 
                                            type='button'
                                            disabled={cartItems.length == 0}
                                            className='btn-block text-center'
                                            onClick={checkoutHandler}
                                        > 
                                        Pay Now
                                        </Button>  
                                        }
                                </ListGroup.Item>

                            </ListGroup>
                        </Card>
                </Col>
            </Row>
        </div>
    )
}

export default CheckoutPage
