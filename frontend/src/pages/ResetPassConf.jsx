import React from 'react'
import { useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginAction, getUserAction } from '../slices/authSlice'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { resetPassConfirmAction } from '../slices/authSlice'

function ResetPassConf() {
    const { uid, token } = useParams()
    const [password, setPassword] = useState("")
    const [errorPage, setError] = useState("")
    const [confPassword, setConfPass] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, error, resetPassSuccess, isAuth } = useSelector((state) => state.authRed)

    const resetPassHandler = (e) => {
        e.preventDefault()
        try{
          dispatch(resetPassConfirmAction(
            {
              "password": password,
              "uid": uid,
              "token": token
            }
          ))
            .then((resultAction) => {
              if (resetPassConfirmAction.fulfilled.match(resultAction)) {
                  navigate("/profile");
              } else {
                  setError(resultAction.payload);
              }
            })
            .catch((error) => {
                setError(error.message || 'An error occurred');
            });
        }
        catch(e){
          setError(e)
        }
    }

    
  return (
    <div>
      <h1 className='text-center my-5'>Reset Password</h1>
      {errorPage && <Message type="danger">{errorPage}</Message>}
      {error && <Message type="danger">{error}</Message>}
      {loading ? <Loader/> : <>
          <FormContainer>
                  <Form onSubmit={resetPassHandler}>
                    <Form.Group className="mb-3" controlId="password">
                      <Form.Control 
                        required
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Form.Control className='my-3'
                        required
                        type='password'
                        placeholder='Confirm password'
                        value={confPassword}
                        onChange={(e) => setConfPass(e.target.value)}
                      />
                    </Form.Group>
                    <Button variant="primary" type='submit'>
                      Reset Password
                    </Button>
                  </Form>
          </FormContainer> 
        </>}  
    </div>
  )
}

export default ResetPassConf
