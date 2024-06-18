import React from 'react'
import { Container, Row, Col} from 'react-bootstrap'
import Product from '../components/Product.jsx'

import products from '../products.js'


function HomePage() {
    return (
        <>
        <div>
            <h1>New Products</h1>
            <Container>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}/>
                    </Col>
                ))}
            </Row>
            </Container>
        </div>
        </>
    )
  }
  
  export default HomePage