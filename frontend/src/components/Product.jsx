import React from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import AddCartPopUp from './AddCartPopUp'
import { addToCart } from '../slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux'


function Product({product}) {

  const dispatch = useDispatch()

  const cartItems = useSelector((state) => state.cartRed.cartItems)
  const [qnty, setQnty] = useState(1); 

  const subQnty = () => {
    if (qnty - 1 >= 0)
      setQnty(qnty => qnty - 1)
  }

  const addQnty = () => {
    setQnty(qnty => qnty + 1)
  }

  const [showModal, setShowModal] = useState(false)
  const handleClose = () => setShowModal(false);
  const handleShow = () => {
    addCartHandler()
    setShowModal(true)
  }

  const addCartHandler = () => {
    dispatch(addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      amountStock: product.amountStock,
      qnty: qnty,
    }))
  }

  return (
    <Card className="my-3 p-3 rounded product-card" style={{height:"auto"}}>
    <Link to={`/product/${product._id}`}>
      <Card.Img
        src={`http://127.0.0.1:8000${product.image}`}
        alt={product.name}
        className="product-image"
        
      />
    </Link>
    <Card.Body className="d-flex flex-column">
      <Link to={`/product/${product._id}`}>
        <Card.Title as="div" className="product-title">
          <strong>{product.name}</strong>
        </Card.Title>
      </Link>
      <Card.Text as="div" className="flex-grow-1">
        <Rating values={product.rating} amount={product.amountReviews} color={"#F4CA16"} />
      </Card.Text>
      <Card.Text as="h3" className="py-2 product-price">
        ${product.price}
      </Card.Text>

      <Row className='mb-4'>
        <Col className='justify-content-center align-items-center'>
          <Button variant='secondary' onClick={subQnty} disabled={qnty == 1}>-</Button>
          <span className='p-4'>{qnty}</span>
          <Button variant='secondary' onClick={addQnty} disabled={qnty == product.amountStock} >+</Button>
        </Col>
      </Row>   

      {
        !(cartItems.find(x => x.id === product._id)) ?  
              <Button onClick={handleShow} className='btn-block text-center py-2' disabled={Number(product.amountStock) < 1} type='button'>
                  Add To Cart
              </Button>
          :
          <Button onClick={() => navigate(`/cart`)} className='btn-block text-center py-2'variant='secondary' disabled={Number(product.amountStock) < 1} type='button'>
           See The Cart
          </Button>
      }                           

      <AddCartPopUp
            show={showModal}
            handleClose={handleClose}
            title="Product was Added to cart"
            product={product}
      />
    </Card.Body>
  </Card>
  )
}

export default Product

