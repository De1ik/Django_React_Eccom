import React from 'react'
import OrderSters from '../components/OrderSters'
import FormContainer from '../components/FormContainer'
import { Form, Button, Container } from 'react-bootstrap'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ShippingPage() {

    const navigate = useNavigate()

    const shipData = JSON.parse(localStorage.getItem("shipData")) || ""

    const [country, setCountry] = useState(shipData["country"] || "")
    const [town, setTown] = useState(shipData["town"] || "")
    const [address, setAddress] = useState(shipData["address"] || "")
    const [zipcode, setZipcode] = useState(shipData["zipcode"] || "")
    const [phoneNumber, setPhone] = useState(shipData["phoneNumber"] || "")
    
    const shippingHandler = (e) => {
            e.preventDefault()
            localStorage.setItem(
                "shipData",
                JSON.stringify({
                    "country": country,
                    "town": town,
                    "address": address,
                    "zipcode": zipcode,
                    "phoneNumber": phoneNumber,
                })
            )
            navigate("/pay-method")
        }

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center">
        <h1 className='my-4'>Shipping</h1>
        <OrderSters data={{"step1": true}}/>
        <FormContainer>
            <Form onSubmit={shippingHandler}>
                <Form.Group className="mb-3" controlId="country">
                    <Form.Control 
                        required
                        type='text'
                        placeholder='Enter Your Country'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </Form.Group> 
                <Form.Group className="mb-3" controlId="town">
                    <Form.Control 
                        required
                        type='text'
                        placeholder='Enter your Town'
                        value={town}
                        onChange={(e) => setTown(e.target.value)}
                    />
                </Form.Group> 
                <Form.Group className="mb-3" controlId="address">
                    <Form.Control 
                        required
                        type='text'
                        placeholder='Enter your address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Group>     
                <Form.Group className="mb-3" controlId="zipcode">
                    <Form.Control 
                        required
                        type='text'
                        placeholder='Enter your Zip Code'
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                    />
                </Form.Group> 
                <Form.Group className="mb-3" controlId="phone">
                    <Form.Control 
                        required
                        type='tel'
                        placeholder='Enter your Phone Number'
                        value={phoneNumber}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </Form.Group> 

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

export default ShippingPage
