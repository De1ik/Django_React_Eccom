import React from 'react'
import OrderSters from '../components/OrderSters'
import FormContainer from '../components/FormContainer'
import { Form, Button, Container } from 'react-bootstrap'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Message from '../components/Message'

function PayMethodPage() {

    const navigate = useNavigate()

    const payment = JSON.parse(localStorage.getItem("paymentMethod")) || ""
    const [paymentMethod, setPayment] = useState(payment ? payment.paymentMethod : "")
    const [pageError, setPageError] = useState("")

    const handleChange = (event) => {
        setPayment(event.target.value);
      };

    const payMethodHandler = (e) => {
        e.preventDefault()
        try{
            if (paymentMethod === null || paymentMethod === ""){
                setPageError("Please select the payment method")
            }
            else{
                localStorage.setItem(
                    "paymentMethod",
                    JSON.stringify({
                        paymentMethod,
                    })
                )
                navigate("/checkout")
            }
        }
        catch (e) {
            setPageError("Error during payment selection. Try again later")
        }
    }

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center">
        <h1 className='my-4'>Pay Method</h1>
        <OrderSters data={{"step1": true, "step2": true}}/>
        <FormContainer>
            <Form onSubmit={payMethodHandler}>
                {pageError && <Message type="danger">{pageError}</Message>}
                <Form.Check
                    type="radio"
                    label="Paypall"
                    name="payment"
                    value="paypall"
                    checked={paymentMethod === 'paypall'}
                    onChange={handleChange}
                />
                <Form.Check
                    type="radio"
                    label="Google Pay"
                    name="payment"
                    value="googlePay"
                    checked={paymentMethod === 'googlePay'}
                    onChange={handleChange}
                />
                <Form.Check
                    type="radio"
                    label="After delivery"
                    name="payment"
                    value="After delivery"
                    checked={paymentMethod === 'After delivery'}
                    onChange={handleChange}
                />


                
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <Button style={{ minWidth: '100px' }} variant="primary" type='submit'>
                        Submit
                    </Button>
                </div>
            </Form>  
        </FormContainer>
    </Container>
  )
}

export default PayMethodPage
