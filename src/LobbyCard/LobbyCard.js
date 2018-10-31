import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './LobbyCard.css';

const LobbyCard = ({
  clientName,
  filingId,
  lobbyists,
  register,
  topic,
  setCurrentId,
  fetchLobbyData
}) => {
  const handleClick = async () => {
    const id = await setCurrentId();
    await fetchLobbyData(id);
  };

  const lobbyistLinks = lobbyists.map(person => (
    <Link
      className="lobbyist-name"
      key={person.id}
      to={`/lobbyists/${person.id}`}
      onClick={handleClick}
    >
      {person.name}
    </Link>
  ));

  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">Filing ID: {filingId}</p>
        <a
          href="http://localhost:3000/issues"
          className="card-header-icon"
          aria-label="more options"
        >
          <span className="icon">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </a>
      </header>
      <div className="media">
        <div className="card-content">
          <div className="media-content">
            <p className="title is-size-6">Lobbyist(s): {lobbyistLinks}</p>
            <p className="subtitle">{clientName}</p>
            <p className="subtitle">{register}</p>
          </div>
          <div className="content">{topic}</div>
        </div>
      </div>
    </div>
  );
};

LobbyCard.propTypes = {
  clientName: PropTypes.string,
  filingId: PropTypes.number,
  lobbyists: PropTypes.array,
  register: PropTypes.string,
  topic: PropTypes.string,
  setCurrentId: PropTypes.func,
  fetchLobbyData: PropTypes.func
};

export default LobbyCard;
