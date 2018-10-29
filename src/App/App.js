import React, { Component } from 'react';
import RecentTopicsContainer from '../RecentTopicsContainer/RecentTopicsContainer';
import LobbyistListContainer from '../LobbyistListContainer/LobbyistListContainer';
import LobbyistShow from '../LobbyistShow/LobbyistShow';
import { Route, Switch } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import {
  initialFetchCall,
  lobbyistFetchCall,
  wordCloudFetch,
  lobbyistListFetchCall
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
      showLobbyists: [],
      currentId: '',
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

  setCurrentId = () => {
    setTimeout(() => {
      const { pathname } = window.location;
      this.setState({ currentId: pathname[pathname.length - 1] });
    }, 1);
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

  fetchLobbyistList = async id => {
    if (!this.state.showLobbyists.length) {
      try {
        const showLobbyists = await lobbyistListFetchCall(id);
        this.setState({
          showLobbyists: showLobbyists.lobbying_representations
        });
      } catch (error) {
        this.setState({ error: error.message });
      }
    }
  };

  render() {
    const fontSizeMapper = word => Math.log2(word.value) * 5;
    return (
      <div className="app">
        <h1>Informat Lobby</h1>
        <Navigation />
        <main>
          <div>
            <Switch>
              <Route
                exact
                path="/"
                render={() => {
                  this.setInitialState();
                  return (
                    <RecentTopicsContainer
                      recentTopicsCategory={this.state.recentTopics}
                      setCurrentId={this.setCurrentId}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/lobbyists"
                render={() => {
                  this.fetchLobbyists();
                  return (
                    <LobbyistListContainer
                      lobbyistListCategory={this.state.lobbyistList}
                    />
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
              <Route
                exact
                path={`/lobbyists/${this.state.currentId}`}
                render={({ match }) => {
                  this.fetchLobbyistList(this.state.currentId);
                  const { showLobbyists } = this.state;
                  return <LobbyistShow lobbyist={showLobbyists} />;
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
