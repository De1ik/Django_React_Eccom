import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import FormContainer from '../../components/FormContainer'
import { resetPassAction } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { resendPasswordEmail } from '../../slices/authSlice'

function ResetPass() {

    const navigate = useNavigate()
    const userData = JSON.parse(localStorage.getItem("userData")) || null
    const emailLocalStr = userData ? userData["email"] : ""
    const [email, setEmail] = useState(emailLocalStr)
    const [pageError, setPageError] = useState("")
    const dispatch = useDispatch()
    const { resetPassRequest, loading, error, isAuth } = useSelector((state) => state.authRed)

    const resetPassHandler = (e) => {
      e.preventDefault()
      if (emailLocalStr === "" || emailLocalStr === email){
        try{
          dispatch(resetPassAction(email))
          setPageError("")
        }
        catch(e){
          setPageError("Reset password error: " + e)
        }
      } 
      else {
        setPageError("This email is not validate for your current account")
      }
    }

    const backHandler = () => {
      if (isAuth){
        navigate("/profile")
      }
      else {
        navigate("/login")
      }
    }  


    const resendPassHandler = () => {
        try{
          dispatch(resendPasswordEmail())
        }
        catch(e){
          setPageError("Resend password error: " + e)
        }
    }

    
    
  return (
    <div>
      <h1 className='text-center my-5'>Reset Password</h1>
      {loading && loading ? <Loader/> : <>
        {error && <Message variant="danger">{error}</Message>}
        {pageError && <Message variant="danger">{pageError}</Message>}
        {
          !resetPassRequest ? 
              <>
                <FormContainer>
                  <Form onSubmit={resetPassHandler}>
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Control 
                        required
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Button variant="primary" type='submit'>
                      Reset Password
                    </Button>
                  </Form>
                </FormContainer> 
              </>  
          : 
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h4 className='text-center'><strong>Check the confirmation list on your Email</strong></h4> 
              <Button className='my-4' style={{ minWidth: '130px' }} variant="secondary" onClick={resendPassHandler}>Resend Email</Button>     
            </div> 
        }
          <Button style={{ minWidth: '100px' }} variant="secondary" className="m-3" onClick={backHandler}>Back</Button>
      </>}
      
    </div>
  )
}

export default ResetPass
