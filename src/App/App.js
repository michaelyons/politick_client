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

  setCurrentId = () => {
    return setTimeout(() => {
      const { pathname } = window.location;
      const pathValue = pathname.split('/').pop();
      this.setState({ currentId: pathValue }, () => pathValue);
    }, 1);
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
    try {
      const showLobbyists = await lobbyistListFetchCall(id);
      this.setState({
        showLobbyists
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    const fontSizeMapper = word => Math.log2(word.value) * 3.5;
    const onWordClick = word => console.log(word);
    return (
      <div className="container">
        <h1 className="title app-header">Informat Lobby</h1>
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
                      fetchLobbyData={this.fetchLobbyistList}
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
                      width={900}
                      height={800}
                      onWordClick={onWordClick}
                      padding={5}
                    />
                  );
                }}
              />
              <Route
                exact
                path={`/lobbyists/${this.state.currentId}`}
                render={() => {
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
