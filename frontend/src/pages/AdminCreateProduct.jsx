import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useState } from 'react'
import Loader from '../components/Loader'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import Confirmation from '../components/Confirmation'
import { logOut } from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { updateProduct } from '../slices/adminSlice'
import { createProduct } from '../slices/adminSlice'

function AdminCreateProduct() {

    const notifySuccess = (message) => toast.success(message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const notifyError = (message) => toast.error(message, {
        position: "bottom-right",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [showModal, setShowModal] = useState(false)
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    
    const authRed = useSelector((state) => state.authRed)
    const [token, setToken] = useState("")
    

    const { loading, error, productById, getByIdSucces, deletedSuccess } = useSelector((state) => state.adminRed)

    const [deleteError, setDeleteError] = useState(false)
    const [infoDownloaded, setInfoDownloaded] = useState(false)
    const [changed, setChanged] = useState(false)

    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [preview, setPreview] = useState("")
    const [brand, setBrand] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [amountStock, setAmountStock] = useState("")


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



    const createHandler = (e) => {
        e.preventDefault()
        try{
            const formData = new FormData();
            formData.append("image", image);

            formData.append("name", name);
            formData.append("brand", brand);
            formData.append("category", category);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("amountStock", amountStock);

            dispatch(createProduct( { token, formData} ))
            navigate("/admin/products")
            notifySuccess("Product was created")
        }
        catch(error) {
            notifyError('Create product error:', error)
        }

    }


    const cancelProductHandle = (e) => {
        notifyError('Product was not created')
        navigate("/admin/products")
    };


    useEffect(() => {
        if (deleteError){
            notifyError("Product deleted error... " + error)
            setDeleteError(false)
        }
    }, [deleteError])



    const handleFileChange = (e) => {
        const file = e.target.files[0]
        console.log("NEW FILE: " + file)
        setImage(file)
    
        const reader = new FileReader()
        reader.onloadend = () => {
            setPreview(reader.result)
        }
        reader.readAsDataURL(file)
    }


    return (
        <div>
            <h1 className='text-center m-4'>Product {id}</h1>
            <Row>
                    {!loading ? 
                    <FormContainer>
                        <Form onSubmit={createHandler}>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Control
                                    required
                                    minLength={7}
                                    type='text'
                                    placeholder='Enter product name *'
                                    value={name || ""}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="image">
                                <Form.Control
                                    type="file"
                                    onChange={handleFileChange}
                                />
                            </Form.Group>
                            {preview && <img src={preview} alt="Preview" style={{ 
                                maxWidth: "100%", 
                                marginBottom: "10px",
                                maxHeight: "400px", 
                                display: "block",
                                marginLeft: "auto",
                                marginRight: "auto", 
                            }} />}
                            <Form.Group className="mb-3" controlId="brand">
                                <Form.Control
                                    type='text'
                                    placeholder='Enter product brand'
                                    value={brand || ""}
                                    onChange={(e) => setBrand(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="category">
                                <Form.Control
                                    type='text'
                                    placeholder='Enter product category'
                                    value={category || ""}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="description">
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    placeholder='Enter product description'
                                    value={description || ""}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="price">
                                <Form.Control
                                    required
                                    defaultValue={0}
                                    type='number'
                                    placeholder='Enter product price *'
                                    value={price || ""}
                                    onChange={(e) => setPrice(e.target.value)}
                                    step="0.01"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="amountStock">
                                <Form.Control
                                    required
                                    defaultValue={0}
                                    type='number'
                                    placeholder='Enter product amount in stock *'
                                    value={amountStock || ""}
                                    onChange={(e) => setAmountStock(e.target.value)}
                                />
                            </Form.Group>
                            <Row><span className='mb-2'>* - required field</span></Row>
                            <Row>
                                <Col md={6} className='d-flex flex-column justify-content-center align-items-left'>
                                    <Button variant='primary' type='submit'>
                                        Create
                                    </Button>
                                </Col>
                                <Col md={6} className='d-flex flex-column justify-content-center align-items-right'>
                                    <Button variant="danger"  onClick={handleShow}>
                                        Cancel
                                    </Button>
                                </Col>
                            </Row>
                            <Confirmation
                                show={showModal}
                                handleClose={handleClose}
                                handleAction={cancelProductHandle}
                                title="Cancel Product Creation"
                                confirmQuestion={`Are you sure want to exit? Progress will not save.`}
                            />
                        </Form>
                    </FormContainer>
                    : <Loader/>}
            </Row>
            <Button className='my-4' onClick={() => navigate("/admin/products")}>Back to User List</Button>
        </div>        
      )
}

export default AdminCreateProduct
