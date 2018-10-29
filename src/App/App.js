import React, { Component } from 'react';
import CardContainer from '../CardContainer/CardContainer';
import { Route, Switch } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import {
  initialFetchCall,
  lobbyistFetchCall,
  wordCloudFetch
} from '../Utils/apiCalls';
import WordCloud from 'react-d3-cloud';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      recentTopics: [],
      lobbyistList: [],
      wordCloud: [],
      errors: ''
    };
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

  setWordCloud = async () => {
    if (!this.state.wordCloud.length) {
      try {
        const wordCloud = await wordCloudFetch();
        this.setState({ wordCloud });
      } catch (error) {
        this.setState({ errors: error.message });
      }
    }
  };

  fetchLobbyists = async () => {
    if (!this.state.lobbyistList.length) {
      try {
        const lobbyistList = await lobbyistFetchCall();
        this.setState({ lobbyistList });
      } catch (error) {
        this.setState({ error: error.message });
      }
    }
  };

  render() {
    const fontSizeMapper = word => Math.log2(word.value) * 3;
    return (
      <div className="app">
        <Navigation />
        <main>
          <div>
            <Switch>
              <Route
                exact
                path="/"
                render={() => {
                  console.log('hiiii');
                  this.setInitialState();
                  return (
                    <CardContainer currentCategory={this.state.recentTopics} />
                  );
                }}
              />
              <Route
                exact
                path="/lobbyists"
                render={() => {
                  this.fetchLobbyists();
                  return (
                    <CardContainer currentCategory={this.state.lobbyistList} />
                  );
                }}
              />
              <Route
                exact
                path="/issues"
                render={() => {
                  this.setWordCloud();
                  return (
                    <WordCloud
                      data={this.state.wordCloud}
                      fontSizeMapper={fontSizeMapper}
                    />
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
