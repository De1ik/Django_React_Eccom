import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {Button} from 'react-bootstrap'

function OrderSters({data}) {

    const { step1, step2, step3 } = data || null

  return (
        <Nav className="mr-auto">
            <Button variant='link' disabled={!step1 && !step1}>     
                <LinkContainer to={"/shipping"}>
                  <Nav.Link><i class="fas fa-shipping-fast"></i> Shipping</Nav.Link>
                </LinkContainer>
            </Button>    
            <Button variant='link' disabled={!step2 && !step2}>     
                <LinkContainer to={"/pay-method"}>
                  <Nav.Link><i class="fas fa-credit-card"></i> Pay Method</Nav.Link>
                </LinkContainer>
            </Button>    
            <Button variant='link' disabled={!step3 && !step3}>     
                <LinkContainer to={"/cheсkout"}>
                  <Nav.Link><i class="far fa-thumbs-up"></i> Checkout</Nav.Link>
                </LinkContainer>
            </Button>    
        </Nav> 
  )
}

export default OrderSters
