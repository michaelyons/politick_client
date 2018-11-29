import React, { Component } from 'react';
import RecentTopicsContainer from '../RecentTopicsContainer/RecentTopicsContainer';
import LobbyistShow from '../LobbyistShow/LobbyistShow';
import About from '../About/About';
import TwitterLogin from '../TwitterLogin/TwitterLogin';
import LoginSuccess from '../LoginSuccess/LoginSuccess';
import LoadingGif from '../LoadingGif/LoadingGif';
import FoundRepresentative from '../FoundRepresentative/FoundRepresentative';
import FindRepresentative from '../FindRepresentative/FindRepresentative';
import { Route, Switch, NavLink } from 'react-router-dom';
import {
  recentTopicsFetchCall,
  lobbyistFetchCall,
  wordCloudFetch,
  lobbyistListFetchCall,
  specificWordFetch,
  grabTwitterUsername,
  congressMemberFetch
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
      currentUser: '',
      twitterUserId: '',
      representativeTwitter: '',
      representativeRealName: '',
      representativeUrl: ''
    };
  }

  componentDidMount() {
    this.setCurrentUser();
    this.checkForRepresentatives();
    const userNameParams = window.location.search;
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

  getRepresentative = async zipcodeObject => {
    const zip = zipcodeObject.zipcode;
    const currentRep = await congressMemberFetch(zip);
    const twitter = currentRep[0].twitterName;
    const name = currentRep[0].repName;
    const url = currentRep[0].url;
    this.setState({
      representativeTwitter: twitter,
      representativeRealName: name,
      representativeUrl: url
    });
    localStorage.setItem('representativeTwitter', JSON.stringify(twitter));
    localStorage.setItem('representativeRealName', JSON.stringify(name));
    localStorage.setItem('representativeUrl', JSON.stringify(url));
  };

  checkForRepresentatives = () => {
    const representativeTwitter = JSON.parse(
      localStorage.getItem('representativeTwitter')
    );
    const representativeRealName = JSON.parse(
      localStorage.getItem('representativeRealName')
    );
    const representativeUrl = JSON.parse(
      localStorage.getItem('representativeUrl')
    );
    if (representativeTwitter && representativeRealName && representativeUrl) {
      this.setState({
        representativeTwitter,
        representativeRealName,
        representativeUrl
      });
    }
  };

  setCurrentUser = async () => {
    const id = window.location.search.slice(6);
    const currentUser = await grabTwitterUsername(id);
    this.setState({ currentUser, twitterUserId: id });
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
        <section>
          <nav className="navbar is-dark">
            <div className="navbar-brand">
              <div href="http://localhost:3000/" className="navbar-item">
                <NavLink exact to="/">
                  <img src="https://i.imgur.com/5kT7Vl7.png" alt="title-img" />
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
                  href="http://localhost:3000/most_recent"
                  className="navbar-item"
                >
                  <NavLink exact to="/most_recent">
                    LIST
                  </NavLink>
                </div>
                <div href="http://localhost:3000/about" className="navbar-item">
                  <NavLink exact to="/about">
                    ABOUT
                  </NavLink>
                </div>
                <div
                  href="http://localhost:3000/issues"
                  className="navbar-item"
                >
                  <NavLink exact to="/issues">
                    WORDS
                  </NavLink>
                </div>
              </div>
              <div className="twitter-login-btn">
                {this.state.currentUser ? (
                  <LoginSuccess currentUser={this.state.currentUser} />
                ) : (
                  <TwitterLogin />
                )}
              </div>
            </div>
          </nav>
        </section>
        <section className="rep-area">
          <div className="rep-finder">
            {this.state.representativeRealName ? (
              <FoundRepresentative
                representative={this.state.representativeRealName}
                url={this.state.representativeUrl}
              />
            ) : (
              <div className="rep-not-found">
                <h2>Find and Tweet your local Congressional Rep</h2>
                <FindRepresentative
                  getRepresentative={this.getRepresentative}
                />
              </div>
            )}
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
                      this.setWordCloud();
                      if (!this.state.wordCloud.length) {
                        return <LoadingGif />;
                      } else {
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
                      }
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
                            currentTwitterUser={this.state.twitterUserId}
                            congressTwitterName={
                              this.state.representativeTwitter
                            }
                            congressRealName={this.state.representativeRealName}
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
                      if (!this.state.wordCloud.length) {
                        return <LoadingGif />;
                      } else {
                        return (
                          <div>
                            <h1 className="title">
                              Frequently Mentioned Words
                            </h1>
                            <h1 className="subtitle">
                              Click on a word to view related lobbying filings
                              or search by topic of interest
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
                      }
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
              <div className={`modal ${this.state.active ? 'is-active' : ''}`}>
                <div className="modal-background" />
                <div className="modal-content">
                  <ModalContainer
                    modal={this.state.showWords}
                    currentTwitterUser={this.state.twitterUserId}
                    congressTwitterName={this.state.representativeTwitter}
                    congressRealName={this.state.representativeRealName}
                  />
                </div>
                <button
                  onClick={this.toggleClass}
                  className="modal-close is-large"
                  aria-label="close"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
