import React from 'react';
import PropTypes from 'prop-types';
import LobbyCard from '../LobbyCard/LobbyCard';

const CardContainer = ({ recentTopics }) => {
  const lobbyCard = recentTopics.map((topic, index) => (
    <LobbyCard {...topic} key={index} />
  ));
  return <div className="lobby-card">{lobbyCard}</div>;
};

CardContainer.propTypes = {
  recentTopics: PropTypes.array
};

export default CardContainer;
