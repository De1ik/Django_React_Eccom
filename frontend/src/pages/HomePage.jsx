import React, { useState, useEffect } from 'react'
import { Container, Row, Col} from 'react-bootstrap'
import Product from '../components/Product.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../slices/productListSlice.js'
import Loader from '../components/Loader.jsx'
import Message from '../components/Message.jsx'



function HomePage() {
    
    const dispatch = useDispatch()
    const { products, loading, error } = useSelector((state) => state.productsList)
    
    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <>
        <div>
            <h1>New Products</h1>

            {
                loading ? <Loader/> :
                error ? <Message type="danger">{error}</Message> :
                <Container>
                    <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product}/>
                            </Col>
                        ))}
                    </Row>
                </Container>
            }
        </div>
        </>
    )
  }
  
  export default HomePage