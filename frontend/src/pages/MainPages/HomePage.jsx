import React, { useState, useEffect } from 'react'
import { Container, Row, Col} from 'react-bootstrap'
import Product from '../../components/Product.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../../slices/productListSlice.js'
import Loader from '../../components/Loader.jsx'
import Message from '../../components/Message.jsx'
import { useLocation } from 'react-router-dom'
import Paginate from '../../components/Paginate.jsx'
import ProductCarousel from '../../components/ProductCarousel.jsx'
import SearchBox from '../../components/SearchBox.jsx'
import { useMediaQuery } from 'react-responsive';




function HomePage() {
    
    const location = useLocation();
    const defaultPathname = location.pathname === "/" ? "products" : "";

    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get('keyword') || ""
    const pageUrl = queryParams.get('page') || 1
    const userOrder = queryParams.get('order') || ""

    const dispatch = useDispatch()
    const { products, loading, error, page, pages, prdTopRating } = useSelector((state) => state.productsList)

    const [searchKeyword, setSearchKeyword] = useState("")

    useEffect(() => {
      let path = ""
      setSearchKeyword("")
      if (userOrder || keyword) {
        if (userOrder){
          path += `order=${userOrder}&`
        }
        if (keyword){
          path += `keyword=${keyword}&`
        }
      }
      setSearchKeyword(path)
      dispatch(listProducts({path, pageUrl}))
    }, [userOrder, pageUrl, keyword])

    return (
        <>
        <div>
          {((keyword === "" && pageUrl === 1) ||  (products.length === 0)) && <ProductCarousel />}
          {(keyword === "") ? 
          <h1 className="text-center m-4">Latest Products</h1> 
          : <h1 className="text-center m-4">Searched: {keyword}</h1>}

          <div className="d-flex flex-column justify-content-center align-items-center border-bottom pb-4">
            <SearchBox withOrder={true} withClear={true} />
          </div>
  
          {loading ? (
            <Loader />
          ) : error ? (
            <Message type="danger">{error}</Message>
          ) : products.length === 0 ? (
            <h3 >Product was not found</h3>
          ) : (
            <>
            <Container className='mb-5'>
              <Row>
                {products.map((product) => (
                  <Col key={product._id} sm={6} md={4} lg={3} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            </Container>
            </>
          )}
        </div>
        <Paginate page={page} pages={pages} keyword={searchKeyword} pathname={defaultPathname} />

      </>
    )
  }
  
  export default HomePage