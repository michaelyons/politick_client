import React from 'react';

const LoginSuccess = currentUser => {
  return (
    <div>
      <a
        href="https://ml-politick-server.herokuapp.com/twitter/logout"
        className="navbar-item"
      >
        {`LOGOUT ${currentUser}`} <i className="fab fa-twitter" />
        <i className="fab fa-twitter" />
      </a>
    </div>
  );
};

export default LoginSuccess;
