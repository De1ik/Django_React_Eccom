import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import { toast } from 'react-toastify'
import { getPrdTopRating } from '../slices/productListSlice'

function ProductCarousel() {

    const dispatch = useDispatch()
    const { prdTopRating, loading } = useSelector((state) => state.productsList)

    useEffect(() => {
        dispatch(getPrdTopRating())
        console.log(prdTopRating)
    }, [])

  return (loading ? <Loader/> :
    <div className="carousel-container d-flex flex-column justify-content-center align-items-center my-3">
      <Carousel pause="hover" className='bg-dark'>
        {prdTopRating.map(product => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
              <Image src={`http://127.0.0.1:8000${product.image}`} alt={product.name} fluid className="carousel-image"/>
              <Carousel.Caption className='carousel-caption'>
                <h3>{product.name} (${product.price})</h3>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}

export default ProductCarousel
