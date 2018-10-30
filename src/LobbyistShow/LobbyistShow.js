import React from 'react';
import PropTypes from 'prop-types';

const LobbyistShow = ({ lobbyist }) => {
  if (!lobbyist.length) {
    return <h1>Nothing Found</h1>;
  } else {
    return lobbyist.map((item, index) => (
      <div key={index}>
        <p>{item.filing_id}</p>
        <p>{item.client.name}</p>
        <p>{item.issue}</p>
      </div>
    ));
  }
};

LobbyistShow.propTypes = {
  lobbyist: PropTypes.array
};

export default LobbyistShow;
