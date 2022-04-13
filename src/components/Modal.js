import React, { Component } from 'react'
import { RiCloseLine } from "react-icons/ri";
import FormLinks from './Form';

import "./Modal.css";
// import styles from "./Modal.css";

// this is what I am using as a guide
// https://dev.to/franciscomendes10866/how-to-create-a-modal-in-react-3coc
//
// this was also in my browser... 
// https://medium.com/tinyso/how-to-create-a-modal-component-in-react-from-basic-to-advanced-a3357a2a716a
//
// I think I can put the useSate in my app file but use here maybe

const Modal = ({ setIsOpen,  postLinks }) => {
  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Add important link</h5>
          </div>
          <button className="closeBtn" onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className="modalContent">
            <FormLinks 
              setIsOpen={ setIsOpen }
              postLinks= { postLinks }/>
          </div>
          <div className="modalActions">
            <div className="actionsContainer"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
