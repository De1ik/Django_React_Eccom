import React, {useState} from 'react'
import { Button, Form, FormControl, Col, Row } from 'react-bootstrap'
import {useNavigate, useLocation  } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useEffect } from 'react'




function SearchBox({ withOrder = false, withClear = false}) {
  const navigate = useNavigate();
  const location = useLocation();

  const [keyword, setKeyword] = useState("");
  const [searchOrder, setOrderMode] = useState("");

  const handleSelectChange = (event) => {
    setOrderMode(event.target.value);
  };

  useEffect(() => {
    console.log('Current URL:', location.pathname);
    let searchParams = pathCreation();
    const searchQuery = searchParams.join('&');
    const isCurrentPath = location.pathname === `/?${searchQuery}&page=1`;
    if (!isCurrentPath){
      setKeyword("")
      setOrderMode("")
    }

  }, [location]);


  const pathCreation = () => {
    let searchParams = [];

    if (keyword) {
      searchParams.push(`keyword=${keyword}`);
    }
    if (searchOrder) {
      searchParams.push(`order=${searchOrder}`);
    }

    return searchParams
  }


  const searchSubmitHandler = (e) => {
    e.preventDefault();
    let searchParams = pathCreation();

    if (searchParams.length > 0) {
      const searchQuery = searchParams.join('&');
      navigate(`/?${searchQuery}&page=1`);
    } else {
      notifyError("You need to select the mode of search and enter data");
    }
  };

  const clearHandle = () => {
    setKeyword("");
    setOrderMode("");
    navigate(`/`);
  };

  return (
    <>
      <Form onSubmit={searchSubmitHandler} className="">
        <Row className="gx-2">

          {withClear &&
            <Col xs={3} >
                  <Button
                      variant='danger'
                      className='w-auto mx-1 px-3'
                      onClick={() => clearHandle()}
                      >
                      Clear
                  </Button>
            </Col>
          }

          <Col xs={withClear ? 6 : 8}>
            <FormControl
              type="text"
              name="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className=""
              placeholder="Search..."
            />
          </Col>
          <Col xs={withClear ? 3 : 4}>
            <Button
              type="submit"
              variant={withClear ? "success" : "outline-success"}
            >
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      {withOrder && (
        <Col xs="auto" className='px-1 my-2'>
          <Form.Control as="select" value={searchOrder} onChange={handleSelectChange}>
            <option value="">Order By</option>
            <option value="high-rating">High Rating</option>
            <option value="low-rating">Low Rating</option>
            <option value="high-price">High Price</option>
            <option value="low-price">Low Price</option>
          </Form.Control>
        </Col>
      )}
    </>
  );
}

export default SearchBox;

