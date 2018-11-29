import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './FoundRepresentative.css';

class FoundRepresentative extends Component {
  render() {
    const { representative, url } = this.props;
    return (
      <div>
        <h2 className="rep-div">Your Congressional Rep is </h2>
        <a className="rep-link" href={url}>
          {representative}
        </a>
      </div>
    );
  }
}

FoundRepresentative.propTypes = {
  representative: PropTypes.string,
  url: PropTypes.string
};

export default FoundRepresentative;
