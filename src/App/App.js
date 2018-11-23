import React, { Component } from 'react';
import RecentTopicsContainer from '../RecentTopicsContainer/RecentTopicsContainer';
import LobbyistShow from '../LobbyistShow/LobbyistShow';
import About from '../About/About';
// import PostTweet from '../PostTweet/PostTweet';
import TwitterLogin from '../TwitterLogin/TwitterLogin';
import LoginSuccess from '../LoginSuccess/LoginSuccess';
import { Route, Switch, NavLink } from 'react-router-dom';
import {
  recentTopicsFetchCall,
  lobbyistFetchCall,
  wordCloudFetch,
  lobbyistListFetchCall,
  specificWordFetch,
  grabTwitterUsername
} from '../Utils/apiCalls';
import ModalContainer from '../ModalContainer/ModalContainer';
import WordCloud from 'react-d3-cloud';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      recentTopics: [],
      lobbyistList: [],
      wordCloud: [],
      filteredWordCloud: [],
      filterText: '',
      showLobbyists: [],
      showWords: [],
      currentId: '',
      errors: '',
      active: false,
      loading: true,
      currentUser: ''
    };
  }

  componentDidMount() {
    const userNameParams = window.location.search;
    console.log(userNameParams);
    if (userNameParams.includes('?user')) {
      return <LoginSuccess currentUser={this.state.currentUser} />;
    } else {
      return <TwitterLogin />;
    }
  }

  setInitialState = async () => {
    if (!this.state.recentTopics.length) {
      try {
        const recentTopics = await recentTopicsFetchCall();
        this.setState({ recentTopics, loading: false });
      } catch (error) {
        this.setState({ errors: error.message });
      }
    }
  };

  setCurrentUser = async () => {
    const id = window.location.search.slice(5);
    console.log(id);
    const currentUser = await grabTwitterUsername(id);
    console.log(currentUser);
    this.setState({ currentUser });
  };

  setWordCloud = async () => {
    if (!this.state.wordCloud.length) {
      try {
        const wordCloud = await wordCloudFetch();
        this.setState({ wordCloud, loading: false });
        const filteredWordCloud = wordCloud;
        this.setState({ filteredWordCloud, loading: false });
      } catch (error) {
        this.setState({ errors: error.message });
      }
    }
  };

  filterWordCloud = async event => {
    this.setState({ filterText: event.target.value });
    let text = event.target.value;
    let filteredCloud = [];
    if (text !== '') {
      this.state.wordCloud.forEach(function(word) {
        if (typeof word === 'object') {
          if (word.text.includes(text)) {
            filteredCloud.push(word);
          }
        }
      });
    } else {
      filteredCloud = this.state.wordCloud;
    }
    this.setState({ filteredWordCloud: filteredCloud });
  };

  clearFilter = async () => {
    this.setState({ filterText: '' });
    this.setState({ filteredWordCloud: this.state.wordCloud });
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
        this.setState({ lobbyistList, loading: false });
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
          showLobbyists,
          loading: false
        });
      } catch (error) {
        this.setState({ error: error.message });
      }
    }
  };

  toggleClass = () => {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  };

  fontSizeMapper = word => Math.log2(word.value) * 9;

  onWordClick = async word => {
    try {
      const showWords = await specificWordFetch(word.text);
      this.setState({
        showWords,
        loading: false
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
    this.toggleClass();
  };

  render() {
    return (
      <div>
        <section className="hero is-dark is-small">
          <div className="hero-head">
            <nav className="navbar">
              <div className="container">
                <div className="navbar-brand">
                  <div href="http://localhost:3000/" className="navbar-item">
                    <NavLink exact to="/">
                      <img
                        src="https://i.imgur.com/5kT7Vl7.png"
                        alt="title-img"
                      />
                    </NavLink>
                  </div>
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
                    <div
                      href="http://localhost:3000/issues"
                      className="navbar-item"
                    >
                      <NavLink exact to="/issues">
                        WORDS
                      </NavLink>
                    </div>
                    <div
                      href="http://localhost:3000/most_recent"
                      className="navbar-item"
                    >
                      <NavLink exact to="/most_recent">
                        LIST
                      </NavLink>
                    </div>
                    <div
                      href="http://localhost:3000/about"
                      className="navbar-item"
                    >
                      <NavLink exact to="/about">
                        ABOUT
                      </NavLink>
                    </div>
                  </div>
                  {this.state.currentUser ? <LoginSuccess /> : <TwitterLogin />}
                </div>
              </div>
            </nav>
          </div>
        </section>
        <section className="hero is-fullheight">
          <div className="hero-body">
            <div className="hero-body">
              <div className="container">
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => {
                      this.setCurrentUser();
                      this.setWordCloud();
                      return (
                        <div>
                          <h1 className="title">
                            What are lobbyists talking about?
                          </h1>
                          <h6 className="subtitle john-head">
                            Below are the most commonly occuring words from
                            issues presented by Lobbyists to the US Government
                            <br /> Click on a word to see Lobbyist
                            representations filed into public record
                          </h6>
                          <input
                            type="text"
                            value={this.state.filterText}
                            onChange={this.filterWordCloud}
                            placeholder="Filter Words"
                            className="input-home-field"
                          />
                          <div
                            className="reset-btn-home"
                            onClick={this.clearFilter}
                          >
                            Reset
                          </div>
                          <WordCloud
                            data={this.state.filteredWordCloud}
                            fontSizeMapper={this.fontSizeMapper}
                            width={1320}
                            height={900}
                            onWordClick={this.onWordClick}
                            padding={5}
                          />
                        </div>
                      );
                    }}
                  />
                  <Route
                    exact
                    path="/most_recent"
                    render={() => {
                      this.setInitialState();
                      this.fetchLobbyists();
                      return (
                        <div>
                          <RecentTopicsContainer
                            recentTopicsCategory={this.state.recentTopics}
                            setCurrentId={this.setCurrentId}
                            fetchLobbyData={this.fetchLobbyistList}
                          />
                        </div>
                      );
                    }}
                  />
                  <Route
                    exact
                    path="/about"
                    render={() => {
                      return <About />;
                    }}
                  />
                  <Route
                    exact
                    path="/issues"
                    render={() => {
                      this.setWordCloud();
                      return (
                        <div>
                          <h1 className="title">Frequently Mentioned Words</h1>
                          <h1 className="subtitle">
                            Click on a word to view related lobbying filings or
                            search by topic of interest
                          </h1>
                          <input
                            type="text"
                            value={this.state.filterText}
                            onChange={this.filterWordCloud}
                            placeholder="Filter words"
                            className="wordcloud-input"
                          />
                          <div
                            className="reset-btn-cloud"
                            onClick={this.clearFilter}
                          >
                            Reset
                          </div>
                          <WordCloud
                            data={this.state.filteredWordCloud}
                            fontSizeMapper={this.fontSizeMapper}
                            width={1320}
                            height={900}
                            onWordClick={this.onWordClick}
                            padding={5}
                          />
                        </div>
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
              <div
                className={`modal ${this.state.active ? 'is-active' : ''}`}
                onClick={this.toggleClass}
              >
                <div className="modal-background" />
                <div className="modal-content">
                  <ModalContainer modal={this.state.showWords} />
                </div>
                <button className="modal-close is-large" aria-label="close" />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
