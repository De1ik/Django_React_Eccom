import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Confirmation from '../../../components/Confirmation'
import { useNavigate } from 'react-router-dom'
import { logOut } from '../../../slices/authSlice'
import AuthGuard from '../../../components/mainComponents/AuthGuard'
import { adminGetAllProducts, deleteProduct } from '../../../slices/adminSlice'
import { useLocation } from 'react-router-dom'
import Paginate from '../../../components/Paginate.jsx'
import SearchAdmin from '../../../components/SearchAdmin.jsx'

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
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search);
    const pageUrl = queryParams.get('page') || 1
    const search = queryParams.get('search') || ""
    const keyword = queryParams.get('keyword') || ""

    const [searchKeyword, setSeacrhKeyword] = useState("")

    const [token, setToken] = useState("")
    const [productDelete, setProductDelete] = useState("")
    const [showModal, setShowModal] = useState(false)

    const [deleteError, setDeleteError] = useState(false)

    const authRed = useSelector((state) => state.authRed)
    const { loading, error, allProductsList, deletedSuccess, page, pages} = useSelector((state) => state.adminRed)

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
            dispatch(adminGetAllProducts({token, pageUrl, searchKeyword}))
        }
    }, [token, pageUrl, searchKeyword])


    useEffect(() => {
        if (deletedSuccess && token){
            dispatch(adminGetAllProducts({token, pageUrl, searchKeyword}))
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




    return (
        <AuthGuard error={error}>
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <div className='w-100'>
            <Row className='my-4 my-4 d-flex justify-content-between'>
                <Col md={3} xs="auto">
                    <h1>List off All Products</h1>
                </Col>
                <Col className="d-flex flex-column justify-content-center align-items-center">
                    <SearchAdmin admin="products"/>
                </Col>

                <Col className='d-flex justify-content-end' xs="auto">
                    <Button style={{maxHeight: "100px"}} onClick={() => navigate("/admin/create-product")}>Create Product</Button>
                </Col>
            </Row>
            <Row>
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
                {allProductsList.length === 0 && <h3 className='text-center'>Produst was not Found</h3>}
            </Row>
        </div>
        <Confirmation
            show={showModal}
            handleClose={handleClose}
            handleAction={() => deleteProductHandle(productDelete._id)}
            title={"Delete Product Confirmation"}
            confirmQuestion={`Are you sure want to delete ${productDelete.name}?`}
        />
        </div>
        <Paginate page={page} pages={pages} keyword={searchKeyword} pathname="" />
        </AuthGuard>
      )
}

export default AdminAllProducts
