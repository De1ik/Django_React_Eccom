import React from 'react'
import FormContainer from '../components/FormContainer'
import { Form, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction, getUserAction } from '../slices/authSlice'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link } from 'react-router-dom'
import { useNavigate, useLocation  } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';


function LoginPage() {

    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorPage, setError] = useState("")

    const [reload, setReload] = useState(false)

    const { loading, error, emailAcivated, isAuth } = useSelector((state) => state.authRed)

    const notify = () => toast.success("User login successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }
    );


    useEffect(() => {
        console.log("dsfghjklkjhgfdsadfgh")
        if (location.pathname === '/login/redirect-auth-required') {
            if (localStorage.getItem('redirectAuthInfo')){
                window.location.reload()
                localStorage.removeItem('redirectAuthInfo')
            } 
            else{
                setReload(true)
            }

        }
    }, [])


    useEffect(() => {
        if (reload) { 
            toast.error('User was unautharized. Authentification required', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setReload(false)
        }
    }, [reload])


    const loginHandler = (e) => {
        e.preventDefault()
        dispatch(loginAction({ password, email }))
            .then((resultAction) => {
                if (loginAction.fulfilled.match(resultAction)) {
                    dispatch(getUserAction())
                        .then((resultAction) => {
                            if (getUserAction.fulfilled.match(resultAction)){
                                navigate("/")
                                return
                            }
                            else {
                                setError('Login user download failed: ' + resultAction.payload);
                            }
                            })
                        .catch((error) => {
                            setError('User info error: ' + error);
                        });
                } else {
                    setError('Login failed: ' + resultAction.payload);
                }
            })
            .catch((error) => {
                setError('Login failed: ' + error);
            });
    }



  return (
    <>
    <h1 className='text-center m-5'>Sign In</h1>
    {error && <Message type="danger">{error}</Message>}
    {errorPage && <Message type="danger">{errorPage}</Message>}
    {emailAcivated && <Message type="success">Email was activated</Message>}
    {loading ? <Loader/> : 
        <>
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
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <Button style={{ minWidth: '100px' }} variant="primary" type='submit'>
                        Login
                    </Button>
                    <span className='m-3'>
                        Do not have an account? <Link to="/registrate">Sign up now</Link>
                    </span>
                </div>
                <p className='my-4'><Link to="/password/reset">Forgot the password? Reset it</Link></p>
            </Form>  
        </FormContainer>
        </>
    }    
    </>
  )
}

export default LoginPage
