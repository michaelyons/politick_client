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
      <div className="card-content">
        <p className="title">{topic}</p>
        <p className="subtitle">{filingId}</p>
        <p className="subtitle">{clientName}</p>
        <p className="subtitle">{register}</p>
        <p className="subtitle">{lobbyistLinks}</p>
      </div>
      <footer className="card-footer">
        <p className="card-footer-item">
          <span>
            View on{' '}
            <a href="https://twitter.com/codinghorror/status/506010907021828096">
              Twitter
            </a>
          </span>
        </p>
        <p className="card-footer-item">
          <span>
            Share on <a href="#">Facebook</a>
          </span>
        </p>
      </footer>
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
