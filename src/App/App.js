import React, { Component } from 'react';
import CardContainer from '../CardContainer/CardContainer';
import Header from '../Header/Header';

import { initialFetchCall } from '../Utils/apiCalls';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      recentTopics: [],
      errors: ''
    };
  }

  setInitialState = async () => {
    if (!this.state.recentTopics.length) {
      try {
        const data = await initialFetchCall();
        this.setState({ recentTopics: data });
      } catch (error) {
        this.setState({ errors: error.message });
      }
    }
  };

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
