import React from 'react';
import PropTypes from 'prop-types';

const LobbyistShow = ({ lobbyist }) => {
  if (!lobbyist.length) {
    return <h1>Nothing Found</h1>;
  }
  return <h1>{lobbyist[0].id}</h1>;
};

LobbyistShow.propTypes = {
  lobbyist: PropTypes.array
};

export default LobbyistShow;
