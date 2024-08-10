import React, {useEffect, useState} from 'react'
import { Button, Form, FormControl, Col, Row, Placeholder } from 'react-bootstrap'
import {useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useMediaQuery } from 'react-responsive';




function SearchAdmin({admin = "", path="admin/"}) {

    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 768px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

    const notifyError = (message) => toast.error(message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true, 
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })


    const navigate = useNavigate()
    const [keyword, setKeyword] = useState("")
    const [searchMode, setSearchMode] = useState("")

    const handleSelectChange = (event) => {
        setSearchMode(event.target.value);
      };


    const searchSubmitHandler = (e) => {
        e.preventDefault()
        // notifyError(searchMode)
        if (searchMode === "id" && keyword){
            navigate(`/${path}${admin}?search=${searchMode}&keyword=${keyword}&page=1`)
        }
        else if (searchMode === "name" && keyword){
            navigate(`/${path}${admin}?search=${searchMode}&keyword=${keyword}&page=1`)
        }
        else if (searchMode === "category" && keyword){
            navigate(`/${path}${admin}?search=${searchMode}&keyword=${keyword}&page=1`)
        }
        else if (searchMode === "email" && keyword){
            navigate(`/${path}${admin}?search=${searchMode}&keyword=${keyword}&page=1`)
        }
        else{
            notifyError("You need select the mode of search and enter data")
        }
    }

    const clearHandle = () => {
        setKeyword("")
        setSearchMode("")
        navigate(`/${path}${admin}`)
    }

    useEffect(() => {
        if (isMobile){
            setSearchMode("id")
        }
    }, [isMobile])

    

  return (
    <Form onSubmit={searchSubmitHandler}>
        <div className='d-flex flex-column justify-content-center align-items-center'>
        <Row>

            <Col xs="auto" className='px-1 my-2'>
                <Button
                    variant='danger'
                    className='w-auto mx-1 px-3'
                    onClick={() => clearHandle()}
                    >
                    Clear
                </Button>
            </Col>

            <Col xs="auto" className='px-1 my-2' >
                <FormControl
                    type={searchMode === "id" ? "number" : "text"}
                    name="id"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className='mr-sm-2 ml-sm-5 w-auto'
                    placeholder={searchMode ? `Search by ${searchMode}` : "Select search mode "}
                    disabled={searchMode===""}
                />
            </Col>

            <Col xs="auto" className='px-1  my-2' hidden={isMobile}>
                    <Form.Control as="select" value={searchMode} onChange={handleSelectChange}>
                                        <option value="">Search By</option>
                                        <option value="id">By Id</option>
                                        { (admin === "products" || admin === "users") && <option value="name">By Name</option>}
                                        { admin === "products" && <option value="category">By Category</option>}
                                        { admin === "users" && <option value="email">By Email</option>}
                                        {/* { admin === "users" && <option value="staff">By Is Staff</option>} */}

                    </Form.Control> 
            </Col>

            <Col xs="auto" className='px-1  my-2'>
                <Button
                    disabled={searchMode === ""}
                    type='submit'
                    variant='success'
                    className='w-auto'
                    >
                        Search
                </Button>
            </Col>
        </Row>
        </div>
    </Form>
  )
}

export default SearchAdmin
