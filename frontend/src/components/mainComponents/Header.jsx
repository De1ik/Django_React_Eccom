import React from 'react'
import { Container, Nav, Navbar, NavDropdown, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import SearchBox from '../SearchBox'
import { useMediaQuery } from 'react-responsive';

function Header() {
  const { userData } = useSelector((state) => state.authRed)

  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 768px)' });


  return (

    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect className="py-4">
        <Container>
          <LinkContainer to={"/"}>
            <Navbar.Brand>TeddyShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto mr-auto d-flex align-items-center w-100">
              <div className="mx-auto search-container">
                {isDesktopOrLaptop && <SearchBox />}
              </div>
                  <LinkContainer to={"/cart"}>
                    <Nav.Link><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
                  </LinkContainer> 
                
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
                {!userData ? 
                  <LinkContainer to={"/login"}>
                    <Nav.Link><i className='fas fa-user'></i>Login</Nav.Link>
                  </LinkContainer>
                :   <>
                      <LinkContainer to={"/profile"}>
                        <Nav.Link><i className='fas fa-user'></i>Profile</Nav.Link>
                      </LinkContainer>      
                </>}


              </Nav>
              </Navbar.Collapse>
          </Container>
      </Navbar>
    </header>
  )
}

export default Header
