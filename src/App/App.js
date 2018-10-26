import React, { Component } from 'react';
import CardContainer from '../CardContainer/CardContainer';
import Header from '../Header/Header';
import { Route, Switch } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import { initialFetchCall, lobbyistFetchCall } from '../Utils/apiCalls';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      recentTopics: [],
      lobbyistList: [],
      errors: ''
    };
  }

  componentDidMount() {
    this.setInitialState();
    this.fetchLobbyistsf();
  }

  setInitialState = async () => {
    if (!this.state.recentTopics.length) {
      try {
        const recentTopics = await initialFetchCall();
        this.setState({ recentTopics });
      } catch (error) {
        this.setState({ errors: error.message });
      }
    }
  };

  fetchLobbyists = async () => {
    if (!this.state.lobbyistList.length) {
      try {
        const lobbyists = await lobbyistFetchCall();
        this.setState({ lobbyistList: lobbyists });
      } catch (error) {
        this.setState({ error: error.message });
      }
    }
  };

  render() {
    return (
      <div className="app">
        <Header />
        <Navigation />
        <main>
          <div>
            <Switch>
              <Route
                path="/"
                render={() => {
                  return (
                    <CardContainer recentTopics={this.state.recentTopics} />
                  );
                }}
              />
              <Route
                path="/lobbyists"
                render={() => {
                  this.fetchLobbyists();
                  return (
                    <CardContainer lobbyistList={this.state.lobbyistList} />
                  );
                }}
              />
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
