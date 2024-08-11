import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <footer className="footer bg-dark text-white py-4 mt-5">
      <Container>
        <Row>
          <Col md={4} className="text-center text-md-left mb-3 mb-md-0">
            <h5>About Us</h5>
            <p>
              We are TeddyShop, your go-to destination for high-quality products. 
              We value customer satisfaction and offer the best deals in the market.
            </p>
          </Col>
          <Col md={4} className="text-center mb-3 mb-md-0">
            <h5>Follow Us</h5>
            <div className="social-icons">
              <a href="https://facebook.com" className="text-white mr-3"><i className="fab fa-facebook-f"></i></a>
              <a href="https://twitter.com" className="text-white mr-3"><i className="fab fa-twitter"></i></a>
              <a href="https://instagram.com" className="text-white"><i className="fab fa-instagram"></i></a>
            </div>
          </Col>
          <Col md={4} className="text-center text-md-right">
            <h5>Contact Us</h5>
            <p>Email: support@teddyshop.com</p>
            <p>Phone: +123 456 7890</p>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} TeddyShop. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
