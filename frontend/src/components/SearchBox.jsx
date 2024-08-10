import React, {useState} from 'react'
import { Button, Form, FormControl, Col, Row } from 'react-bootstrap'
import {useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'




function SearchBox({ withOrder = false }) {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [searchOrder, setOrderMode] = useState("");

  const handleSelectChange = (event) => {
    setOrderMode(event.target.value);
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    let searchParams = [];

    if (keyword) {
      searchParams.push(`keyword=${keyword}`);
    }
    if (searchOrder) {
      searchParams.push(`order=${searchOrder}`);
    }

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
          <Col xs={8}>
            <FormControl
              type="text"
              name="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-100"
              placeholder="Search..."
            />
          </Col>
          <Col xs={4}>
            <Button
              type="submit"
              variant="outline-success"
              className=""
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

