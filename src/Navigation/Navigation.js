import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <header>
      <nav>
        <NavLink exact to="/">
          View Recent
        </NavLink>
        <NavLink exact to="/lobbyists">
          View Lobbyists
        </NavLink>
        <NavLink exact to="/issues">
          View Issues
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
