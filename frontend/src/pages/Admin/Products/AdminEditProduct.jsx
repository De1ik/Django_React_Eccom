import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import FormContainer from '../../../components/FormContainer'
import { useState } from 'react'
import Loader from '../../../components/Loader'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import Confirmation from '../../../components/Confirmation'
import { logOut } from '../../../slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getProductById } from '../../../slices/adminSlice'
import { updateProduct } from '../../../slices/adminSlice'
import { deleteProduct } from '../../../slices/adminSlice'
import AuthGuard from '../../../components/mainComponents/AuthGuard'

function AdminEditProduct() {

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

    useEffect(() => {
        if (token){
            dispatch(getProductById({id, token}))
        }
    }, [token])


    useEffect(() => {
        if (!loading){
            if (productById !== null){
                setName(productById.name)
                setImage(productById.image)
                setPreview(productById.image.split("?")[0])
                setBrand(productById.brand)
                    
                setCategory(productById.category)
                setDescription(productById.description)
                setPrice(productById.price)
                setAmountStock(productById.amountStock)

                setInfoDownloaded(true)
            }
        }
    }, [productById])


    const updateHandler = (e) => {
        try{
            e.preventDefault()
            if (changed){
                const formData = new FormData();

                if (image) {
                    formData.append('image', image);
                }
                formData.append("name", name);
                formData.append("brand", brand);
                formData.append("category", category);
                formData.append("description", description);
                formData.append("price", price);
                formData.append("amountStock", amountStock);

                dispatch(updateProduct( { token, id, formData} ))
                notifySuccess("Product data was updated")
                
            }
            else{
                notifyError("Data was not changed")
            }
        }
        catch(error) {
            notifyError('Update product error:', error)
        }

    }


    const deleteProductHandle = (e) => {
        try{
            dispatch(deleteProduct({token, id})).then((resultAction) => {
                if (deleteProduct.fulfilled.match(resultAction)){
                    notifySuccess("Product deleted successfully!")
                    navigate("/admin/products")
                    return
                }
                else {
                    setDeleteError(true)
                }
                })
        }
        catch(error) {
            notifyError('Delete user error: ' + error)
        }
        finally{
            handleClose();
        }
    };


    useEffect(() => {
        if (deleteError){
            notifyError("Product deleted error... " + error)
            setDeleteError(false)
        }
    }, [deleteError])

    useEffect(() => {
        if (infoDownloaded){
            if (
                name !== productById.name ||
                image !== productById.image ||
                brand !== productById.brand ||
                category !== productById.category ||
                description !== productById.description ||
                price !== productById.price ||
                amountStock !== productById.amountStock
            ) {
                setChanged(true);
            } else {
                setChanged(false);
            }
        }
    }, [brand, name, image, category, description, price, amountStock]);




    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    }



    return (
        <AuthGuard error={error}>
            <h1 className='text-center m-4'>Product {id}</h1>
            <Row>
                    {!loading ? 
                    <FormContainer>
                        <Form onSubmit={updateHandler}>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Control
                                    required
                                    type='text'
                                    placeholder='Enter product name'
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
                                    required
                                    type='text'
                                    placeholder='Enter product brand'
                                    value={brand || ""}
                                    onChange={(e) => setBrand(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="category">
                                <Form.Control
                                    required
                                    type='text'
                                    placeholder='Enter product category'
                                    value={category || ""}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="description">
                                <Form.Control
                                    required
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
                                    type='number'
                                    placeholder='Enter product price'
                                    value={price || ""}
                                    onChange={(e) => setPrice(e.target.value)}
                                    step="0.01"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="amountStock">
                                <Form.Control
                                    required
                                    type='number'
                                    placeholder='Enter product amount in stock'
                                    value={amountStock || ""}
                                    onChange={(e) => setAmountStock(e.target.value)}
                                />
                            </Form.Group>
                            <Row>
                                <Col md={6} className='d-flex flex-column justify-content-center align-items-left'>
                                    <Button disabled={!changed} variant='primary' type='submit'>
                                        Update
                                    </Button>
                                </Col>
                                <Col md={6} className='d-flex flex-column justify-content-center align-items-right'>
                                    <Button variant="danger"  onClick={handleShow}>
                                        Delete Product
                                    </Button>
                                </Col>
                            </Row>
                            <Confirmation
                                show={showModal}
                                handleClose={handleClose}
                                handleAction={deleteProductHandle}
                                title="Delete Product Confirmation"
                                confirmQuestion={`Are you sure want to delete ${name}?`}
                            />
                        </Form>
                    </FormContainer>
                    : <Loader/>}
            </Row>
            <Button className='my-4' onClick={() => navigate("/admin/products")}>Back to Product List</Button>
        </AuthGuard>        
      )
}

export default AdminEditProduct
