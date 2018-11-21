import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { tweetPostRequest } from '../Utils/apiCalls';

class PostTweet extends Component {
  constructor() {
    super();
    this.state = {
      tweetText: '',
      error: ''
    };
  }

  componentDidMount() {
    this.populateTweet();
  }

  handleSubmit = event => {
    event.preventDefault();
    this.postTweet();
    this.setState({
      tweetText: 'Tweet Sent Successfully!'
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.tager.value
    });
  };

  populateTweet = () => {
    const tweetText = `Please let this work`;
    this.setState({
      tweetText
    });
  };

  postTweet = () => {
    const infoPayload = {
      userId: this.props.currentUser._id,
      status: this.state.tweetText
    };
    tweetPostRequest(infoPayload);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <textarea
            name="tweetText"
            rows="10"
            onChange={this.handleChange}
            value={this.state.tweetText}
          />
          <button onClick={this.postTweet}>Send Tweet</button>
        </form>
      </div>
    );
  }
}

PostTweet.propTypes = {
  currentUser: PropTypes.object.isRequired
};

export default PostTweet;
