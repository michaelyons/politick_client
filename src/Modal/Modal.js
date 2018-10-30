import React, { Component } from 'react';

class Modal extends Component {
  constructor() {
    super();
    this.state = {
      active: false
    };
  }

  render() {
    return (
      <div className="modal">
        <div className="modal-background" />
        <div className="modal-content" />
        <button className="modal-close is-large" aria-label="close" />
      </div>
    );
  }
}

export default Modal;
