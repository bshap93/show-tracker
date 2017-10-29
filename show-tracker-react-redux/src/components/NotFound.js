import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h1>Go back!</h1>
      <NavLink
        className="btn btn-secondary"
        exact to="/"
      >Home</NavLink>
    </div>
  )
}

export default NotFound;
