import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Confirmation from '../components/Confirmation'
import { useNavigate } from 'react-router-dom'
import { logOut } from '../slices/authSlice'
import AuthGuard from '../components/AuthGuard'
import SearchAdmin from '../components/SearchAdmin'
import Paginate from '../components/Paginate'
import { useLocation } from 'react-router-dom'
import { adminGetAllOrders } from '../slices/adminSlice'


function AdminAllOrders() {

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

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const [searchKeyword, setSeacrhKeyword] = useState("")

    const queryParams = new URLSearchParams(location.search);
    const pageUrl = queryParams.get('page') || 1
    const search = queryParams.get('search') || ""
    const keyword = queryParams.get('keyword') || ""

    const [token, setToken] = useState("")
    const [userId, setUserId] = useState("")
    const [userDelete, setUserDelete] = useState("")
    const [showModal, setShowModal] = useState(false)

    const [deleteError, setDeleteError] = useState(false)

    const authRed = useSelector((state) => state.authRed)
    const { loading, error, allOrdersList, page, pages} = useSelector((state) => state.adminRed)

    const handleClose = () => {
        setUserDelete("")
        setShowModal(false)
    };
    
    const handleShow = (user) => {
        setUserDelete(user)
        setShowModal(true)
    }

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
        if (keyword){
            setSeacrhKeyword(`search=${search}&keyword=${keyword}&`)}
        else{
            setSeacrhKeyword("")
        }    
    }, [keyword])

    useEffect(() => {
        if (token){
            dispatch(adminGetAllOrders({token, pageUrl, searchKeyword}))
        }
    }, [token, pageUrl, searchKeyword])


    // useEffect(() => {
    //     if (deletedSuccess){
    //         dispatch(getAllUsers(token))
    //     }
    // }, [dispatch, deletedSuccess])


    const orderEditHandle = (id) => {
        navigate(`/admin/order/${id}/edit`)
    }


    // const deleteUserHandle = (id) => {
    //     try{
    //         dispatch(deleteUser({token, id})).then((resultAction) => {
    //             if (deleteUser.fulfilled.match(resultAction)){
    //                 notify("User deleted successfully!")
    //                 return
    //             }
    //             else {
    //                 setDeleteError(true)
    //             }
    //             })
    //     }
    //     catch(error) {
    //         notifyError('Delete user error: ' + error)
    //     }
    //     finally{
    //         handleClose();
    //     }
    // };


    // useEffect(() => {
    //     if (deleteError){
    //         notifyError("User delete error... " + error)
    //         setDeleteError(false)
    //     }
    // }, [deleteError])


  return (
    <AuthGuard error={error}>
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <h1 className='my-4'>List off All Orders</h1>
      <SearchAdmin admin="orders"/>
      <div >
      <table className='text-left styled-table'>
        <thead>
            <tr>
                <th>Id</th>
                <th>Created Date</th>
                <th>Total Price</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {allOrdersList.map((order) => (
                <tr key={order._id} className='active-row'>
                    {console.log(order)}
                    <td>{order._id}</td>
                    <td>{order.createdAt}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.isPaid ? 
                        order.paidAt : 
                        <i className="fa fa-times" aria-hidden="true" style={{color: "red"}}></i>
                        }
                    </td>
                    <td>{order.isDelivered ? 
                        order.deliveredAt
                        : 
                        <i className="fa fa-times" aria-hidden="true" style={{color: "red"}}></i>
                        }
                    </td>
                    <td>
                            <Row>
                                <Col><Button variant="dark" onClick={() => orderEditHandle(order._id)}>Edit</Button></Col>
                                {/* <Col><Button variant="danger" onClick={() => handleShow(user)}>Delete</Button></Col> */}
                            </Row>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    {allOrdersList.length === 0 && <h3 className='text-center'>Order was not Found</h3>}
    </div>
    {/* <Confirmation
        show={showModal}
        handleClose={handleClose}
        handleAction={() => deleteUserHandle(userDelete._id)}
        title={"Delete User " + userDelete.email}
        confirmQuestion="Are you sure want to delete this user?"
    /> */}
    </div>
    <Paginate page={page} pages={pages} keyword={searchKeyword} pathname="" />
    </AuthGuard>
  )
}

export default AdminAllOrders
