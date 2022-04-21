import React, { Component, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { getLinks, postLink, deleteLink } from '../services/api/links'
import { MyVerticallyCenteredModal } from "./Modal"

import update from 'immutability-helper'
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";

import "./Links.css";


class Links extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      modalShow: false
    }
    this.postLinks=this.postLinks.bind(this);
  }

  setModalShow(bool) {
    this.setState({
      modalShow: bool
    });
  }

  async removeLink(link) {
    const { data } = this.state
    const id = link.id

    try {
      await deleteLink(id);
      const linkInd = data.findIndex(link => link.id === id);
      const links = update(data, {
        $splice: [[linkInd, 1]]
      });
      this.setState({
        data: links,
      })
    } catch (error) {
      console.log('ERROR', error)
      alert(`something went wrong deleting the link: ${id}`, error);
    }
  }

  async postLinks(args) {
    try {
      const result = await postLink(args)
      if ( result ) {
        const currentState = this.state.data;
        currentState.push(result.data);
        this.setState({
          data: currentState
        });
      }
    } catch (error) {
      console.error('ERROR', error)
      alert(`something went wrong while creating: ${args.display_text}`, error);
    };
    this.setModalShow(false)
  }

  async componentDidMount() {
    console.warn('component moutning')
    try {
      const links = await getLinks();
      this.setState({
        data: links.data
      });
    } catch (error) {
      // TODO: deal with errors
      console.error('Error in getting links', error);
    }
  };

  render() {
    // TODO: investigate userState
    const links = this.state.data || [];
    const {modalShow} = this.state;
    return (
      <>
        <div className="plus-icon" onClick={() => this.setModalShow(true)}>
          <IoIosAddCircle size='1.2em'/>
        </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => this.setModalShow(false)}
        parentCallback={this.postLinks}
      />
        <div className="link-container">
            { links.map(link => {
              return (
                <>
                  <div className="link-wrapper" link={link} key={link.id}>
                    <div className="link-box link-url">
                       <a 
                        className="link"
                        tag={link.display_text}
                        href={link.url}
                        target='_blank'>{link.display_text}</a>
                    </div>
                    <div className="link-box link-delete-button">
                      <span className="deleteTaskBtn"
                        onClick={(e) => this.removeLink(link)} >
                         x
                      </span>
                    </div>
                    
                  </div>
                </>
              )
            }) }
        </div>
      </>
    )
  };
};

export default Links;
