import React, { Component } from 'react';

class FindRepresentative extends Component {
  render() {
    return (
      <div>
        <form action="">
          <input
            type="number"
            required
            min="5"
            max="5"
            placeholder="Enter Zip Code to Find Your Local Member of Congress"
          />
          <button>Find My Representative</button>
        </form>
      </div>
    );
  }
}

export default FindRepresentative;
