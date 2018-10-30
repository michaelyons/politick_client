import React from 'react';
import PropTypes from 'prop-types';
import LobbistListCard from '../LobbistListCard/LobbistListCard';

const LobbistListContainer = ({ lobbyistListCategory }) => {
  const lobbistListCard = lobbyistListCategory.map((list, index) => (
    <LobbistListCard {...list} key={index} />
  ));
  return (
    <div className="container is-fluid">
      <div className="notification">{lobbistListCard}</div>
    </div>
  );
};

LobbistListContainer.propTypes = {
  lobbyistListCategory: PropTypes.array
};

export default LobbistListContainer;
