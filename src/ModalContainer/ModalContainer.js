import React from 'react';
import PropTypes from 'prop-types';
import ModalCard from '../ModalCard/ModalCard';

const ModalContainer = ({ modal }) => {
  const modalCard = modal.map((info, index) => (
    <ModalCard {...info} key={index} />
  ));
  return (
    <div className="container is-fluid">
      <div className="notification">{modalCard}</div>
    </div>
  );
};

ModalContainer.propTypes = {
  modal: PropTypes.array
};

export default ModalContainer;