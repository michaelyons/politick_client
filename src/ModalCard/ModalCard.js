import React from 'react';

import PropTypes from 'prop-types';

const ModalCard = ({ modal }) => {
  console.log(modal);
  return (
    <div>
      <h6>hi</h6>
    </div>
  );
};

ModalCard.propTypes = {
  modal: PropTypes.array
};

export default ModalCard;
