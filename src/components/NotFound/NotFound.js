import React from 'react';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>Page Not Found!</h1>
      <p>Sorry, it is unable to find the page you are looking for :(</p>
      <a href="/">&larr; Go Home</a>
    </div>
  )
}

export default NotFound;