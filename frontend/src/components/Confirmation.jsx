import React from 'react'
import { Button, Modal } from 'react-bootstrap'

function Confirmation({ show, handleClose, handleAction, title, confirmQuestion }) {
    return (
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{confirmQuestion}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button variant="primary" onClick={handleAction}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      )
}

export default Confirmation
