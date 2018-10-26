import React from 'react';
import { NavLink } from 'react-router-dom';

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
      </nav>
    </header>
  );
};

export default Navigation;
