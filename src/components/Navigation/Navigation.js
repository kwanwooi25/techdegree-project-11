import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ routes, onRouteChange }) => {
  const renderLinks = () => {
    return routes.map(({ path, search, title }) => {
      return (
        <li key={path}>
          <NavLink
            to={path}
            exact
            activeClassName='active'
            onClick={() => onRouteChange(search)}
          >
            {title}
          </NavLink>
        </li>
      )
    })
  }

  return (
    <nav className="main-nav">
      <ul>
        {renderLinks()}
      </ul>
    </nav>
  )
}

export default Navigation;