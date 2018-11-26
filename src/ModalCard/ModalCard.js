import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ModalCard.css';

class ModalCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetActive: false
    };
  }

  toggleTwitterClass = () => {
    const currentState = this.state.tweetActive;
    this.setState({ tweetActive: !currentState });
  };

  render() {
    const { filingId, clientName, topic, register, date } = this.props;
    return (
      <div>
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">Filing ID {filingId}</p>
            <p className="card-header-icon is-italic">Filed {date}</p>
          </header>
          <div className="media">
            <div className="card-content">
              <div className="media-content">
                <p className="title is-size-6">{topic}</p>
                <p className="subtitle">For Client {clientName}</p>
                <p className="subtitle">Registered by {register}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ModalCard.propTypes = {
  filingId: PropTypes.number,
  topic: PropTypes.string,
  clientName: PropTypes.string,
  register: PropTypes.string,
  date: PropTypes.string
};

export default ModalCard;
