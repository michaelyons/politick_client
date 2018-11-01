import React from 'react';
import PropTypes from 'prop-types';
import LoadingGif from '../LoadingGif/LoadingGif';

const LobbyistShow = ({ lobbyist }) => {
  if (!lobbyist.length) {
    return <LoadingGif />;
  } else {
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
  }
};

LobbyistShow.propTypes = {
  lobbyist: PropTypes.array
};

export default LobbyistShow;
