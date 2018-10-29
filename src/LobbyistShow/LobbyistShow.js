import React from 'react';
import PropTypes from 'prop-types';

const LobbyistShow = ({ lobbyist }) => {
  console.log(lobbyist);
  return <h1>hi</h1>;
};

LobbyistShow.propTypes = {
  lobbyist: PropTypes.string
};

export default LobbyistShow;
