import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Confirmation from '../components/Confirmation'
import { useNavigate } from 'react-router-dom'
import { logOut } from '../slices/authSlice'
import AuthGuard from '../components/AuthGuard'
import { adminGetAllProducts, deleteProduct } from '../slices/adminSlice'

function AdminAllProducts() {

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
    const [token, setToken] = useState("")
    // const [userId, setUserId] = useState("")
    const [productDelete, setProductDelete] = useState("")
    const [showModal, setShowModal] = useState(false)

    const [deleteError, setDeleteError] = useState(false)

    const authRed = useSelector((state) => state.authRed)
    const { loading, error, allProductsList, deletedSuccess} = useSelector((state) => state.adminRed)

    const handleClose = () => {
        setProductDelete("")
        setShowModal(false)
    };
    
    const handleShow = (product) => {
        setProductDelete(product)
        setShowModal(true)
    }

    useEffect(() => {
        if (error && error.includes("401")){
            notify(token)
            notifyError(error)
            // dispatch(logOut())
            // localStorage.setItem('redirectAuthInfo', 'true');
            // navigate("/login/redirect-auth-required");
        }
    }, [error])

    useEffect(() => {
        if (authRed.authData){
            setToken(authRed.authData.access)
            // setUserId(authRed.userData.id)
        }
    }, [])

    useEffect(() => {
        if (token){
            dispatch(adminGetAllProducts(token))
        }
    }, [token])


    useEffect(() => {
        if (deletedSuccess){
            dispatch(adminGetAllProducts(token))
        }
    }, [dispatch, deletedSuccess])


    const userEditHandle = (id) => {
        navigate(`/admin/product/${id}/edit`)
    }


    const deleteProductHandle = (id) => {
        try{
            dispatch(deleteProduct({token, id})).then((resultAction) => {
                if (deleteProduct.fulfilled.match(resultAction)){
                    notify("Product deleted successfully!")
                    return
                }
                else {
                    setDeleteError(true)
                }
                })
        }
        catch(error) {
            notifyError('Delete product error: ' + error)
        }
        finally{
            handleClose();
        }
    };


    useEffect(() => {
        if (deleteError){
            notifyError("Product delete error... " + error)
            setDeleteError(false)
        }
    }, [deleteError])

    console.log(allProductsList)


    return (
        <AuthGuard error={error}>
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <div >
            <Row className='my-4 my-4 d-flex justify-content-between'>
                <Col >
                    <h1>List off All Products</h1>
                </Col>
                <Col className='d-flex justify-content-end'>
                    <Button onClick={() => navigate("/admin/create-product")}>Create Product</Button>
                </Col>
            </Row>
            <table className='text-left styled-table'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>amountStock</th>
                    <th>createdAt</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {allProductsList.map((product) => (
                    <tr key={product._id} className='active-row'>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{product.amountStock}</td>
                        <td>{product.createdAt}</td>
                        <td>
                            <Row>
                                <Col><Button variant="dark" onClick={() => userEditHandle(product._id)}>Edit</Button></Col>
                                <Col><Button variant="danger" onClick={() => handleShow(product)}>Delete</Button></Col>
                            </Row>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
        <Confirmation
            show={showModal}
            handleClose={handleClose}
            handleAction={() => deleteProductHandle(productDelete._id)}
            title={"Delete Product Confirmation"}
            confirmQuestion={`Are you sure want to delete ${productDelete.name}?`}
        />
        </div>
        </AuthGuard>
      )
}

export default AdminAllProducts
