import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useState } from 'react'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { putUserInfoAction } from '../slices/authSlice'
import { Link, Navigate } from 'react-router-dom'
import Confirmation from '../components/Confirmation'
import { logOut } from '../slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getUserById } from '../slices/adminSlice'
import { updateUser } from '../slices/adminSlice'
import { deleteUser } from '../slices/adminSlice'


function AdminUserEdit() {

    
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
    const [userId, setUserId] = useState("")
    

    const { loading, error, userById, getByIdSucces, deletedSuccess } = useSelector((state) => state.adminRed)

    const [deleteError, setDeleteError] = useState(false)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [isStaff, setIsStaff] = useState(false)

    const [namePage, setNamePage] = useState("")
    const [emailPage, setEmailPage] = useState("")
    const [staffPage, setStaffPage] = useState(false)

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
            setUserId(authRed.userData.id)
        }
    }, [])

    useEffect(() => {
        if (token){
            dispatch(getUserById({id, token}))
        }
    }, [token])


    useEffect(() => {
        if (!loading){
            if (userById !== null && userById._id == id){
                if (name !== namePage || email !== emailPage || isStaff !== staffPage)
                    setName(userById.first_name)
                    setEmail(userById.email)
                    setIsStaff(userById.is_staff)
                    
                    setNamePage(userById.first_name)
                    setEmailPage(userById.email)
                    setStaffPage(userById.is_staff)
            }
        }
    }, [userById])


    const updateHandler = (e) => {
        try{
            e.preventDefault()
            if (name !== namePage || email !== emailPage || isStaff !== staffPage){
                const data = {
                    "first_name": namePage,
                    "email": emailPage,
                    "is_staff": staffPage,
                }
                dispatch(updateUser( { token, id, data} ))
                notifySuccess("User data was updated")
            }
            else{
                notifyError("Data was not changed")
            }
        }
        catch(error) {
            notifyError('Update profile error:', error)
        }

    }


    const deleteUserHandle = (e) => {
        try{
            dispatch(deleteUser({token, id})).then((resultAction) => {
                if (deleteUser.fulfilled.match(resultAction)){
                    notifySuccess("User deleted successfully!")
                    navigate("/admin/users")
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
            notifyError("User deleted error... " + error)
            setDeleteError(false)
        }
    }, [deleteError])


    const handleCheckboxChange = (e) => {
        setStaffPage(e.target.checked);
    }


  return (
    <div>
        <h1 className='text-center m-4'>User Edit</h1>
        <Row>
                <h2 className='text-center p-4'>Your Information</h2>
                {!loading ? 
                <FormContainer>
                    <Form onSubmit={updateHandler}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Control
                                required
                                type='text'
                                placeholder='Enter user name'
                                value={namePage}
                                onChange={(e) => setNamePage(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Control
                                required
                                type='email'
                                placeholder='Enter user email'
                                value={emailPage}
                                onChange={(e) => setEmailPage(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="is-staff">
                        <Form.Check // prettier-ignore
                            type='checkbox'
                            id={`default-checkbox`}
                            label={`Is Staff?`}
                            checked={staffPage}
                            onChange={handleCheckboxChange}
                        />
                        </Form.Group>
                        <Row>
                        {userId != id ?
                        <>
                            <Col md={6} className='d-flex flex-column justify-content-center align-items-left'>
                                <Button variant='primary' type='submit'>
                                    Update
                                </Button>
                            </Col>
                            <Col md={6} className='d-flex flex-column justify-content-center align-items-right'>
                                <Button variant="danger"  onClick={handleShow}>
                                    Delete User
                                </Button>
                            </Col>
                        </>
                        :
                        <>
                            <Col className='d-flex flex-column justify-content-center align-items-left'>
                                <Button variant='primary' type='submit'>
                                    Update
                                </Button>
                            </Col>
                        </>
                        }
                        </Row>
                        <Confirmation
                            show={showModal}
                            handleClose={handleClose}
                            handleAction={deleteUserHandle}
                            title="Delete User"
                            confirmQuestion={`Are you sure want to delete ${email}?`}  
                        />
                    </Form>
                </FormContainer>
                : <Loader/>}
        </Row>
        <Button className='my-4' onClick={() => navigate("/admin/users")}>Back to User List</Button>
    </div>        
  )
}

export default AdminUserEdit
