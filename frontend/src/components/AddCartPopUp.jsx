import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ListGroup, Row, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const AddCartPopUp = ({ show, handleClose, title, product}) => {

    const navigate = useNavigate()
    return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className='text-center'>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <ListGroup>
                <ListGroup.Item key={product.id}>
                    <Row>
                        <Col>
                            <Image src={`http://127.0.0.1:8000${product.image}`} alt={product.name} style={{ maxWidth: "100%"}} fluid rounded/>
                        </Col>
                        <Col>
                            <Link to={`/product/${product.id}`}>
                                {product.name}
                            </Link>
                        </Col>
                        <Col>
                            ${product.price}
                        </Col>
                    </Row>
                </ListGroup.Item>
            </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          Continue shopping
          </Button>
          <Button variant="primary" onClick={() => navigate("/cart")}>
            See Cart
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default AddCartPopUp
