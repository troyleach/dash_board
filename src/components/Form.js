import React from 'react'

import "./Form.css";

class FormLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display_text: '',
      url: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({[name]: value});
  }

  handleSubmit(event) {
    this.props.postLinks(this.state)
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='input-container'>
          <input
            name='display_text'
            className='input-element'
            type="text" value={this.state.display_text}
            onChange={this.handleChange}
            placeholder='Display Text' />
        </div>
        <div className='input-container'>
          <input
            name='url'
            className='input-element'
            type="text"
            value={this.state.url}
            onChange={this.handleChange}
            placeholder='Past link' />
        </div>
        <div className='label-tag'>
          <input className='addBtn' type="submit" value="Add" />
        </div>
      </form>
    );
  }
}

export default FormLinks;
