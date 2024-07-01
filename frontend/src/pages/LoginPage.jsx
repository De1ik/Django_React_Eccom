import React from 'react'
import FormContainer from '../components/FormContainer'
import { Form, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction, getUserAction } from '../slices/authSlice'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


function LoginPage() {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { loading, error, userData, registrateSucces, authData } = useSelector((state) => state.authRed)

    const loginHandler = (e) => {
        e.preventDefault()
        dispatch(loginAction({ password, email }))
            .then((resultAction) => {
                if (loginAction.fulfilled.match(resultAction)) {
                    return dispatch(getUserAction());
                } else {
                    console.error('Login failed:', resultAction.payload);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        if (userData){
            navigate("/")
        }
    }, [userData])


  return (
    <>
    <h1 className='text-center m-5'>Sign In</h1>
    {error && <Message type="danger">{error}</Message>}
    {registrateSucces && <Message type="success">Registration was succes</Message>}
    {loading ? <Loader/> : 
        <FormContainer>
            <Form onSubmit={loginHandler}>
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
                <Button variant="primary" type='submit'>
                    Login
                </Button>
                <span className='m-3'>
                    Do not have an account? <Link to="/registrate">Sign up now</Link>
                </span>
            </Form>  
        </FormContainer>
    }    
    </>
  )
}

export default LoginPage
