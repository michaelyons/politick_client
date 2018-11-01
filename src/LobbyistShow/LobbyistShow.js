import React from 'react';
import PropTypes from 'prop-types';
import LoadingGif from '../LoadingGif/LoadingGif';

const LobbyistShow = ({ lobbyist }) => {
  if (!lobbyist.length) {
    return <LoadingGif />;
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
