import React from 'react'
import { Button } from 'react-bootstrap'
import { activatorAction } from '../slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


function EmailActivate() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { uid, token } = useParams()
    const [errorMess, setError] = useState("")
    const { loading, error, emailAcivated} = useSelector((state) => state.authRed)

    const emailActivator = (e) => {
        try{
            e.preventDefault()
            dispatch(activatorAction({ uid, token })).then((resultAction) => {
                if (activatorAction.fulfilled.match(resultAction)) {
                    navigate("/login");
                } else {
                    setError(resultAction.payload);
                }
            })
            .catch((error) => {
                setError(error.message || 'An error occurred');
            });
        } catch (e) {
            setError(e.message || 'An error occurred');
        }
    }

  return (
    <div>
        <h1 className='text-center m-4'>Activate Your Email account</h1>
        {loading ? <Loader/> : 
            <>
                {error && <Message type="danger">{errorMess}</Message>}
                <p className="text-center"><Button onClick={emailActivator}>Activate Account</Button></p>
            </>
        }
    </div>
  )
}

export default EmailActivate
