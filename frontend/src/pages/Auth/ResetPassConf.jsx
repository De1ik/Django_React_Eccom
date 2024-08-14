import React from 'react'
import { useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { useNavigate } from 'react-router-dom'
import FormContainer from '../../components/FormContainer'
import { resetPassConfirmAction } from '../../slices/authSlice'

function ResetPassConf() {
    const { uid, token } = useParams()
    const [password, setPassword] = useState("")
    const [errorPage, setError] = useState("")
    const [confPassword, setConfPass] = useState("")
    const [message, setMessage] = useState("")
    const [isDisabled, setIsDisabled] = useState(true)

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

    useEffect(() => {
      if (password === confPassword && password !== ""){
        setIsDisabled(false)
        setMessage("")
      }
      else if (password !== "" && confPassword !== "" && password !== confPassword){
          setMessage("passwords must be equal")
      }
      else{
          setMessage("")
      }
  }, [password, confPassword])

    
  return (
    <div>
      <h1 className='text-center my-5'>Reset Password</h1>
      {error && !error.includes("400") && <Message type="danger">{error}</Message>}
      {error && error.includes("400") && <Message type="danger">{"The password doesn't match the rights"}</Message>}
      {loading ? <Loader/> : <>
          <FormContainer>
                  <Form onSubmit={resetPassHandler}>
                  <span style={{fontSize:"small"}}>
                    *min length - 8 <br/>
                    *min one letter <br/>
                    *min one number <br/>
                    *can not be easy like: <strong>qwerty12345</strong>
                  </span>
                    <Form.Group className="mb-3 mt-2" controlId="password">
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
                    {message && <Message type="warning">{message}</Message>}
                    <Button variant="primary" type='submit' disabled={isDisabled}>
                      Reset Password
                    </Button>
                  </Form>
          </FormContainer> 
        </>}  
    </div>
  )
}

export default ResetPassConf
