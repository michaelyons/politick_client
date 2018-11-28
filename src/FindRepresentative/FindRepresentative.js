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
    this.setState({
      zipcode: ''
    });
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
            placeholder="Enter Zip Code"
            onChange={this.handleChange}
            value={this.state.zipcode}
          />
          <button>Find My Rep</button>
        </form>
      </div>
    );
  }
}

FindRepresentative.propTypes = {
  getRepresentative: PropTypes.func
};

export default FindRepresentative;
