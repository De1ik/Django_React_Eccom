import React from 'react'
import { useParams, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Col, Row, Image, Card, ListGroup } from 'react-bootstrap';
import Rating from '../components/Rating';

import products from '../products';


function ProductPage() {
    const { id } = useParams();
    const product = products.find((p) => p._id === id);
    
    return (
        <div>
        <Link to={"/"} className='btn btn-dark my-3'>Go Back</Link>
        <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
                <Row>
                    <Col fluid>
                        <ListGroup fluid>
                            <ListGroup.Item>
                                <Card.Title>{product.name}</Card.Title>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Rating values = {product.rating} amount={product.numReviews} color={"#F4CA16"} />
                            </ListGroup.Item>

                            <ListGroup.Item>
                                Price: <strong>${product.price}</strong>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <strong>Description:</strong> {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
                <Row>
                    <Col className='py-5'>
                        <ListGroup variant='flush'>
                            
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        <strong>
                                            {product.countInStock > 0 ? <>In Stock ({product.countInStock})</>
                                            : <>Out of Stock</>}
                                        </strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col><strong>${product.price}</strong></Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Brand:</Col>
                                    <Col><strong>{product.brand}</strong></Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item className=''>
                                <Button className='btn-block text-center' disabled={product.countInStock == 0} type='button'>
                                    Add To Cart
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Col>
                </Row>
            </Col>
            <Col md={2} className='text-center'>
                <ListGroup>
                    <ListGroup.Item>Some Additional Info</ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>    
        </div>
  )
}

export default ProductPage
