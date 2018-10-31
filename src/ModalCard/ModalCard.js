import React from 'react';

import PropTypes from 'prop-types';

import './ModalCard.css';

const ModalCard = ({ filing_id, issue }) => {
  return (
    <div>
      <h6>{filing_id}</h6>
      <h6>{issue}</h6>
    </div>
  );
};

ModalCard.propTypes = {
  filing_id: PropTypes.number,
  issue: PropTypes.string
};

export default ModalCard;
