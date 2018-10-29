import React from 'react';
import PropTypes from 'prop-types';
import LobbistListCard from '../LobbistListCard/LobbistListCard';

const LobbistListContainer = ({ lobbyistListCategory }) => {
  const lobbistListCard = lobbyistListCategory.map((list, index) => (
    <LobbistListCard {...list} key={index} />
  ));
  return <div>{lobbistListCard}</div>;
};

LobbistListContainer.propTypes = {
  lobbyistListCategory: PropTypes.array
};

export default LobbistListContainer;
