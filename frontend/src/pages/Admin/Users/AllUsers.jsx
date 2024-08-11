import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getAllUsers, deleteUser } from '../../../slices/adminSlice'
import { Button, Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Confirmation from '../../../components/Confirmation'
import { useNavigate } from 'react-router-dom'
import { logOut } from '../../../slices/authSlice'
import SearchAdmin from '../../../components/SearchAdmin'
import { useLocation } from 'react-router-dom'
import Paginate from '../../../components/Paginate'
import AuthGuard from '../../../components/mainComponents/AuthGuard'


function AllUsers() {

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
    const [userId, setUserId] = useState("")
    const [userDelete, setUserDelete] = useState("")
    const [showModal, setShowModal] = useState(false)

    const [deleteError, setDeleteError] = useState(false)

    const authRed = useSelector((state) => state.authRed)
    const { loading, error, allUsersList, deletedSuccess, page, pages } = useSelector((state) => state.adminRed)

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
            setUserId(authRed.userData.id)
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
            dispatch(getAllUsers({token, pageUrl, searchKeyword}))
        }
    }, [token, pageUrl, searchKeyword])


    useEffect(() => {
        if (deletedSuccess && token){
            dispatch(getAllUsers({token, pageUrl, searchKeyword}))
        }
    }, [dispatch, deletedSuccess])


    const userEditHandle = (id) => {
        navigate(`/admin/user/${id}/edit`)
    }


    const deleteUserHandle = (id) => {
        try{
            dispatch(deleteUser({token, id})).then((resultAction) => {
                if (deleteUser.fulfilled.match(resultAction)){
                    notify("User deleted successfully!")
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
            handleClose()
        }
    };


    useEffect(() => {
        if (deleteError){
            notifyError("User delete error... " + error)
            setDeleteError(false)
        }
    }, [deleteError])

  return (
    <AuthGuard error={error}>
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <h1 className='my-4'>List off All Users</h1>
      <div >
      <SearchAdmin admin="users"/>
      <table className='text-left styled-table'>
        <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Is staff</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {allUsersList.map((user) => (
                <tr key={user._id} className='active-row'>
                    <td>{user._id}</td>
                    <td>{user.first_name}</td>
                    <td>{user.email}</td>
                    <td>{user.is_staff ? 
                        <i className="fa fa-check" aria-hidden="true" style={{color: "green"}}></i> : 
                        <i className="fa fa-times" aria-hidden="true" style={{color: "red"}}></i>
                        }</td>
                    <td>
                        {userId != user._id ?
                            <Row>
                                <Col><Button variant="dark" onClick={() => userEditHandle(user._id)}>Edit</Button></Col>
                                <Col><Button variant="danger" onClick={() => handleShow(user)}>Delete</Button></Col>
                            </Row>
                            :
                            <Col className="d-flex flex-column justify-content-center align-items-center">
                                <Button className='w-50' variant="info" onClick={() => userEditHandle(user._id)}>Edit</Button>
                            </Col>
                        }
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    {allUsersList.length === 0 && <h3 className='text-center'>User was not Found</h3>}
    </div>
    <Confirmation
        show={showModal}
        handleClose={handleClose}
        handleAction={() => deleteUserHandle(userDelete._id)}
        title={"Delete User " + userDelete.email}
        confirmQuestion="Are you sure want to delete this user?"
    />
    </div>
    <Paginate page={page} pages={pages} keyword={searchKeyword} pathname="" />
    </AuthGuard>
  )
}

export default AllUsers
