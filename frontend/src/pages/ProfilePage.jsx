import React from 'react'
import { Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useState, useEffect } from 'react'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { putUserInfoAction } from '../slices/authSlice'

function ProfilePage() {

    const { loading, error, userData } = useSelector((state) => state.authRed)
    const { email, first_name } = userData
    const dispatch = useDispatch()
    const [name, setName] = useState(first_name)
    const [userEmail, setEmail] = useState(email)
    const [message, setMessage] = useState("")

    const updateHandler = (e) => {
        e.preventDefault()
        dispatch(putUserInfoAction( { userEmail, name } ))
        if (!error && !loading) {
            setMessage("Your info was updated")
        }

    }

    useEffect(() => {
        if (error) {
            setMessage("")
        }
    }, [error])

    

  return (
    <div>
        <h1 className='text-center m-4'>Profile</h1>
        <Row>
            <Col md={6} xs={12}>
                <h2 className='text-center p-4'>Your Information</h2>
                {error && <Message type="danger">{error}</Message>}

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
                        {message && <Message type="info">{message}</Message>}
                        <Button variant='primary' type='submit'>
                            Update
                        </Button>
                    </Form>
                </FormContainer>
                : <Loader/>}
            </Col>
            <Col md={6} xs={12}>
                <h2 className='text-center p-4'>Your Requests</h2>
            </Col>
        </Row>
    </div>
  )
}

export default ProfilePage
