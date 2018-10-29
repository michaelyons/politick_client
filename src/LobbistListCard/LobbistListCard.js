import React from 'react';
import PropTypes from 'prop-types';

const LobbistListCard = ({ name }) => {
  return (
    <div>
      <h6>{name}</h6>
    </div>
  );
};

LobbistListCard.propTypes = {
  name: PropTypes.string
};

export default LobbistListCard;
