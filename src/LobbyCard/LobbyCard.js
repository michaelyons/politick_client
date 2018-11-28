import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostTweet from '../PostTweet/PostTweet';
import { Link } from 'react-router-dom';
import LoadingGif from '../LoadingGif/LoadingGif';
import './LobbyCard.css';

class LobbyCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetRecent: false
    };
  }

  toggleTweetButton = () => {
    setTimeout(() => {
      const currentState = this.state.tweetRecent;
      this.setState({ tweetRecent: !currentState });
    }, 1500);
  };

  setCurrentId = () => {
    return setTimeout(() => {
      const { pathname } = window.location;
      const pathValue = pathname.split('/').pop();
      this.setState({ currentId: pathValue }, () => pathValue);
    }, 1);
  };

  render() {
    const {
      clientName,
      filingId,
      date,
      lobbyists,
      register,
      topic,
      setCurrentId,
      fetchLobbyData,
      currentTwitterUser,
      congressTwitterName,
      congressRealName
    } = this.props;
    if (!lobbyists) {
      return <LoadingGif />;
    } else {
      const handleLobbyistClick = async () => {
        const id = await setCurrentId();
        fetchLobbyData(id);
      };

      const lobbyistLinks = lobbyists.map(person => (
        <Link
          className="lobbyist-name"
          key={person.id}
          to={`/lobbyists/${person.id}`}
          onClick={handleLobbyistClick}
        >
          {person.name}
        </Link>
      ));
      return (
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">Filing ID: {filingId}</p>
            <button onClick={this.toggleTweetButton}>
              Tweet This Issue
              <i className="fab fa-twitter" />
            </button>
            <p className="card-header-icon is-italic">Filed: {date}</p>
          </header>
          <div
            className={`modal ${this.state.tweetRecent ? 'is-active' : ''}`}
            onSubmit={this.toggleTweetButton}
          >
            <div className="modal-background" />
            <div className="modal-content">
              <PostTweet
                congressRealName={congressRealName}
                congressTwitterName={congressTwitterName}
                currentTwitterUser={currentTwitterUser}
              />
            </div>
            <button className="modal-close is-large" aria-label="close" />
          </div>
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
  }
}

LobbyCard.propTypes = {
  clientName: PropTypes.string,
  filingId: PropTypes.number,
  lobbyists: PropTypes.array,
  register: PropTypes.string,
  topic: PropTypes.string,
  setCurrentId: PropTypes.func,
  fetchLobbyData: PropTypes.func,
  date: PropTypes.string,
  currentTwitterUser: PropTypes.string,
  congressTwitterName: PropTypes.string,
  congressRealName: PropTypes.string
};

export default LobbyCard;
