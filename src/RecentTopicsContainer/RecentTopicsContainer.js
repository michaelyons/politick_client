import React from 'react';
import PropTypes from 'prop-types';
import LobbyCard from '../LobbyCard/LobbyCard';

import './RecentTopicsContainer.css';

const RecentTopicsContainer = ({
  recentTopicsCategory,
  setCurrentId,
  fetchLobbyData
}) => {
  const lobbyCard = recentTopicsCategory.map((topic, index) => (
    <LobbyCard
      setCurrentId={setCurrentId}
      {...topic}
      key={index}
      fetchLobbyData={fetchLobbyData}
    />
  ));
  return (
    <div className="container is-fluid">
      <h1>Most Recent Lobby Issues</h1>
      <div className="notification">{lobbyCard}</div>
    </div>
  );
};

RecentTopicsContainer.propTypes = {
  recentTopicsCategory: PropTypes.array,
  setCurrentId: PropTypes.func,
  fetchLobbyData: PropTypes.func
};

export default RecentTopicsContainer;
