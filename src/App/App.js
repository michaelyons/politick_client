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

  componentDidMount() {
    this.setInitialState();
    this.fetchLobbyists();
    this.setWordCloud();
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
        const lobbyists = await lobbyistFetchCall();
        this.setState({ lobbyistList: lobbyists });
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
        <WordCloud
          data={this.state.wordCloud}
          fontSizeMapper={fontSizeMapper}
        />
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
