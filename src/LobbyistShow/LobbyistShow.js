import React from 'react';
import PropTypes from 'prop-types';

const LobbyistShow = ({ lobbyist }) => {
  return lobbyist.map((item, index) => (
    <div className="card" key={index}>
      <header className="card-header">
        <p className="card-header-title">Filing ID: {item.filingId}</p>
        <p className="card-header-icon is-italic">Filed: {item.date}</p>
      </header>
      <div className="media">
        <div className="card-content">
          <div className="media-content">
            <p className="subtitle">{item.clientName}</p>
            <p className="subtitle">Registered by: {item.register}</p>
          </div>
          <div className="content">{item.topic}</div>
        </div>
      </div>
    </div>
  ));
};

LobbyistShow.propTypes = {
  lobbyist: PropTypes.array
};

export default LobbyistShow;
