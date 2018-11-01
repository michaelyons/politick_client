import React from 'react';

import PropTypes from 'prop-types';

import './ModalCard.css';

const ModalCard = ({ filingId, clientName, topic, register }) => {
  return (
    <div>
      <h1>hi jon</h1>
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">Filing ID: {filingId}</p>
        </header>
        <div className="media">
          <div className="card-content">
            <div className="media-content">
              <p className="title is-size-6">Client {clientName}</p>
              <p className="subtitle">{topic}</p>
              <p className="subtitle">Registered By {register}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ModalCard.propTypes = {
  filingId: PropTypes.number,
  topic: PropTypes.string,
  clientName: PropTypes.string,
  register: PropTypes.string
};

export default ModalCard;
