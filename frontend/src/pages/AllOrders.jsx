import React from 'react'
import { Row, Col, Button, Card, ListGroup, Image, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAllOrder } from '../slices/orderSlice'
import Message from '../components/Message'
import { useState, useEffect } from 'react'
import Loader from '../components/Loader'
import Order from '../components/Order'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import SearchAdmin from '../components/SearchAdmin'
import AuthGuard from '../components/AuthGuard'
import Paginate from '../components/Paginate'
import { logOut } from '../slices/authSlice'



function AllOrders() {
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
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search);
    const pageUrl = queryParams.get('page') || 1
    const search = queryParams.get('search') || ""
    const keyword = queryParams.get('keyword') || ""

    const [token, setToken] = useState("")

    const authRed = useSelector((state) => state.authRed)
    const { allOrders, loading, error, page, pages} = useSelector((state) => state.orderRed)

    useEffect(() => {
      if (error && error.includes("401")){
          dispatch(logOut())
          localStorage.setItem('redirectAuthInfo', 'true');
          navigate("/login/redirect-auth-required");
      }
    }, [error])

    useEffect(() => {
        if (authRed.authData){
            setToken(authRed.authData.access)
        }
    }, [])



    useEffect(() => {
      if (token){
          let searchKeyword = ""
          if (keyword){
              searchKeyword = `search=${search}&keyword=${keyword}&`}
          dispatch(getAllOrder({token, pageUrl, searchKeyword}))
      }
  }, [token, pageUrl, keyword])


  return (
    <AuthGuard>
      <h1 className='text-center my-3'>My Orders</h1>
      <SearchAdmin path="all-orders" />
      <div className='my-3 list-group-custom'>
            {
                loading ? <Loader/> :
                error ? <Message type="danger">{error}</Message> :

                <Order orders={allOrders}/>
            }
            {allOrders.length === 0 && <h3 className='text-center my-3'>Order was not Found</h3>}
      </div>      
      <Paginate page={page} pages={pages} keyword={``} pathname="" />
    </AuthGuard>
  )
}

export default AllOrders
