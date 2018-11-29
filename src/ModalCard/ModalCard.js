import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostTweet from '../PostTweet/PostTweet';
import './ModalCard.css';

class ModalCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetActive: false,
      tweetRecent: false
    };
  }

  toggleTwitterClass = () => {
    const currentState = this.state.tweetActive;
    this.setState({ tweetActive: !currentState });
  };

  toggleTweetButton = () => {
    setTimeout(() => {
      const currentState = this.state.tweetRecent;
      this.setState({ tweetRecent: !currentState });
    }, 1500);
  };

  render() {
    const {
      filingId,
      clientName,
      topic,
      register,
      date,
      currentTwitterUser,
      congressTwitterName,
      congressRealName
    } = this.props;
    return (
      <div>
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">Filing ID {filingId}</p>
            <p className="card-header-icon is-italic">Filed {date}</p>
            <button
              onClick={this.toggleTweetButton}
              className="tweet-issue-btn"
            >
              Share <i className="fab fa-twitter" />
            </button>
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
                filingId={filingId}
              />
            </div>
            <button className="modal-close is-large" aria-label="close" />
          </div>
          <div className="media">
            <div className="card-content">
              <div className="media-content">
                <p className="title is-size-6">{topic}</p>
                <p className="subtitle">For Client {clientName}</p>
                <p className="subtitle">Registered by {register}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ModalCard.propTypes = {
  filingId: PropTypes.number,
  topic: PropTypes.string,
  clientName: PropTypes.string,
  register: PropTypes.string,
  date: PropTypes.string,
  currentTwitterUser: PropTypes.string,
  congressTwitterName: PropTypes.string,
  congressRealName: PropTypes.string
};

export default ModalCard;
