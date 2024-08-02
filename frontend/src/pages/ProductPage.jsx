import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button, Col, Row, Image, Card, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../slices/productByIdSlice';

import { addToCart } from '../slices/cartSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';


function ProductPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams()
    const [qnty, setQnty] = useState(1); 
    const { productById, loading, error } = useSelector((state) => state.productByIdRed)
    const cartItems = useSelector((state) => state.cartRed.cartItems)

    useEffect(() => {
      if (id) {
        dispatch(getProductById(id));
      }
    }, [dispatch, id])

    const addCartHandler = () => {
      dispatch(addToCart({
        id: id,
        name: productById.name,
        price: productById.price,
        image: productById.image,
        amountStock: productById.amountStock,
        qnty: qnty,
      }))
    }

    const subQnty = () => {
      if (qnty - 1 >= 0)
        setQnty(qnty => qnty - 1)
    }

    const addQnty = () => {
      setQnty(qnty => qnty + 1)
    }

    return (
        <div>
            <Link to={"/"} className='btn btn-dark my-3'>Go Back</Link> 
            {
              loading ? <Loader /> :
              error ? <Message type="danger">{error}</Message> :
              !productById ? <p>Product not found</p> :
              (<Row>
                <Col md={6}>
                    <Image src={`http://127.0.0.1:8000${productById.image}`} alt={productById.name} style={{ maxWidth: "100%", maxHeight: "60%"}}/>
                </Col>
                <Col md={4}>
                  <Row>
                      <Col>
                          <ListGroup>
                              <ListGroup.Item>
                                  <h3>{productById.name}</h3>
                              </ListGroup.Item>

                              <ListGroup.Item>
                                  <Rating values = {productById.rating} amount={productById.numReviews} color={"#F4CA16"} />
                              </ListGroup.Item>

                              <ListGroup.Item>
                                  Price: <strong>${productById.price}</strong>
                              </ListGroup.Item>

                              <ListGroup.Item>
                                  <strong>Description:</strong> {productById.description}
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
                                              {productById.amountStock > 0 ? <>In Stock ({productById.amountStock})</>
                                              : <>Out of Stock</>}
                                          </strong>
                                      </Col>
                                  </Row>
                              </ListGroup.Item>

                              <ListGroup.Item>
                                  <Row>
                                      <Col>Price:</Col>
                                      <Col><strong>${productById.price}</strong></Col>
                                  </Row>
                              </ListGroup.Item>

                              <ListGroup.Item>
                                  <Row>
                                      <Col>Brand:</Col>
                                      <Col><strong>{productById.brand}</strong></Col>
                                  </Row>
                              </ListGroup.Item>

                              {
                                productById.amountStock > 0 && (
                                  <ListGroup.Item>
                                    <Row>
                                      <Col>
                                        Quantaty:
                                      </Col>
                                      <Col className='justify-content-center align-items-center'>
                                        <Button  onClick={subQnty} disabled={qnty == 1}>-</Button>
                                        <span className='p-4'>{qnty}</span>
                                        <Button  onClick={addQnty} disabled={qnty == productById.amountStock} >+</Button>
                                      </Col>

                                    </Row>
                                  </ListGroup.Item>
                                ) 
                              }

                              <ListGroup.Item className=''>
                                {!(cartItems.find(x => x.id == id)) ?  
                                  <Button onClick={addCartHandler} className='btn-block text-center' disabled={Number(productById.amountStock) < 1} type='button'>
                                      Add To Cart
                                  </Button>
                              :
                              <Button onClick={() => navigate(`/cart/${id}?qty=${qnty}`)} className='btn-block text-center' disabled={Number(productById.amountStock) < 1} type='button'>
                               See The Cart
                              </Button>
                              }
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
              </Row> ) 
            }

        </div>
    )
}

export default ProductPage
