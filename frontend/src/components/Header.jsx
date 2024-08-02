import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.authRed)


  return (
    <header>
      <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect className='py-4'>
          <Container>
              <LinkContainer to={"/"}>
                <Navbar.Brand>TeddyShop</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <LinkContainer to={"/cart"}>
                  <Nav.Link><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
                </LinkContainer> 

                {!userData ? 
                  <LinkContainer to={"/login"}>
                    <Nav.Link><i className='fas fa-user'></i>Login</Nav.Link>
                  </LinkContainer>
                :   <>
                      <LinkContainer to={"/profile"}>
                        <Nav.Link><i className='fas fa-user'></i>Profile</Nav.Link>
                      </LinkContainer>      
                </>}

                {userData && userData.is_staff &&
                  <NavDropdown
                              id="nav-dropdown-dark-example"
                              title="Admin"
                              menuVariant="dark"
                  >
                      <LinkContainer to={"/admin/users"}>
                          <NavDropdown.Item>User</NavDropdown.Item>
                      </LinkContainer> 
                      <LinkContainer to={"/admin/orders"}>
                          <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer> 
                      <LinkContainer to={"/admin/products"}>
                          <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer> 
                  </NavDropdown>
               
                }

                  {/* <NavDropdown.Item>
                  <LinkContainer to={"/admin"}>
                    <Nav.Link><i className='fas fa-user'></i>products</Nav.Link>
                  </LinkContainer>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                  <LinkContainer to={"/admin"}>
                    <Nav.Link><i className='fas fa-user'></i>orders</Nav.Link>
                  </LinkContainer>
                  </NavDropdown.Item> */}

              </Nav>
              </Navbar.Collapse>
          </Container>
      </Navbar>
    </header>
  )
}

export default Header
