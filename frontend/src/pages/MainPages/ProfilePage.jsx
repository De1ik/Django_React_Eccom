import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useState } from 'react'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Button, ListGroup, Container } from 'react-bootstrap'
import { putUserInfoAction } from '../../slices/authSlice'
import { Link } from 'react-router-dom'
import Confirmation from '../../components/Confirmation'
import { logOut } from '../../slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AuthGuard from '../../components/mainComponents/AuthGuard'
import { getLatestOrders } from '../../slices/orderSlice'
import Order from '../../components/Order'



function ProfilePage() {


    const notifySuccess = (message) => toast.success(message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const notifyError = (message) => toast.error(message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const { loading, error, userData, resetPassSuccess, updatedInfo } = useSelector((state) => state.authRed)
    const { latestOrders, loading: orderLoad, error: orderError} = useSelector((state) => state.orderRed)
    
    const authRed = useSelector((state) => state.authRed)

    const [token, setToken] = useState("")
    const [email, setUserEmail] = useState("")
    const [first_name, setFirstName] = useState("")

    const [pageLoad, setPageLoad] = useState(false)
    const [pageError, setPageError] = useState("")
    const [name, setName] = useState(first_name)
    const [userEmail, setEmail] = useState(email)
    const [message, setMessage] = useState("")

    const [isLogout, setIsLogout] = useState(false)

    const [showModal, setShowModal] = useState(false)
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    useEffect(() => {
        if (userData){
            setUserEmail(userData.email)
            setFirstName(userData.first_name)
            setName(userData.first_name)
            setEmail(userData.email)
        }
        if (authRed.authData){
            setToken(authRed.authData.access)
        }
        else{
            setIsLogout(true)
        }
    }, [])

    
    useEffect(() => {
        if (token){
            dispatch(getLatestOrders(token))
        }
    }, [token])



    useEffect(() => {
        if (((error && error.includes("401"))) || (orderLoad === false && orderError && orderError.includes("401")) || isLogout){
            dispatch(logOut())
            navigate('/login')
            notifyError("User was unautharized. Authentification required")
        }
    }, [error, orderError, isLogout])

    useEffect(() => {
        if (email === null){
            setPageLoad(true)
        }
        else {
            setPageLoad(false)
        }
    }, [email, first_name])


    const updateHandler = (e) => {
        try{
            e.preventDefault()
            dispatch(putUserInfoAction( { userEmail, name } ))
            notifySuccess("User data was updated")
        }
        catch(error) {
            notifyError('Update profile error:', error)
        }

    }


    const handleLogout = () => {
        try{
            dispatch(logOut())
            navigate('/login')
            notifySuccess("Log Out success")
        }
        catch(error) {
            notifyError('Update profile error:', error)
        }
        finally{
            handleClose();
        }
      }


    

  return (
    <AuthGuard error={error}>
        <h1 className='text-center m-4'>Profile</h1>
        <Row>
            <Col md={4} xs={12} className='border' >
                <h2 className='text-center p-4'>Your Information</h2>
                {pageError && <Message type="danger">{pageError}</Message>}
                {error && <Message type="danger">{error}</Message>}
                {resetPassSuccess && <Message type="success">Password was reset</Message>}
                {/* {updatedInfo && <Message type="success">Your Info were updated</Message>} */}
                {message && <Message type="info">{message}</Message>}
                {!loading && !pageLoad ? 
                <Container>
                    <Form onSubmit={updateHandler}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Control
                                required
                                type='text'
                                placeholder='Enter your name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-1" controlId="email">
                            <Form.Control
                                required
                                type='email'
                                disabled={true}
                                placeholder='Enter email'
                                value={userEmail}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <div className='mb-3'>
                            <span className='mb-3' style={{fontSize:"small"}}>*You can not change the email</span>
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                        <Button variant='primary' type='submit'>
                            Update Name
                        </Button>
                        <p className='my-3'><Link to="/password/reset">Reset password</Link></p>
                        </div>
                    </Form>
                </Container>
                : <Loader/>}
                        <Button variant="danger" className="mb-3" onClick={handleShow}>
                            Log Out
                        </Button>
                <Confirmation
                    show={showModal}
                    handleClose={handleClose}
                    handleAction={handleLogout}
                    title="Confirm Logout"
                    confirmQuestion="Are you sure want to log out?"
                />
            </Col>
            <Col md={8} xs={12} className='px-0'>
                <div className='list-group-custom'>
                    <h2 className='text-center pt-4'>Your Orders</h2>
                    {
                        orderLoad ? <Loader/> :
                        orderError ? notifyError(orderError) :
                        <ListGroup variant='flush' className='my-4'>  
                        <Order orders={latestOrders}/>
                        </ListGroup>
                    }
                    {latestOrders.length === 0 && <h3 className='text-center my-3'>You have no orders yet</h3>}
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <Button onClick={() => navigate("/all-orders")}>See All Orders</Button>
                    </div>
                </div>
            </Col>
        </Row>
    </AuthGuard>
  )
}

export default ProfilePage
