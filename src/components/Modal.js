import React, { Component } from 'react'
import { RiCloseLine } from "react-icons/ri";
import FormLinks from './Form';

import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import "./Modal.css";

// this is what I am using as a guide
// https://dev.to/franciscomendes10866/how-to-create-a-modal-in-react-3coc
//
// this was also in my browser... 
// https://medium.com/tinyso/how-to-create-a-modal-component-in-react-from-basic-to-advanced-a3357a2a716a

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Link
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormLinks
          {...props}/>
      </Modal.Body>
      <Modal.Footer>
        {/* left this blank intentionally */}
      </Modal.Footer>
    </Modal>
  );
}

export { MyVerticallyCenteredModal };
