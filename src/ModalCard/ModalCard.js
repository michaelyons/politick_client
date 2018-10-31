import React from 'react';

import PropTypes from 'prop-types';

import './ModalCard.css';

const ModalCard = ({ filingId, clientName, topic, register }) => {
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">Filing ID: {filingId}</p>
        <a
          href="http://localhost:3000/issues"
          className="card-header-icon"
          aria-label="more options"
        />
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
  );
};

ModalCard.propTypes = {
  filingId: PropTypes.number,
  topic: PropTypes.string
};

export default ModalCard;
