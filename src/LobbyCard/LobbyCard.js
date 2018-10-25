import React from 'react';
import PropTypes from 'prop-types';

import './LobbyCard.css';

const LobbyCard = ({ clientName, filingId, lobbyists, register, topic }) => {
  return (
    <div className="lobby-cards">
      <p>ID: {filingId}</p>
      <p>Name: {clientName}</p>
      <p>Topic: {topic}</p>
      <p>Lobbyists: {lobbyists}</p>
      <p>Registrar: {register}</p>
    </div>
  );
};

LobbyCard.propTypes = {
  clientName: PropTypes.string,
  filingId: PropTypes.number,
  lobbyists: PropTypes.array,
  register: PropTypes.string,
  topic: PropTypes.string
};

export default LobbyCard;
