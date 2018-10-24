import React, { Component } from 'react';
import CardContainer from '../CardContainer/CardContainer';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      recentTopics: []
    };
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Informant Lobby</h1>
        </header>
        <CardContainer recentTopics={this.state.recentTopics} />
      </div>
    );
  }
}

export default App;
