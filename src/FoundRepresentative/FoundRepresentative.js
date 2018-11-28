import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FoundRepresentative extends Component {
  render() {
    const { representative } = this.props;
    return (
      <div>
        <h2>Your Congressional Rep is {representative}</h2>
      </div>
    );
  }
}

FoundRepresentative.propTypes = {
  representative: PropTypes.string
};

export default FoundRepresentative;
