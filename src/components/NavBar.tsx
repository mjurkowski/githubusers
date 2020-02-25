import React from 'react';
import { Link } from 'react-router-dom';
import { BackButton } from './BackButton';

interface IProps {
  rightBtn: React.ReactNode;
}

export const NavBar: React.FC<IProps> = ({ rightBtn }) => (
  <nav className="navbar navbar-dark bg-dark">
    <Link className="navbar-brand" to="/">
      <strong>GitHub</strong> Users
    </Link>
    <ul className="navbar-nav">
      <li className="navbar-item">
        {rightBtn || <BackButton/>}
      </li>
    </ul>
  </nav>
) 
