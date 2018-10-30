import React, { Component } from 'react';
import RecentTopicsContainer from '../RecentTopicsContainer/RecentTopicsContainer';
import LobbyistListContainer from '../LobbyistListContainer/LobbyistListContainer';
import LobbyistShow from '../LobbyistShow/LobbyistShow';
import { Route, Switch, NavLink } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import {
  initialFetchCall,
  lobbyistFetchCall,
  wordCloudFetch,
  lobbyistListFetchCall,
  specificWordFetch
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
      showWords: [],
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
    const fontSizeMapper = word => Math.log2(word.value) * 12;
    const onWordClick = async word => {
      try {
        const showWords = await specificWordFetch(word.text);
        this.setState({
          showWords
        });
      } catch (error) {
        this.setState({ error: error.message });
      }
    };
    return (
      <section className="hero is-primary is-medium">
        <div className="hero-head">
          <nav className="navbar">
            <div className="container">
              <div className="navbar-brand">
                <a className="navbar-item">
                  <img
                    src="https://media.giphy.com/media/5WISDYhQLq8ZnR3v0Q/giphy.gif"
                    alt="Logo"
                  />
                </a>
                <span
                  className="navbar-burger burger"
                  data-target="navbarMenuHeroA"
                >
                  <span />
                  <span />
                  <span />
                </span>
              </div>
              <div id="navbarMenuHeroA" className="navbar-menu">
                <div className="navbar-end">
                  <a className="navbar-item is-active">
                    <NavLink exact to="/">
                      View Recent
                    </NavLink>
                  </a>
                  <a className="navbar-item">
                    <NavLink exact to="/lobbyists">
                      View Lobbyists
                    </NavLink>
                  </a>
                  <a className="navbar-item">
                    <NavLink exact to="/issues">
                      View Issues
                    </NavLink>
                  </a>
                  <span className="navbar-item">
                    <a className="button is-primary is-inverted">
                      <span className="icon">
                        <i className="fab fa-github" />
                      </span>
                      <span>Download</span>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">INFORMANT</h1>
            <h2 className="subtitle">MIKE, JOHN, CONNER</h2>
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
                      width={1320}
                      height={900}
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
        </div>
        <div className="hero-foot">
          <nav className="tabs">
            <div className="container">
              <ul>
                <li className="is-active">
                  <a>Overview</a>
                </li>
                <li>
                  <a>Modifiers</a>
                </li>
                <li>
                  <a>Grid</a>
                </li>
                <li>
                  <a>Elements</a>
                </li>
                <li>
                  <a>Components</a>
                </li>
                <li>
                  <a>Layout</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </section>
    );
  }
}

export default App;
