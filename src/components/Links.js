// import React, { Component } from 'react'
// import React, { useState, Component } from "react";
import React, { Component } from "react";
import { IoIosAddCircle } from "react-icons/io";

import { getLinks, postLink, deleteLink } from '../services/api/links'
import update from 'immutability-helper'

import "./Links.css";
import "./Modal";

import Modal from './Modal';


class Links extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      isOpen: false
    }
    this.setIsOpen=this.setIsOpen.bind(this);
    this.postLinks=this.postLinks.bind(this);
  }

  addNewLink() {
    console.log('A model will pop up yo')
  }

  setIsOpen(bool) {
    console.warn('setting the modal')
    this.setState({
      isOpen: bool
    });
  }

  async removeLink(link) {
    const { data } = this.state
    const id = link.id

    console.log('delete this link', id, link.display_text)

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

  // FIXME: async await this whole thing needs fixing lol
  // FIXME: try catch yo
  async postLinks(args) {
    console.warn('making the api call', args)
    const result = await postLink(args)
    console.warn('results', result)
    if ( result ) {
      const currentState = this.state.data;
      currentState.push(result.data);
      this.setState({
        data: currentState
      });
    }
    this.setIsOpen(false)
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
    // const [isopen, setisopen] = usestate(false);
    const {isOpen} = this.state;
    const links = this.state.data || [];

    console.warn('LINKS => ', this.state.data)
    return (
      <>
        <div className="link-container">
          <div className="plus-icon" onClick={() => this.setIsOpen(true)}>
            <IoIosAddCircle size='1.2em'/>
          </div>
            {isOpen && <Modal hideBackdrop modalState={ isOpen } setIsOpen={this.setIsOpen}  postLinks={this.postLinks}/>}
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
