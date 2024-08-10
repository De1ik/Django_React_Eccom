import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button, Col, Row, Image, Form, ListGroup, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../slices/productByIdSlice';
import { getProductReviews, getUserReview, createReview, editReview } from '../slices/reviewSlice';
import FormContainer from '../components/FormContainer';

import { addToCart } from '../slices/cartSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';
import { logOut } from '../slices/authSlice';
import { toast } from 'react-toastify'

import ReactRating from 'react-rating';

function ProductPage() {

    const notify = (message) => toast.success(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }
    )

    const notifyError = (message) => toast.error(message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }
    )

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const authRed = useSelector((state) => state.authRed)
    const [token, setToken] = useState("")
    const [userId, setUserId] = useState("")
    const [isAuth, setIsAuth] = useState(false)

    const { id } = useParams()
    const [qnty, setQnty] = useState(1); 
    const { productById, loading: prdLoading, error: prdError } = useSelector((state) => state.productByIdRed)
    const { userReview, reviewList, loading: revLoading, error: revError} = useSelector((state) => state.reviewRed)
    const cartItems = useSelector((state) => state.cartRed.cartItems)



    const [newComment, setNewComment] = useState("")
    const [newRating, setNewRating] = useState(5)
    const [isEdit, setIsEdit] = useState(false)


    useEffect(() => {
      if (authRed.authData){
        setToken(authRed.authData.access)
        setUserId(JSON.parse(localStorage.getItem('userData')).id)
      }
      try{
        dispatch(getProductById(id));
        try{
          dispatch(getProductReviews(id))
        }
        catch (e){
          notifyError("Error...Reviews were not downloaded corectly: " + e)
        }
      }
      catch (e){
        navigate("/")
        notifyError("Error...Product was not downloaded corectly")
      }
    },  [])


    useEffect(() => {
      if (token){
        setIsAuth(true)
        dispatch(getUserReview({id, token}))
        // .then((resultAction) => {
        //   if (getUserReview.fulfilled.match(resultAction)){
        //     if (userReview){
        //       setNewComment(userReview.comment)
        //       console.log(userReview.comment)
        //       if (userReview.comment == ""){
        //         setIsEdit(true)
        //       }
        //     }
        //     return
        //   }})
      }
    }, [token])

  useEffect(() => {
      if (revError && revError.includes("401")){
          dispatch(logOut())
          setIsAuth(false)
      }
      notifyError(revError)
  }, [revError])

    useEffect(() => {
      if (userReview && !revLoading){
        if (userReview.comment == ""){
          setIsEdit(true)
        }
        else{
          setNewComment(userReview.comment)
          setNewRating(userReview.rating)
          setIsEdit(false)
        }
      }
      else{
        setNewComment("")
        setNewRating(5)
        setIsEdit(true)
      }
    }, [userReview])



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



    const editHandler = () => {
      try {
        const data = {
          "comment": newComment,
          "rating": newRating
        }
        console.log("NEW RAting:" + newRating)
        dispatch(editReview({token, id, data}))
        notify("Comment was changed")
        setIsEdit(false)
        window.location.reload()
      } catch (error) {
        notifyError("Edit Comment Error: " + error)
      }
    }

    const createHandler = () => {
      try {
        const data = {
          "comment": newComment,
          "rating": newRating
        }
        dispatch(createReview({token, id, data}))
        // notify("Comment was posted")
        setIsEdit(false)
        window.location.reload()
      } catch (error) {
        notifyError("Create Comment Error: " + error)
      }
    }


    const handleSelectChange = (event) => {
      setNewRating(Number(event.target.value));
    };

    return (
        <div>
            <Link to={"/"} className='btn btn-dark my-3'>Go Back</Link> 
            {
              prdLoading ? <Loader /> :
              prdError ? <Message type="danger">{prdError}</Message> :
              !productById ? <p>Product not found</p> :
              (<Row>
                <Col md={5}>
                  <Container>
                    <Image src={`http://127.0.0.1:8000${productById.image}`} alt={productById.name} style={{ maxWidth: "100%", maxHeight: "60%"}}/>
                    
                    <ListGroup className='my-4'> 
                      <ListGroup.Item>
                        <strong>Description:</strong> {productById.description}
                      </ListGroup.Item>
                    </ListGroup>  
                  </Container>
                </Col>
                <Col md={4}>
                  <Row>
                      <Col>
                          <ListGroup>
                              <ListGroup.Item>
                                  <h3>{productById.name}</h3>
                              </ListGroup.Item>

                              <ListGroup.Item>
                                Id: <strong>{productById._id}</strong>
                              </ListGroup.Item>

                              <ListGroup.Item className="d-flex flex-column justify-content-center align-items-center">
                                {!revLoading &&  
                                  <Rating values = {productById.rating} amount={productById.amountReviews} color={"#F4CA16"} />
                                }    
                              </ListGroup.Item>

                              <ListGroup.Item>
                                <Row>
                                  <Col>Price:</Col>
                                  <Col><strong>${productById.price}</strong></Col>
                                </Row>
                              </ListGroup.Item>

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
                <Col md={3} className='text-center my-4'>
                  <Container style={{ border: '2px solid #C7C8C9'}}>
                    <h3 className='text-center mt-1'>Write Review</h3>
                      {isAuth ?
                      revLoading ? <Loader /> :
                      <Container>
                        <Row className='my-3'>
                            <Form>
                                <Form.Group className="mb-3 w-100" controlId="name">
                                    <Form.Control
                                        required
                                        disabled={!isEdit}
                                        as="textarea"
                                        placeholder='Write Comment'
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3 w-100" controlId="rating">
                                  <Form.Control as="select" disabled={!isEdit} value={newRating} onChange={handleSelectChange}>
                                    <option value="">Select Rating</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                  </Form.Control>
                                </Form.Group>
                                {(!revLoading && (userReview === "")) ? 
                                  <>
                                    <Button type="submit" className="w-100" onClick={() => createHandler()}>Create Comment</Button>
                                  </> :
                                  isEdit ? 
                                  <>
                                    <Button type="submit" className="w-100" onClick={() => editHandler()}>Save Comment</Button>
                                    </>
                                    :
                                    <Button className="w-100 btn-secondary" onClick={() => setIsEdit(!isEdit)}>Edit</Button>              
                                }
                            </Form> 
                        </Row>
                      </Container>
                        
                    : 
                    <Container className='my-4'>
                    <span>* You need to login first</span>
                    <Button onClick={() => navigate("/login")} className='w-50'>Login</Button>
                    </Container>
                    }
                  </Container>


                  <Container>
                    <h3 className='text-center my-2'>All Reviews</h3>
                    {reviewList && reviewList.length === 0 ? 
                    <>
                    <hr/>
                    <h5>No comments Yet</h5>
                    </>
                    : 
                      <ListGroup>
                      
                            {reviewList && reviewList.map(review => (
                                  <>
                                  {userId === review.user ? null :
                                    <ListGroup.Item key={review._id}>
                                        <h5><strong>{review.name}</strong></h5>
                                        <hr/>
                                        <Rating values={review.rating} amount={1} color={"#F4CA16"}/>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                  }
                                  </>
                              ))}
                      </ListGroup>
                    }
                  </Container>
                </Col>
              </Row> ) 
            }

        </div>
    )
}

export default ProductPage
