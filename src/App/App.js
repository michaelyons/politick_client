import React, { Component } from 'react';
import CardContainer from '../CardContainer/CardContainer';
import Header from '../Header/Header';
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
        <Header />
        <CardContainer recentTopics={this.state.recentTopics} />
      </div>
    );
  }
}

export default App;
