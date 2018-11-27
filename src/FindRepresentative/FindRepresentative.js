import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FindRepresentative extends Component {
  constructor() {
    super();
    this.state = {
      zipcode: ''
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.getRepresentative(this.state);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="number"
            name="zipcode"
            required
            max="99999"
            placeholder="Enter Zip Code to Find Your Local Member of Congress"
            onChange={this.handleChange}
          />
          <button>Find My Representative</button>
        </form>
      </div>
    );
  }
}

FindRepresentative.propTypes = {
  getRepresentative: PropTypes.func
};

export default FindRepresentative;
