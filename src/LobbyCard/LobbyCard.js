import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoadingGif from '../LoadingGif/LoadingGif';
import './LobbyCard.css';

const LobbyCard = ({
  clientName,
  filingId,
  date,
  lobbyists,
  register,
  topic,
  setCurrentId,
  fetchLobbyData
}) => {
  if (!lobbyists) {
    return <LoadingGif />;
  } else {
    const handleClick = async () => {
      const id = await setCurrentId();
      fetchLobbyData(id);
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
          <button>
            Tweet This Issue
            <i className="fab fa-twitter" />
          </button>
          <p className="card-header-icon is-italic">Filed: {date}</p>
        </header>
        <div className="media">
          <div className="card-content">
            <div className="media-content">
              <p className="title is-size-6">Lobbyist(s): {lobbyistLinks}</p>
              <p className="subtitle">{clientName}</p>
              <p className="subtitle">Registered by: {register}</p>
            </div>
            <div className="content">{topic}</div>
          </div>
        </div>
      </div>
    );
  }
};

LobbyCard.propTypes = {
  clientName: PropTypes.string,
  filingId: PropTypes.number,
  lobbyists: PropTypes.array,
  register: PropTypes.string,
  topic: PropTypes.string,
  setCurrentId: PropTypes.func,
  fetchLobbyData: PropTypes.func,
  date: PropTypes.string
};

export default LobbyCard;
