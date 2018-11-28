import React from 'react';
import PropTypes from 'prop-types';
import ModalCard from '../ModalCard/ModalCard';

const ModalContainer = ({
  modal,
  congressRealName,
  congressTwitterName,
  currentTwitterUser
}) => {
  const modalCard = modal.map((info, index) => (
    <ModalCard
      {...info}
      key={index}
      currentTwitterUser={currentTwitterUser}
      congressTwitterName={congressTwitterName}
      congressRealName={congressRealName}
    />
  ));
  return (
    <div className="container is-fluid">
      <h1>Related Issues Filed by Date</h1>
      <div className="notification">{modalCard}</div>
    </div>
  );
};

ModalContainer.propTypes = {
  modal: PropTypes.array,
  currentTwitterUser: PropTypes.string,
  congressTwitterName: PropTypes.string,
  congressRealName: PropTypes.string
};

export default ModalContainer;
