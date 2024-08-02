import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

function Product({product}) {
  return (
    <Card className='my-3 p-3 rounded' style={{ maxWidth: "100%", minHeight: "400px", maxHeight: "400px"}}>

        <Link to={`/product/${product._id}`}>
            <Card.Img src={`http://127.0.0.1:8000${product.image}`} alt={product.name} style={{ maxWidth: "100%", minHeight: "200px", maxHeight: "200px"}} />
            {/* {console.log(`${process.env.REACT_APP_API_URL}`)} */}
        </Link>

        <Card.Body>
            <Link to={`/product/${product._id}`}>
                <Card.Title as="div">
                    <strong>{product.name}</strong>    
                </Card.Title>
            </Link>

            <Card.Text as="div">
                <Rating values={product.rating} amount={product.numReviews} color={"#F4CA16"}/>
            </Card.Text>

            <Card.Text as="h3" className='py-3'>
                ${product.price}
            </Card.Text>

        </Card.Body>



    </Card>
  )
}

export default Product

