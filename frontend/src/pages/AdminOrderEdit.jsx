import React from 'react'
import { Row, Col, Button, Card, ListGroup, Image, Container } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { logOut } from '../slices/authSlice'
import { getOrderById, markDeliveredById, markPaidById } from '../slices/orderSlice'
import Loader from '../components/Loader'
import Confirmation from '../components/Confirmation'


function AdminOrderEdit() {


  const notify = (message) => toast.success(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}
)

const notifyError = (message) => toast.error(message, {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}
)

const [showModalDelidery, setShowModalDelidery] = useState(false)
const [showModalPaid, setShowModalPaid] = useState(false)
const handleShowDelivery = () => {
  setShowModalDelidery(true)
}
const handleCloseDelivery = () => {
  setShowModalDelidery(false)
}

const handleShowPaid = () => {
  setShowModalPaid(true)
}
const handleClosePaid = () => {
  setShowModalPaid(false)
}


const dispatch = useDispatch();
const navigate = useNavigate();

const { orderById, orderShipping, orderItems, loading, error} = useSelector((state) => state.orderRed)
const authRed = useSelector((state) => state.authRed)

const { id } = useParams()
const [token, setToken] = useState("")

// const [price, setPrice] = useState(0)
// const [taxPrice, setTaxPrice] = useState(0)
// const [shippingPrice, setShippingPrice] = useState(0)
// const [totalPrice, setTotalPrice] = useState(0)

useEffect(() => {
    if (error && error.includes("401")){
        dispatch(logOut())
        navigate('/login')
        notifyError("User was unautharized. Authentification required")
    }
}, [error])

useEffect(() => {
    if (authRed.authData){
        setToken(authRed.authData.access)
    }
}, [])


useEffect(() => {
  if (token){
      dispatch(getOrderById({token, id}))
  }
}, [token])



// const checkoutHandler = () => {
//     if (paymentMethod === "After delivery"){
//         try{
//             const orderData = {
//                     "paymentMethod": paymentMethod,
//                     "taxPrice": taxPrice,
//                     "shippingPrice": shippingPrice,
//                     "totalPrice": totalPrice
//             }
    
//             const shippingData = {
//                     "adress": address,
//                     "city": town,
//                     "zipCode": zipcode,
//                     "country": country,
//                     "shippingPrice": shippingPrice
//             }
//             const orderItemsData = cartItems.map(product => ({
//                 product_id: product.id,
//                 amount: product.qnty
//             }));
//             if (token){
//                 dispatch(createOrder({orderData, shippingData, orderItemsData, token})).then((resultAction) => {
//                     if (createOrder.fulfilled.match(resultAction)){
//                         localStorage.removeItem("cartItems")
//                         navigate('/all-orders')
//                         window.location.reload();
//                         return
//                     }
//                     else {
//                         setPageError("Error during order creation: " + resultAction.payload);
//                     }
//                     })
//                 .catch((e) => {
//                     setPageError("Error during order creation: "+e)
//                 });
//             }
//             else{
//                 dispatch(logOut())
//                 navigate('/login')
//                 notifyError("User was unautharized. Authentification required")
//             }
//         }
//         catch (e) {
//             setPageError("Error during order creation: "+e)
//         }
//     }
//     else{
//         setPageError("You must pay now or change the payment method")
//     }
// }

const markPaidHandle = () => {
  try{
    dispatch(markPaidById({token, id}))
    notify("Pay status was changed as paid")
  }
  catch(e){
    notifyError("Change Status Pay Error: " + e)
  }
  finally{
    handleClosePaid()
  }
}

const markDeliveredHandle = () => {
  try{
    dispatch(markDeliveredById({token, id}))
    notify("Delivery status was changed as delivered")
  }
  catch(e){
    notifyError("Change Status Delivery Error: " + e)
  }
  finally{
    handleCloseDelivery()
  }
}


return (
    <div className="d-flex flex-column justify-content-center align-items-center">
    <h1 className='text-center my-4'>Order Details {orderById._id}</h1>

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
                            
                            {!orderById.isPaid && <p>
                              <Button variant="primary" block onClick={handleShowPaid}>
                                Mark Paid
                              </Button>
                            </p>}
                            {!orderById.isDelivered &&<p>
                              <Button variant="primary" block onClick={handleShowDelivery}>
                                Mark Delivered
                              </Button>
                            </p>}
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
        </Col>
        <Confirmation
                                show={showModalDelidery}
                                handleClose={handleCloseDelivery}
                                handleAction={() => markDeliveredHandle()}
                                title={"Confirmation Order Delivery"}
                                confirmQuestion="Are you sure want to mark order as Delivered?"
        />
        <Confirmation
                                show={showModalPaid}
                                handleClose={handleClosePaid}
                                handleAction={() => markPaidHandle()}
                                title={"Confirmation Order Paid"}
                                confirmQuestion="Are you sure want to mark order as Paid?"
        />
    </Row>

  }  

  </div>
  )
}

export default AdminOrderEdit
