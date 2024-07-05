import React from 'react'
import { Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useState } from 'react'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { putUserInfoAction } from '../slices/authSlice'
import { Link } from 'react-router-dom'
import LogoutConfirmation from '../components/LogoutConfirm'
import { logOut } from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'


function ProfilePage() {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { loading, error, userData, resetPassSuccess, updatedInfo } = useSelector((state) => state.authRed)
    const { email, first_name } = userData

    const [pageError, setPageError] = useState("")
    const [name, setName] = useState(first_name)
    const [userEmail, setEmail] = useState(email)
    const [message, setMessage] = useState("")

    const [showModal, setShowModal] = useState(false)
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const updateHandler = (e) => {
        try{
            e.preventDefault()
            dispatch(putUserInfoAction( { userEmail, name } ))
        }
        catch(error) {
            setPageError('Update profile error:', error);
        }

    }

    const handleLogout = () => {
        try{
            dispatch(logOut())
            navigate('/login')
        }
        catch(error) {
            setPageError('Logout error:', error);
        }
        finally{
            handleClose();
        }
      }


    

  return (
    <div>
        <h1 className='text-center m-4'>Profile</h1>
        <Row>
            <Col md={6} xs={12}>
                <h2 className='text-center p-4'>Your Information</h2>
                {pageError && <Message type="danger">{pageError}</Message>}
                {error && <Message type="danger">{error}</Message>}
                {resetPassSuccess && <Message type="success">Password was reset</Message>}
                {updatedInfo && <Message type="success">Your Info were updated</Message>}
                {message && <Message type="info">{message}</Message>}
                {!loading ? 
                <FormContainer>
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
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Control
                                required
                                type='email'
                                placeholder='Enter email'
                                value={userEmail}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant='primary' type='submit'>
                            Update
                        </Button>
                        <p className='my-3'><Link to="/password/reset">Reset password</Link></p>
                    </Form>
                </FormContainer>
                : <Loader/>}
                        <Button variant="danger" onClick={handleShow}>
                            Log Out
                        </Button>
                <LogoutConfirmation
                    show={showModal}
                    handleClose={handleClose}
                    handleLogout={handleLogout}
                />
            </Col>
            <Col md={6} xs={12}>
                <h2 className='text-center p-4'>Your Requests</h2>
            </Col>
        </Row>
    </div>
  )
}

export default ProfilePage
