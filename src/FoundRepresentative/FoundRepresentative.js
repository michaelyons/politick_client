import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FoundRepresentative extends Component {
  render() {
    const { representative } = this.props;
    return (
      <div>
        <h2>Your Memeber of Congress is {representative}</h2>
        <button>Reset</button>
      </div>
    );
  }
}

FoundRepresentative.propTypes = {
  representative: PropTypes.string
};

export default FoundRepresentative;
