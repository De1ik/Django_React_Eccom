import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

function Product({product}) {
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
        <Rating values={product.rating} amount={product.numReviews} color={"#F4CA16"} />
      </Card.Text>
      <Card.Text as="h3" className="py-3 product-price">
        ${product.price}
      </Card.Text>
    </Card.Body>
  </Card>
  )
}

export default Product

