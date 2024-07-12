import React from 'react'
import FormContainer from '../components/FormContainer'
import { Form, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registrateAction } from '../slices/authSlice'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


function RegistratePage() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { registrateSucces, loading, error, isAuth } = useSelector((state) => state.authRed)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")
    
    
    const registrateHandler = (e) => {
        e.preventDefault()
        if (password === confirmPassword){
            dispatch(registrateAction( {name, email, password} ))
        }
    }

    useEffect(() => {
        if (password !== "" && confirmPassword !== "" && password !== confirmPassword){
            setMessage("passwords must be equal")
        }
        else{
            setMessage("")
        }
    }, [password, confirmPassword])



  return (
    <div>
    <h1 className='text-center m-5'>Sign Up</h1>

    {error && <Message type="danger">{error}</Message>}

    {registrateSucces ? <h2>Check Mail in Gmail</h2> : 
    <>
    {!loading ? 
        <FormContainer>
            <Form onSubmit={registrateHandler}>
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Control
                        required
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>
                {message && <Message type="danger">{message}</Message>}
                <Button variant='primary' type='submit'>
                    Registrate
                </Button>
                <span className='m-3'>
                        Already have the account? <Link to="/login">Login now</Link>
                </span>
            </Form>
        </FormContainer>
    :
        <Loader/>
    }   
    </>
    } 
    </div>    
  )
}

export default RegistratePage
