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
        <div className="card">
          <header className="card-header">
            <h2>Send Tweet</h2>
          </header>
          <form onSubmit={this.handleSubmit}>
            <div className="media">
              <div className="card-content">
                <div className="media-content">
                  <textarea
                    name="tweetText"
                    rows="10"
                    onChange={this.handleChange}
                    value={this.state.tweetText}
                  />
                  <button onClick={this.postTweet}>Send Tweet</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div />
      </div>
    );
  }
}

PostTweet.propTypes = {
  currentUser: PropTypes.object.isRequired
};

export default PostTweet;

// import React from 'react';

// import PropTypes from 'prop-types';

// import './ModalCard.css';

// const ModalCard = ({ filingId, clientName, topic, register, date }) => {
//   return (
//     <div>
//       <div className="card">
//         <header className="card-header">
//           <p className="card-header-title">Filing ID {filingId}</p>
//           <button>
//             Tweet This Issue
//             <i className="fab fa-twitter" />
//           </button>
//           <p className="card-header-icon is-italic">Filed {date}</p>
//         </header>
//         <div className="media">
//           <div className="card-content">
//             <div className="media-content">
//               <p className="title is-size-6">{topic}</p>
//               <p className="subtitle">For Client {clientName}</p>
//               <p className="subtitle">Registered by {register}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// ModalCard.propTypes = {
//   filingId: PropTypes.number,
//   topic: PropTypes.string,
//   clientName: PropTypes.string,
//   register: PropTypes.string,
//   date: PropTypes.string
// };

// export default ModalCard;
