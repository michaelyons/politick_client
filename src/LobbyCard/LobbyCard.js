import React from 'react';
// import PropTypes from 'prop-types';

const LobbyCard = ({ name, filing_id, issue, lobbyists, registrant }) => {
  return (
    <div>
      <p>ID: {filing_id}</p>
      <p>Name: {issue}</p>
    </div>
  );
};

export default LobbyCard;
