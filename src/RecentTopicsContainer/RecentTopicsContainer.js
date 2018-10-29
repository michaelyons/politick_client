import React from 'react';
import PropTypes from 'prop-types';
import LobbyCard from '../LobbyCard/LobbyCard';

const RecentTopicsContainer = ({ recentTopicsCategory }) => {
  const lobbyCard = recentTopicsCategory.map((topic, index) => (
    <LobbyCard {...topic} key={index} />
  ));
  return <div>{lobbyCard}</div>;
};

RecentTopicsContainer.propTypes = {
  recentTopicsCategory: PropTypes.array
};

export default RecentTopicsContainer;
