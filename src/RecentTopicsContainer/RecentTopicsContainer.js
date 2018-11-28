import React from 'react';
import PropTypes from 'prop-types';
import LobbyCard from '../LobbyCard/LobbyCard';

import './RecentTopicsContainer.css';

const RecentTopicsContainer = ({
  recentTopicsCategory,
  setCurrentId,
  fetchLobbyData,
  currentTwitterUser,
  congressTwitterName,
  congressRealName
}) => {
  const lobbyCard = recentTopicsCategory.map((topic, index) => (
    <LobbyCard
      setCurrentId={setCurrentId}
      {...topic}
      key={index}
      fetchLobbyData={fetchLobbyData}
      currentTwitterUser={currentTwitterUser}
      congressTwitterName={congressTwitterName}
      congressRealName={congressRealName}
    />
  ));
  return (
    <div className="container is-fluid">
      <h1 className="title">Most Recent Lobby Filings</h1>
      <div className="notification">{lobbyCard}</div>
    </div>
  );
};

RecentTopicsContainer.propTypes = {
  recentTopicsCategory: PropTypes.array,
  setCurrentId: PropTypes.func,
  fetchLobbyData: PropTypes.func,
  currentTwitterUser: PropTypes.string,
  congressTwitterName: PropTypes.string,
  congressRealName: PropTypes.string
};

export default RecentTopicsContainer;
