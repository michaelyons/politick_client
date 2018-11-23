import React from 'react';

const LoginSuccess = currentUser => {
  console.log(currentUser);
  return (
    <div>
      <a
        href="https://ml-politick-server.herokuapp.com/twitter/logout"
        className="navbar-item"
      >
        {`WELCOME ${currentUser}`} <i className="fab fa-twitter" />
      </a>
    </div>
  );
};

export default LoginSuccess;
