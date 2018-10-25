import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <header>
      <nav>
        <NavLink exact to="/">
          Recent
        </NavLink>
        <NavLink exact to="/lobbyists">
          Lobbyists
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
