import React from 'react';
import PropTypes from 'prop-types';
import LobbyCard from '../LobbyCard/LobbyCard';

const RecentTopicsContainer = ({ currentCategory }) => {
  const lobbyCard = currentCategory.map((topic, index) => (
    <LobbyCard {...topic} key={index} />
  ));
  return <div>{lobbyCard}</div>;
};

RecentTopicsContainer.propTypes = {
  currentCategory: PropTypes.array
};

export default RecentTopicsContainer;
